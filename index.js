const express = require('express')

const app = express()

const port = 5000;

const mangaRouter = require('./router/mangaRouter')
const userRouter = require('./router/userRouter')  

//app.get('/api/manga', function(req, res) {
    //res.send('hello')
//})

app.use(express.json())
app.use('/api/manga', mangaRouter);
app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log('Server', port)
})