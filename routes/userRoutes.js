const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => res.json(req.user))

router.get('/usernames', (req, res) => {
  User.findAll({})
    .then(users => {
      let username = []
      users.forEach(user => { usernames.push(user.username) })
      res.json(usernames)
    })
    .catch(err => console.log(err))
})

module.exports = router