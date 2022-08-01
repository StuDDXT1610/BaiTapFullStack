var express = require('express');
var router = express.Router();
const {registerValidation, loginValidation} = require('../validation/userValidate');
const User = require('../models/user.models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const verifyUserMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
   const { error } = registerValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message)

   const emailExists = User.findOne({ email: req.body.email }) 
   if (emailExists) return res.status(400).send('Email co roi register cai khac di')

   const salt = bcrypt.genSalt(10)
   const hashPassword = bcrypt.hash(req.body.password, salt)

   const newUser = new User()
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.password = hashPassword

  try {
    const user = await newUser.save()
    res.send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { err } = loginValidation(req.body)
  if (err) return res.status(400).send(err.details[0].message)

  const userLogin = await User.findOne({ email: req.body.email})
  if (!userLogin) return res.status(400).send('User does not exist in data')

  const passLogin = await bcrypt.compare(req.body.password, userLogin.password)
  if (!passLogin) return res.status(400).send('Password is incorrect')

  const token = jwt.sign({ _id : userLogin._id}, 'khong the can pha')
  res.header('auth-token', token).send(token)
})

router.get('/', verifyUserMiddleware, (req, res) => {
    res.send('hello world')
})

module.exports = router;
