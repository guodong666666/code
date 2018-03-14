const http = require("http");
const fs = require("fs");
const path = require("path");

//开启服务
http.createServer((req, res) => {
  //获取请求地址
  let url = req.url;
  console.log(url);
  //拼接文件路径
  let filePath = path.join(__dirname,"/pages", url);
  console.log(filePath);

  

  //读取文件
  fs.readFile(filePath, (err, data) => {
    if(err) {
      
      //如果没有这个文件，返回404
      fs.readFile(path.join(__dirname, "/pages/error.html"), (err, data) => {
        res.end(data);
      });

    }
    //响应数据
    res.end(data);
  })

  //读取文件

}).listen("8080", (err) => {
  if(err) {
    throw err;
  }
  console.log("服务器启动成功了");
})