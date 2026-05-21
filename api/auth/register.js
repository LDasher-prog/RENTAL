const { createToken, roles, sendJson } = require('../_auth')

module.exports = async (req, res) => {
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

  const user = {
    id: `user-${Date.now()}`,
    name,
    email: String(email).toLowerCase(),
    role,
  }

  return sendJson(res, 201, {
    token: createToken(user),
    user,
  })
}
