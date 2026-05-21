import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = Router()
const secret = process.env.JWT_SECRET || 'smart-rentals-secret'

type UserRole = 'landlord' | 'caretaker' | 'tenant'

interface StoredUser {
  id: string
  name: string
  email: string
  role: UserRole
  passwordHash: string
}

const users = new Map<string, StoredUser>([
  [
    'amina@smartrentals.com',
    {
      id: 'user-1',
      name: 'Amina Juma',
      email: 'amina@smartrentals.com',
      role: 'landlord',
      passwordHash: bcrypt.hashSync('password123', 10),
    },
  ],
])

const roles: UserRole[] = ['landlord', 'caretaker', 'tenant']

const createToken = (email: string, role: UserRole) => jwt.sign({ email, role }, secret, { expiresIn: '8h' })

const toProfile = ({ passwordHash: _passwordHash, ...profile }: StoredUser) => profile

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = users.get(String(email).toLowerCase())
  const validPassword = user ? await bcrypt.compare(password, user.passwordHash) : false

  if (!user || !validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  res.json({ token: createToken(user.email, user.role), user: toProfile(user) })
})

router.post('/register', async (req, res) => {
  const { email, name, password, role } = req.body
  if (!email || !name || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required' })
  }

  if (!roles.includes(role)) {
    return res.status(400).json({ message: 'Role must be landlord, caretaker, or tenant' })
  }

  const normalizedEmail = String(email).toLowerCase()
  if (users.has(normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists' })
  }

  const user: StoredUser = {
    id: `user-${users.size + 1}`,
    name,
    email: normalizedEmail,
    role,
    passwordHash: await bcrypt.hash(password, 10),
  }

  users.set(normalizedEmail, user)

  res.status(201).json({ token: createToken(user.email, user.role), user: toProfile(user) })
})

export default router
