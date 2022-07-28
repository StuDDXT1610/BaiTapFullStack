const express = require('express');
const router = express.Router();

const userModels = require('../models/user.models')

/* GET users listing. */
router.get('/', function(req, res) {
  const userName = req.query.name
  userModels.find({ name: userName }).exec((err, users) => {
    if (err) {
      res.send('loi roi');
    } else {
      console.log('lấy thành công thông tin user' )
      res.json(users)
    }
  })
});

//add more user
router.post('/', (req, res) => {
   const user = new userModels()
   user.name = req.body.name
   user.age = req.body.age
   user.address = req.body.address
   user.gender = req.body.gender
   user.phoneNUmber = req.body.phoneNUmber
   user.email = req.body.email

   user.save((err, data) => {
      if (err) {
        console.log(err)
        res.send('lỗi xảy ra khi thêm user')
      } else {
        console.log('thêm thành công')
        res.send(data)
      }
   })
})

//update by id
router.put('/:id', (req, res) => {
  userModels.findByIdAndUpdate(
    {_id:  req.params.id},
    { $set: { name: req.body.name, 
              age: req.body.age,
              gender: req.body.gender,
              address: req.body.address,
              phoneNumber: req.body.phoneNUmber,
              email: req.body.email                         
            }},
    {
      upsert: false,
    },
    (err, users) => {
      if (err) {
        console.log(err)
        res.send('co loi xay ra khi update')
      }else{
        res.json(users)
      }
    }
    )
})

// update by  phoneNUmber
router.put('/', (req, res) => {
  userModels.findOneAndUpdate(
    {_phoneNumber: req.params.phoneNumber},
    { $set: { name: req.body.name, 
              age: req.body.age,
              gender: req.body.gender,
              address: req.body.address,
              phoneNumber: req.body.phoneNUmber,
              email: req.body.email                         
    }},
    {
      new: true,
      upsert: true,
    },
    (err, users) => {
      if (err) {
        console.log(err);
        res.send('co loi xay ra khi update')
      } else {
        res.json(users);
      }
    }
    )
})

//Delete

router.delete('/:id', (req, res) => {
  userModels.findByIdAndDelete(
    {_id: req.params.id},
    function(err, user) {
      if (err) {
        console.log(err);
        res.send('co loi xay ra khi delete')
      } else {
        console.log('xoa thanh cong')
        res.json(user)
      }
    }
    )
})



module.exports = router;
