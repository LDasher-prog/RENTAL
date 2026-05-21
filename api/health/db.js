const { initializeDatabase, pool } = require('../_db')
const { sendJson } = require('../_auth')

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { message: 'Method not allowed' })
  }

  await initializeDatabase()
  const result = await pool.query('SELECT NOW() AS now')

  return sendJson(res, 200, {
    status: 'ok',
    databaseTime: result.rows[0].now,
  })
}
