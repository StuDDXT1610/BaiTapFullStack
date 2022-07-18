var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  // khi người dùng truy cập bằng get vào đường dẫn / thì gọi callback function khi ng dùng request thì trả về respond
  res.render('index', { title: 'Express' }); // title là 1 variables, js giao tiếp với node qua hàm render, tham số 1 là view và tham số 2,3.. là 1 biến /object truyền vào
});

module.exports = router;
