const router = require('express').Router()

const {Blog, User} = require('../models')
const config = require('../util/config')
const jwt = require("jsonwebtoken");

const extractToken = async (req, res, next) => {
    const auth = req.get('authorization')
    if(auth && auth.toLowerCase().includes('bearer ')){
        try{
            req.token = jwt.verify(auth.substring(7), config.SECRET)
        } catch{
            return res.status(401).json({error: 'token invalid'})
        }
    } else {
        return res.status(401).json({error: 'token missing'})
    }
    next()
}
router.get('/', async (req, res) => {
  const notes = await Blog.findAll({
      attributes: {exclude: ['userId']},
      include: {
          model: User,
          attributes: ['name']
      }
  })
  res.json(notes)
})
router.post('/', extractToken, async (req, res) => {
    console.log(req.body)
    const blog = await Blog.create({...req.body, userId: req.token.id})
    return res.json(blog)
})

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    return res.json(blog)
})
router.delete('/:id', extractToken, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog.userId === req.token.id){
        await blog.destroy()
        res.status(200).end()
    } else {
        res.status(403).json({error: "User is not authorized to delete this blog"})
    }
})

module.exports = router