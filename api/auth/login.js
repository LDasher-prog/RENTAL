const { createToken, sendJson } = require('../_auth')
const bcrypt = require('bcryptjs')
const { findUserByEmail, initializeDatabase } = require('../_db')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { message: 'Method not allowed' })
  }

  const { email, password } = req.body || {}

  if (!email || !password) {
    return sendJson(res, 400, { message: 'Email and password are required' })
  }

  await initializeDatabase()

  const user = await findUserByEmail(email)
  const validPassword = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!user || !validPassword) {
    return sendJson(res, 401, { message: 'Invalid email or password' })
  }

  return sendJson(res, 200, {
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
}
