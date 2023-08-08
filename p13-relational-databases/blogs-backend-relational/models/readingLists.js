const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../util/db");

class ReadingLists extends Model {}

ReadingLists.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'users', key: 'id'}
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'blogs', key: 'id'}
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_lists'
})

module.exports = ReadingLists