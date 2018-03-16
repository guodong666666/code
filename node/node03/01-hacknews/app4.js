//实现post提交
const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url1 = require("url");
const _ = require("underscore");

const querystring = require('querystring');

let dataPath = path.join(__dirname, "data", "data.json");
http.createServer((req, res) => {

  res.render = (filename, tplData) => {

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, "Not Found!", {
          "content-type": "text/html;charset=utf-8"
        });
        res.end("404 page not found");
        return;
      }

      if(tplData) {
        //如果传了模板数据，需要使用模板渲染
        let fn = _.template(data.toString("utf-8"));
        data = fn(tplData);
      }
      res.setHeader("content-type", mime.getType(filename));
      res.end(data);
    });
  };
  //设计路由：
  let url = req.url.toLocaleLowerCase();
  let method = req.method.toLocaleLowerCase();
  if ((url === "/" || url === "/index") && method === "get") {
    //如果用户访问 / 和 /index，显示新闻列表 get请求
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if(err) {
        throw err;
      }
      let list = JSON.parse(data || '[]');
      res.render(path.join(__dirname, "views", "index.html"), {list:list});
    })




  } else if (url === "/item" && method === "get") {
    //如果用户是访问 /item，显示新闻详情  get请求
    res.render(path.join(__dirname, "views", "details.html"));
  } else if (url === "/submit" && method === "get") {
    //如果用户访问 /submit, 显示增加新闻的页面 get请求
    res.render(path.join(__dirname, "views", "submit.html"));
  } else if (url.startsWith("/resources") && method === "get") {
    res.render(path.join(__dirname, url), res);
  } else if (url.startsWith("/add") && method === "get") {
    //如果是add请求，并且是get方式
    //获取参数，通过url模块进行解析。
    let obj = url1.parse(url, true);

    //读取data.json中的数据，将读取到的数据转换成数组
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        throw err;
      }

      var arr = JSON.parse(data || '[]');
      arr.push(obj.query);

      fs.writeFile(path.join(__dirname, "data", "data.json"), JSON.stringify(arr), err => {
        if (err) {
          throw err;
        }
        res.writeHead(302, "found", {
          "location": "/"
        });
        res.end();
      });

    });


  } else if (url.startsWith("/add") && method === 'post') {
    //实现post提交数据
    //1. 获取用户post提交的数据
    //1.1 监听req对象的data事件， 监听req对象的end事件。
    //2. 把post提交的数据写入data.json中

    //chunk:指的是每次提交上来的一小部分数据,chunk是一个buffer类型的对象
    let arr = []; //保存用户每次提交的数据
    req.on("data", chunk => {
      arr.push(chunk);
    });

    //end事件触发，表示数据已经提交完毕了
    req.on("end", () => {
      //把arr中的所有数据都汇总起来即可。转换成字符串
      let result = Buffer.concat(arr).toString("utf-8");

      //使用url模块解析内容，添加到data.json中
      //获取参数，通过url模块进行解析。
      let obj = querystring.parse(result);
      //读取data.json中的数据，将读取到的数据转换成数组
      console.log(obj);
      fs.readFile(dataPath, "utf-8", (err, data) => {
        if (err) {
          throw err;
        }
        var arr = JSON.parse(data || '[]');
        arr.push(obj);
        fs.writeFile(path.join(__dirname, "data", "data.json"), JSON.stringify(arr), err => {
          if (err) {
            throw err;
          }
          res.writeHead(302, "found", {
            "location": "/"
          });
          res.end();
        });

      });

    });

  } else {
    res.writeHead(404, "Not Found!", {
      "content-type": "text/html;charset=utf-8"
    });
    res.end("404 page not found");
  }





}).listen("8080", err => {
  if (err) {
    throw err;
  }
  console.log("服务器启动成功");
})