const { createToken, roles, sendJson } = require('../_auth')
const { createUser, findUserByEmail, initializeDatabase } = require('../_db')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type')
    res.setHeader('Vary', 'Origin')
    return res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { message: 'Method not allowed' })
  }

  const { email, name, password, role } = req.body || {}

  if (!email || !name || !password || !role) {
    return sendJson(res, 400, { message: 'Name, email, password, and role are required' })
  }

  if (!roles.has(role)) {
    return sendJson(res, 400, { message: 'Role must be landlord, caretaker, or tenant' })
  }

  await initializeDatabase()

  const normalizedEmail = String(email).toLowerCase()
  if (await findUserByEmail(normalizedEmail)) {
    return sendJson(res, 409, { message: 'An account with this email already exists' })
  }

  const user = await createUser({
    name,
    email: normalizedEmail,
    password,
    role,
  })

  return sendJson(res, 201, {
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}
