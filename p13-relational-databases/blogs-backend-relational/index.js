const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./routes/blogs')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const authorRouter = require('./routes/authors')
const {PORT} = require('./util/config')
const {connectToDatabase} = require("./util/db");
const middleware = require('./util/middleware')

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
