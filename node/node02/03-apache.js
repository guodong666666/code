const http = require("http");
const fs = require("fs");
const path =require("path");
const mime = require("mime");

http.createServer((req, res) => {

  //静态资源路径
  let publicPath = path.join(__dirname, "/public");
  let filePath = path.join(publicPath, req.url);


  if(filePath.includes("favicon.ico")){
    res.end();
    return;
  }

  //读取文件的内容
  console.log(filePath);
  fs.readFile(filePath, (err, data) => {
    if(err) {
      res.statusCode = 404;
      res.statusMessage = "not Found!";
      res.end("404, not Found!");
      return;
    }

    //设置响应头
    res.setHeader("content-type", mime.getType(filePath));
    res.end(data);
 
  })
  

}).listen("8080", err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("服务器启动成功");
})