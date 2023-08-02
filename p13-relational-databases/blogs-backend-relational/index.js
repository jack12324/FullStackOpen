const express = require('express')
const app = express()
require('express-async-errors')
const blogRouter = require('./routes/blogs')
const {PORT} = require('./util/config')
const {connectToDatabase} = require("./util/db");
const middleware = require('./util/middleware')

app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
