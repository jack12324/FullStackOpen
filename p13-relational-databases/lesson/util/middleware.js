const jwt = require("jsonwebtoken");
const config = require("./config")

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), config.SECRET)
    } catch {
      return res.status(401).json({error: 'token invalid'})
    }
  } else {
    return res.status(401).json({error: 'token missing'})
  }
  next()
}

module.exports = {tokenExtractor, isAdmin}
