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

module.exports = {errorHandler}