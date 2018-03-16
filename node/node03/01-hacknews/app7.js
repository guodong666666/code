//函数的封装
const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const url1 = require("url");
const _ = require("underscore");

const querystring = require('querystring');

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

  //获取post数据
  req.getPostData = callback => {
    let temp = [];
    req.on("data", chunk => {
      temp.push(chunk);
    });

    req.on("end", () => {
      //结束时，获取到参数
      let result = Buffer.concat(temp).toString("utf-8");
      //将参数解析成对象
      let obj = querystring.parse(result);
      callback(obj);
    })
  }

  //设计路由：
  let url = req.url.toLocaleLowerCase();
  let method = req.method.toLocaleLowerCase();
  
  if ((url === "/" || url === "/index") && method === "get") {//处理首页的请求
    readData( (err, data) => {
      if(err) {
        throw err;
      }
      //如果读取数据成功，返回index页面，并且渲染列表数据
      res.render(path.join(__dirname, "views", "index.html"), {list:data});
    });

  
  } else if (url.startsWith("/item") && method === "get") {//处理查看详情的请求
    //思路：获取到id
    let obj = url1.parse(url, true);
    let id = obj.query.id;
  
    //读取文件
    readData((err, data) => {
      if(err) {
        throw err;
      }
      //获取data中指定id的数据
      let temp = null;//接收查询到得对象
      data.forEach(function(v) {

        //不能用3个等
        if(v.id == id) {
          temp = v;
        }
      });
      if(temp) {
        res.render(path.join(__dirname, "views", "details.html"), {item:temp});
      }else {
        res.end("no data");
      }
      
    })
    
  } else if (url === "/submit" && method === "get") {//处理submit的页面请求
    res.render(path.join(__dirname, "views", "submit.html"));
  } else if (url.startsWith("/resources") && method === "get") {//处理静态资源
    res.render(path.join(__dirname, url), res);
  } else if (url.startsWith("/add") && method === "get") { //处理get方式的add请求
   
    readData((err, data) => {
      if (err) {
        throw err;
      }

      //url模块解析出来的地址对象
      let obj = url1.parse(url, true);
      //给参数添加一个id属性
      obj.query.id = data.length;
      //将参数对象添加到数组中
      data.push(obj.query);
      //将数组写入到文件中
      writeData(JSON.stringify(data), err => {
        if (err) {
          throw err;
        }
        //写入成功，重定向到首页
        res.writeHead(302, "found", {
          "location": "/"
        });
        res.end();
      })
      
    })

  } else if (url.startsWith("/add") && method === 'post') {//处理post请求添加数据
    req.getPostData(obj => {
      //读取data文件的数据
      readData((err, data) => {
        //给obj设置id
        obj.id = data.length;
        data.push(obj);
        //写入到data.json文件
        writeData(JSON.stringify(data), err => {
          if(err) {
            throw err;
          }
          //如果写入文件成功
          res.writeHead(302, "found", {
            "location": "/"
          });
          res.end();
        })
      });
    })
  } else {//处理返回404
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
});


//封装一个函数，能够读取data.json中的数据
function readData(callback) {
  let dataPath = path.join(__dirname, "data", "data.json");
  fs.readFile(dataPath, "utf-8", (err, data) => {
    if(err) {
      //如果报错了
      return callback(err);
    }
    //没有报错
    let list = JSON.parse(data || '[]');
    //如果没有报错，第一个参数返回null，第二个参数返回list
    callback(null, list);
  });
}

//封装一个函数，能够往data.json中写入数据
function writeData(data, callback) {
  let dataPath = path.join(__dirname, "data", "data.json");
  fs.writeFile(dataPath, data, err => {
    if(err) {
      //如果报错，将错误信息传递给callback
      return callback(err);
    }
    callback();
  })
}

