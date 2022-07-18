var express = require('express');
var userRouter = express.Router();
const Joi = require('joi');
/* GET users listing. */
userRouter.post('/', function(req, res, next) {
  const { body } = req;
  const { error } = userValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
  res.render('userInfo', { body })
});

function userValidate(user){
  
  const schema = Joi.object({
    firstname : Joi.string(),
    lastname : Joi.string(),
    email: Joi.string().email(),
    date : Joi.date().min('2-1-1999'),
    gender :Joi.string(),
    phone : Joi.string().min(10).max(12),
    subject : Joi.string()
      

  })
  return schema.validate(user)
}


module.exports = userRouter;
