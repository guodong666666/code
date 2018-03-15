const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url1 = require("url");
const arr = [];


http.createServer((req, res) => {

  res.render = (filename) => {
  
    fs.readFile( filename, (err, data) =>{
      if(err) {
        res.writeHead(404, "Not Found!", {"content-type": "text/html;charset=utf-8"});
        res.end("404 page not found");
        return;
      }
      res.setHeader("content-type", mime.getType(filename));
      res.end(data);
    });
  };
  //设计路由：
  let url = req.url.toLocaleLowerCase();
  let method = req.method.toLocaleLowerCase();
  if((url === "/" || url === "/index") && method === "get"){
    //如果用户访问 / 和 /index，显示新闻列表 get请求
    res.render(path.join(__dirname, "views", "index.html"));
  }else if(url === "/item" && method === "get") {
    //如果用户是访问 /item，显示新闻详情  get请求
    res.render(path.join(__dirname, "views", "details.html"));
  }else if(url === "/submit" && method === "get") {
    //如果用户访问 /submit, 显示增加新闻的页面 get请求
    res.render(path.join(__dirname, "views", "submit.html"));
  } else if (url.startsWith("/resources") && method === "get"){
    res.render(path.join(__dirname, url), res);
  } else if (url.startsWith("/add") && method === "get") {
    //如果是add请求，并且是get方式
    //获取参数，通过url模块进行解析。
    let obj = url1.parse(url, true);
    arr.push(obj.query);

    fs.writeFile(path.join(__dirname, "data", "data.json"), JSON.stringify(arr), err => {
      if(err) {
        throw err;
      }
      res.writeHead(302, "found", {"location":"/"});
      res.end();
    });
    
  } else {
    res.writeHead(404, "Not Found!", {"content-type": "text/html;charset=utf-8"});
    res.end("404 page not found");
  }
  
  

  

}).listen("8080", err=>{
  if(err){
    throw err;
  }
  console.log("服务器启动成功");
})