const { createToken, sendJson } = require('../_auth')
const { findUserByEmail, findUserByGoogleId, createUserWithGoogle, updateGoogleUser, initializeDatabase } = require('../_db')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const verifyGoogleToken = async (idToken) => {
  if (!idToken) {
    return null
  }

  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`)
  if (!response.ok) {
    return null
  }

  const payload = await response.json()
  if (payload.aud !== GOOGLE_CLIENT_ID || !payload.email_verified) {
    return null
  }

  return payload
}

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

  if (!GOOGLE_CLIENT_ID) {
    return sendJson(res, 500, { message: 'Google client ID is not configured' })
  }

  const { idToken } = req.body || {}
  if (!idToken) {
    return sendJson(res, 400, { message: 'Google ID token is required' })
  }

  const payload = await verifyGoogleToken(idToken)
  if (!payload) {
    return sendJson(res, 401, { message: 'Invalid Google ID token' })
  }

  await initializeDatabase()

  const googleId = String(payload.sub)
  const email = String(payload.email).toLowerCase()
  const name = String(payload.name ?? payload.email)
  const avatar = payload.picture ? String(payload.picture) : null

  let user = await findUserByGoogleId(googleId)
  if (!user) {
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      user = await updateGoogleUser({ googleId, email, name, avatar })
    } else {
      user = await createUserWithGoogle({ googleId, email, name, avatar })
    }
  }

  if (!user) {
    return sendJson(res, 500, { message: 'Unable to sign in with Google' })
  }

  return sendJson(res, 200, {
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  })
}
