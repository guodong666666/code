//处理submit请求
const http = require("http");
const router = require("./router");

http.createServer((req, res) => {
  
  //给res添加render方法
  res.render = (viewName, data) => {
    
  };


  //启动路由
  router(req, res);

}).listen(8080, err => {
  if (err) throw err;
  console.log("服务器启动成功了");
});