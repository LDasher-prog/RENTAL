const googleHandler = require('./google')

module.exports = async (req, res) => {
  // Provide a friendly response for browser GET requests (preflight/navigation)
  // and delegate POST requests to the Google auth handler.
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ message: 'This endpoint accepts POST requests for Google sign-in' }))
  }

  return googleHandler(req, res)
}
