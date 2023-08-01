require('dotenv').config()
const { Sequelize, Model, DataTypes} = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.TEXT,
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  }
  }, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})
app.get('/api/blogs', async (req, res) => {
  const notes = await Blog.findAll()
  res.json(notes)
})
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})
app.delete('api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog.destroy()
    return res.status(200).end()
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})