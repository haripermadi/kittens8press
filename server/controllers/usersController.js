const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

module.exports = {
  signUp: (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, salt);
    let input = {
      username: req.body.username,
      email: req.body.email,
      password: hash
    }

    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(userData => {
      if(userData === null){
        User.create(input,(error, newuser) =>{
          console.log('newuser==', newuser)
          if(!error){
            let token = jwt.sign({id:newuser._id,email:newuser.email}, process.env.SECRET)
            res.status(201).json({
              message: 'success create new user',
              userNew: {
                id: newuser._id,
                username: newuser.username,
                token: token
              }
            })
          }else{
            res.status(400).json({
              message: "failed create new user",
              error
            })
          }
        })
      }else{
        res.status(400).json({
          message: "email already reqistered, please use another email!",
        })
      }
    }).catch(err => {
      res.status(400).json({
        message: "error",
        err
      })
    })
  },
  signIn: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .exec()
    .then(dataUser => {
      if(dataUser) {
        let chekPassword = bcrypt.compareSync(req.body.password, dataUser.password) //true
        if(chekPassword) {
          let token = jwt.sign({id:dataUser._id,email:dataUser.email}, process.env.SECRET)
          res.status(200).json({
            message: 'login success',
            loginUser: {
              id: dataUser._id,
              username: dataUser.username,
              token: token
            }
          })
        } else {
          res.status(400).json({
            message: 'email/password wrong'
          })
        }
      } else {
        res.status(400).json({
          message: 'something wrong!'
        })
      }
    }).catch(error => {
      res.status(400).json({
        message: 'user not found!'
      })
    })
  }
}