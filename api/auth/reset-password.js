const { sendJson } = require('../_auth')
const { initializeDatabase, findPasswordResetToken, deletePasswordResetToken, updateUserPassword } = require('../_db')

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

  const { token, password } = req.body || {}
  if (!token || !password) {
    return sendJson(res, 400, { message: 'Token and password are required' })
  }

  await initializeDatabase()

  const resetEntry = await findPasswordResetToken(token)
  if (!resetEntry) {
    return sendJson(res, 400, { message: 'Invalid or expired reset token' })
  }

  const expiresAt = new Date(resetEntry.expires_at)
  if (expiresAt.getTime() < Date.now()) {
    await deletePasswordResetToken(token)
    return sendJson(res, 400, { message: 'Reset token has expired' })
  }

  await updateUserPassword(resetEntry.email, password)
  await deletePasswordResetToken(token)

  return sendJson(res, 200, { message: 'Your password has been reset successfully' })
}
