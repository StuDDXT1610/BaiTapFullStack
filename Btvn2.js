const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/index') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        res.write('<h3><b>This is home page</b></h3>');
        
        return res.end();
    } else if (req.url === '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h3><b>Name: Dao Xuan Tung, Age: 19, Gender: M</b></h3>');
        return res.end()
    } else {
        res.end('<h1>Not Found</h1>')
    }
})

server.listen(5000)