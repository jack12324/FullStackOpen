const jwt = require("jsonwebtoken");
const config = require('./config')
const errorHandler = (error, req, res, next) => {
  console.log(error)
  if(error.name.includes('Sequelize')){
    if(error.errors){
      error = error.errors[0].message
    } else if (error.original){
      error = `Database Error: ${error.original.routine} sql: ${error.original.sql}`
    }
  }
  res.status(400).json({error})
  next(error)
}


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    try {
      req.token = jwt.verify(authorization.substring(7), config.SECRET)
    } catch {
      return res.status(401).json({error: 'token invalid'})
    }
  } else {
    return res.status(401).json({error: 'token missing'})
  }
  next()
}

module.exports = {errorHandler, tokenExtractor}