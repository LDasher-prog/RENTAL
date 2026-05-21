import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Rentals backend is ready' })
})

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`)
})
