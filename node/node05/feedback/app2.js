//配合模板引擎渲染数据
const fs = require("fs");
const path = require("path");
const http = require("http");
const mime = require("mime");
const template = require("art-template");

http.createServer((req, res) => {
  
  let url = req.url;
  if (url === "/" || url === "/index") {
    //读取views下的feedback.html文件
    fs.readFile(path.join(__dirname, 'data', "data.json"), "utf8", (err, data) => {
      if (err) {
        res.end("404, not Found");
        return;
      }
      let tpl = template(path.join(__dirname, "views", "feedback.html"), JSON.parse(data));
      res.end(tpl);
    });
  } else if (url === "/submit") {
    //读取views下的form.html文件
    fs.readFile(path.join(__dirname, 'views', "form.html"), (err, data) => {
      if (err) {
        res.end("404, not Found");
        return;
      }
      res.end(data);
    });
  } else if (url.startsWith("/public")) {
    //读取public下得静态资源
    fs.readFile(path.join(__dirname, url), (err, data) => {
      if (err) {
        res.end("404, not Found");
        return;
      }
      
      let type = mime.getType(url);
      //设置响应头
      res.writeHead(200, "ok", {
        'content-type': type.startsWith("text/") ? type + ";charset=utf-8" : type
      });
      res.end(data);
      
    });
    
    
  } else {
    //读取404页面
    fs.readFile(path.join(__dirname, 'views', "404.html"), (err, data) => {
      if (err) {
        res.end("404, not Found");
        return;
      }
      res.end(data);
    });
  }
  
}).listen(8080, err => {
  if (err) throw err;
  console.log("服务器启动成功了");
});


//赋值