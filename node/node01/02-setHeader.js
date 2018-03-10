//创建一个简单的http服务程序

//1. 加载http模块
const http = require("http");

//2. 创建一个http服务对象
let server = http.createServer();


//3. 监听用户的请求
  //req:用户的请求数据
  //res:给用户的响应数据。
server.on("request", (req, res) => {
  
  //设置响应报文头
  res.setHeader("content-type", "text/plain;charset=utf-8");

  //服务器响应数据
  res.write("hello world");
  res.write("你好，世界");
  //结束响应， 注意不过不结束响应，客户端会一直等待。
  res.end();
});

//4. 启动服务器，监听某个端口 
  //function是回调函数，服务器启动的回调函数
server.listen("80", function() {
  console.log("服务器启动成功");
});