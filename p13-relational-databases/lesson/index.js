const config = require('./util/config')
const notesRouter = require('./routes/notes')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const {connectToDatabase} = require('./util/db')
const express = require('express')
const app = express()

app.use(express.json())

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`)
  })
}

start()
