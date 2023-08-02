const router = require('express').Router()

const {Blog} = require('../models')

router.get('/', async (req, res) => {
  const notes = await Blog.findAll()
  res.json(notes)
})
router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    return res.json(blog)
})

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    return res.json(blog)
})
router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    return res.status(200).end()
})

module.exports = router