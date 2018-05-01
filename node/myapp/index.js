//加载express模块
var express = require('express');
//创建app对象
var app = express();

//监听路径为/的请求
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//创建服务，监听3000端口
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("服务器启动成功");
});