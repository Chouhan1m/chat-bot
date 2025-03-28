import path from 'path'
import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT

const __dirname = path.resolve()

app.use(express.json()) //parse the incoming json
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server running on port ${PORT}`)
})
