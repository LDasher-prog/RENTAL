import 'dotenv/config'
import pg from 'pg'
import bcrypt from 'bcryptjs'

const { Pool } = pg

export type UserRole = 'landlord' | 'caretaker' | 'tenant'

export interface DbUser {
  id: string
  name: string
  email: string
  role: UserRole
  password_hash: string
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to connect to Postgres')
}

export const pool = new Pool({
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
`

let initialized: Promise<void> | null = null

export const initializeDatabase = () => {
  initialized ??= (async () => {
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

export const findUserByEmail = async (email: string) => {
  const result = await pool.query<DbUser>(
    'SELECT id, name, email, role, password_hash FROM users WHERE email = $1 LIMIT 1',
    [email.toLowerCase()],
  )

  return result.rows[0] ?? null
}

export const createUser = async (user: {
  name: string
  email: string
  password: string
  role: UserRole
}) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const result = await pool.query<DbUser>(
    `
      INSERT INTO users (id, name, email, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role, password_hash;
    `,
    [`user-${Date.now()}`, user.name, user.email.toLowerCase(), user.role, passwordHash],
  )

  return result.rows[0]
}
