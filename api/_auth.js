const crypto = require('crypto')

const demoUser = {
  id: 'user-1',
  name: 'Amina Juma',
  email: 'amina@smartrentals.com',
  role: 'landlord',
}

const demoPassword = 'password123'
const roles = new Set(['landlord', 'caretaker', 'tenant'])

const base64Url = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')

const createToken = (user) => {
  const header = base64Url({ alg: 'HS256', typ: 'JWT' })
  const payload = base64Url({
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60,
  })
  const secret = process.env.JWT_SECRET || 'smart-rentals-secret'
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url')

  return `${header}.${payload}.${signature}`
}

const sendJson = (res, status, data) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')
  res.end(JSON.stringify(data))
}

const verifyToken = (token) => {
  if (!token) {
    return null
  }

  const [header, payload, signature] = String(token).split('.')
  if (!header || !payload || !signature) {
    return null
  }

  const secret = process.env.JWT_SECRET || 'smart-rentals-secret'
  const expected = crypto.createHmac('sha256', secret).update(`${header}.${payload}`).digest('base64url')
  if (signature !== expected) {
    return null
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (data.exp && Number(data.exp) < Math.floor(Date.now() / 1000)) {
      return null
    }
    return data
  } catch {
    return null
  }
}

module.exports = {
  createToken,
  demoPassword,
  demoUser,
  roles,
  sendJson,
  verifyToken,
}
