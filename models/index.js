const User = require('./User.js')
const Post = require('./Post.js')
const Comment = require('./Comment.js')

User.hasMany(Post, { foreignKey: 'uid' })

Post.belongsTo(User, { as: 'u', foreignKey: 'uid' })

User.hadMany(Comment, { foreignKey: 'uid' })

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' })

Comment.belongsTo(User, { as: 'u', foreignKey: 'uid' })

module.exports = { User, Post, Comment }
