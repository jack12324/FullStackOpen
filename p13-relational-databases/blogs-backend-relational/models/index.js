const Blog = require('./blog')
const User = require('./user')
const ReadingList = require("./readingLists");

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, {through: ReadingList, as: 'users_reading'})
User.belongsToMany(Blog, {through: ReadingList, as: 'readings'})

module.exports = {
  Blog,
  User,
  ReadingList
}