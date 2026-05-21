const { createToken, demoPassword, demoUser, sendJson } = require('../_auth')

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { message: 'Method not allowed' })
  }

  const { email, password } = req.body || {}

  if (!email || !password) {
    return sendJson(res, 400, { message: 'Email and password are required' })
  }

  const isDemoUser = String(email).toLowerCase() === demoUser.email
  if (!isDemoUser || password !== demoPassword) {
    return sendJson(res, 401, { message: 'Invalid email or password' })
  }

  return sendJson(res, 200, {
    token: createToken(demoUser),
    user: demoUser,
  })
}
