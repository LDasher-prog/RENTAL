const { authenticator } = require('otplib')
const { createToken, sendJson } = require('../_auth')
const bcrypt = require('bcryptjs')
const { findUserByEmail, initializeDatabase } = require('../_db')

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

  const { email, password, code } = req.body || {}

  if (!email || !password) {
    return sendJson(res, 400, { message: 'Email and password are required' })
  }

  await initializeDatabase()

  const user = await findUserByEmail(email)
  const validPassword = user ? await bcrypt.compare(password, user.password_hash) : false

  if (!user || !validPassword) {
    return sendJson(res, 401, { message: 'Invalid email or password' })
  }

  if (user.two_factor_enabled) {
    if (!code) {
      return sendJson(res, 200, {
        twoFactorRequired: true,
        message: 'Two-factor authentication code required',
      })
    }

    if (!user.totp_secret || !authenticator.check(String(code).trim(), user.totp_secret)) {
      return sendJson(res, 401, { message: 'Invalid two-factor authentication code' })
    }
  }

  return sendJson(res, 200, {
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      twoFactorEnabled: !!user.two_factor_enabled,
    },
  })
}
