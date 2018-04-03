//处理submit请求
const fs = require("fs");
const path = require("path");
const http = require("http");
const mime = require("mime");
const template = require("art-template");
const querystring = require("querystring");
const moment = require("moment");

http.createServer((req, res) => {
  
  let url = req.url;
  let method = req.method.toLowerCase();
  let dbPath = path.join(__dirname, 'data', "data.json");
  if (url === "/" || url === "/index") {
    //读取views下的feedback.html文件
    fs.readFile(dbPath, "utf8", (err, data) => {
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
  } else if (url === "/add" && method === "post") {
    let postData = "";
    //注册data事件,会触发多次
    req.on("data", chunk => {
      postData += chunk;
    });
    
    //注册end事件
    req.on("end", () => {
      //在end事件中表示代码提交完成了
      //使用querystring模块处理post请求的数据
      let result = querystring.parse(postData);
      result.time = moment().format("YYYY-MM-DD hh:mm:ss");
      
      //把结果写入到data.json中
      fs.readFile(dbPath, "utf8", (err, data) => {
        if(err) throw err;
        let temp = JSON.parse(data);
        temp.message.unshift(result);
        
        fs.writeFile(dbPath, JSON.stringify(temp), err => {
          if(err) throw err;
          //如果文件写入成功了，跳转到首页
          res.writeHead(302, {
            "location":"/"
          });
          res.end();
        });
      });
      
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