import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail, initializeDatabase } from '../db.js'
import type { DbUser, UserRole } from '../db.js'

const router = Router()
const secret = process.env.JWT_SECRET || 'smart-rentals-secret'

const roles: UserRole[] = ['landlord', 'caretaker', 'tenant']

const createToken = (email: string, role: UserRole) => jwt.sign({ email, role }, secret, { expiresIn: '8h' })

const toProfile = ({ password_hash: _passwordHash, ...profile }: DbUser) => profile

router.post('/login', async (req, res) => {
  await initializeDatabase()

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await findUserByEmail(String(email))
  const validPassword = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!user || !validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  res.json({ token: createToken(user.email, user.role), user: toProfile(user) })
})

router.post('/register', async (req, res) => {
  await initializeDatabase()

  const { email, name, password, role } = req.body
  if (!email || !name || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required' })
  }

  if (!roles.includes(role)) {
    return res.status(400).json({ message: 'Role must be landlord, caretaker, or tenant' })
  }

  const normalizedEmail = String(email).toLowerCase()
  if (await findUserByEmail(normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists' })
  }

  const user = await createUser({
    name,
    email: normalizedEmail,
    role,
    password,
  })

  res.status(201).json({ token: createToken(user.email, user.role), user: toProfile(user) })
})

export default router
