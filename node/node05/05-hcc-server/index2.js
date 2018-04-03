const fs = require("fs");
const http = require("http");
const template = require("art-template");
const path = require("path");

http.createServer((req, res) => {

  //处理用户的请求
  let url = req.url;
  if(url === "/"){
    let files = fs.readdirSync("./../");
    
    let tpl = template(path.join(__dirname, "tpl.html"), {files:files});
    
    res.end(tpl);
  }
 

}).listen(8080, err => {
  if(err) throw err;
  console.log("服务端启动成功");
});