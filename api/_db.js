const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to connect to Postgres')
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('landlord', 'caretaker', 'tenant')),
    password_hash TEXT,
    google_id TEXT UNIQUE,
    avatar TEXT,
    totp_secret TEXT,
    two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS password_resets (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
  );
`

let initialized

const initializeDatabase = () => {
  initialized ||= (async () => {
    await pool.query(schema)

    const passwordHash = await bcrypt.hash('password123', 10)
    await pool.query(
      `
        INSERT INTO users (id, name, email, role, password_hash)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO NOTHING;
      `,
      ['user-1', 'Amina Juma', 'amina@smartrentals.com', 'landlord', passwordHash],
    )
  })()

  return initialized
}

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT id, name, email, role, password_hash, google_id, avatar, totp_secret, two_factor_enabled FROM users WHERE email = $1 LIMIT 1',
    [String(email).toLowerCase()],
  )

  return result.rows[0] || null
}

const findUserByGoogleId = async (googleId) => {
  const result = await pool.query(
    'SELECT id, name, email, role, password_hash, google_id, avatar, totp_secret, two_factor_enabled FROM users WHERE google_id = $1 LIMIT 1',
    [googleId],
  )

  return result.rows[0] || null
}

const createUser = async ({ name, email, password, role }) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const result = await pool.query(
    `
      INSERT INTO users (id, name, email, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, password_hash, two_factor_enabled;
    `,
    [`user-${Date.now()}`, name, String(email).toLowerCase(), role, passwordHash],
  )

  return result.rows[0]
}

const createUserWithGoogle = async ({ googleId, email, name, avatar, role = 'tenant' }) => {
  const result = await pool.query(
    `
      INSERT INTO users (id, name, email, role, google_id, avatar)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, role, google_id, avatar, two_factor_enabled;
    `,
    [`user-${Date.now()}`, name, String(email).toLowerCase(), role, googleId, avatar],
  )

  return result.rows[0]
}

const updateGoogleUser = async ({ googleId, email, name, avatar }) => {
  const result = await pool.query(
    `
      UPDATE users
      SET name = $1, avatar = $2, google_id = $3
      WHERE email = $4
      RETURNING id, name, email, role, google_id, avatar, two_factor_enabled;
    `,
    [name, avatar, googleId, String(email).toLowerCase()],
  )

  return result.rows[0]
}

const savePasswordResetToken = async ({ token, email, expiresAt }) => {
  await pool.query(
    `
      INSERT INTO password_resets (token, email, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (token) DO UPDATE SET email = EXCLUDED.email, expires_at = EXCLUDED.expires_at;
    `,
    [token, String(email).toLowerCase(), expiresAt],
  )
}

const findPasswordResetToken = async (token) => {
  const result = await pool.query(
    'SELECT token, email, expires_at FROM password_resets WHERE token = $1 LIMIT 1',
    [token],
  )

  return result.rows[0] || null
}

const deletePasswordResetToken = async (token) => {
  await pool.query('DELETE FROM password_resets WHERE token = $1', [token])
}

const updateUserPassword = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 10)
  await pool.query('UPDATE users SET password_hash = $1 WHERE email = $2', [passwordHash, String(email).toLowerCase()])
}

const setTwoFactorSecret = async (email, secret) => {
  await pool.query('UPDATE users SET totp_secret = $1 WHERE email = $2', [secret, String(email).toLowerCase()])
}

const enableTwoFactor = async (email) => {
  await pool.query('UPDATE users SET two_factor_enabled = true WHERE email = $1', [String(email).toLowerCase()])
}

const disableTwoFactor = async (email) => {
  await pool.query('UPDATE users SET two_factor_enabled = false, totp_secret = NULL WHERE email = $1', [String(email).toLowerCase()])
}

module.exports = {
  createUser,
  createUserWithGoogle,
  findUserByEmail,
  findUserByGoogleId,
  updateGoogleUser,
  initializeDatabase,
  pool,
  savePasswordResetToken,
  findPasswordResetToken,
  deletePasswordResetToken,
  updateUserPassword,
}
