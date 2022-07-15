const express = require('express');

const userRouter = express.Router();

const users = [
    { id: 1, name: 'Nguyen Tuan Anh' },
    {id: 2, name: 'Xuan Tung 1'},
    {id: 3, name: 'Xuan Tung 2'},
]

userRouter.get('/', function(req, res) {
    res.send(users)
})

userRouter.post('/', function(req, res) {
    const newUser = {
        id: `${users.length + 1}`,
        name: req.body.name,
    }
    users.push(newUser)
    res.send(users)
})

userRouter.put('/', function(req, res) {
    users.map ((i) => {if (i.id = req.body.id) {
        i.name = req.body.name
    }})
    res.send(users)
})

userRouter.delete('/', function(req, res) {
    users.filter(i => i.id !== req.body.id)
    res.send(users)
})