const express = require('express')
const mangaRouter = express.Router()

const mangas = [
    {id: '1', name: 'a'},
    {id: '2', name: 'b'},
    {id: '3', name: 'c'},
]

mangaRouter.get('/', function(req, res) {
    res.send(mangas)
})

mangaRouter.post('/', function (req, res) {
    const newManga = {
        id: `${mangas.length + 1}`,
        name: req.body.name,
    };
    mangas.push(newManga);
    res.send(mangas);
});


mangaRouter.put('/', function (req, res) {
    mangas.map((item) => {
        if(item.id = req.body.id)
    {item.name = req.body.name}
    })
    res.send(mangas);
})

mangaRouter.delete('/', function (req, res) {
    mangas.filter(item => 
        item.id !== req.body.id
    )
    res.send(newManga);
})

module.exports = mangaRouter();