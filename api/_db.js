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
    password_hash TEXT NOT NULL,
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
    'SELECT id, name, email, role, password_hash FROM users WHERE email = $1 LIMIT 1',
    [String(email).toLowerCase()],
  )

  return result.rows[0] || null
}

const createUser = async ({ name, email, password, role }) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const result = await pool.query(
    `
      INSERT INTO users (id, name, email, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, password_hash;
    `,
    [`user-${Date.now()}`, name, String(email).toLowerCase(), role, passwordHash],
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

module.exports = {
  createUser,
  findUserByEmail,
  initializeDatabase,
  pool,
  savePasswordResetToken,
  findPasswordResetToken,
  deletePasswordResetToken,
  updateUserPassword,
}
