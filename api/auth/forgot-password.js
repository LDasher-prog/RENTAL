const crypto = require('crypto')
const { sendJson } = require('../_auth')
const { findUserByEmail, initializeDatabase, savePasswordResetToken } = require('../_db')

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

  const { email } = req.body || {}
  if (!email) {
    return sendJson(res, 400, { message: 'Email is required' })
  }

  await initializeDatabase()

  const user = await findUserByEmail(email)
  if (user) {
    const token = crypto.randomBytes(24).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    await savePasswordResetToken({ token, email: user.email, expiresAt })
  }

  return sendJson(res, 200, {
    message: 'If the email exists, a password reset link has been sent.',
  })
}
