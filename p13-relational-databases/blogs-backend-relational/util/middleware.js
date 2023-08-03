const errorHandler = (error, req, res, next) => {
  if(error.name.includes('Sequelize')){
    error = error.errors[0].message
  }
  res.status(400).json({error})
  next(error)
}

module.exports = {errorHandler}