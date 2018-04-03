const fs = require("fs");
const http = require("http");

http.createServer((req, res) => {

  //处理用户的请求
  let url = req.url;
  if(url === "/"){
    let tpl = fs.readFileSync('./tpl.html', "utf8");
    let files = fs.readdirSync("./../");
    let content = "<ul>";
    files.forEach(item => {
      content += "<li>"+item+"</li>";
    });
    content += '</ul>';
    tpl = tpl.replace("{{content}}", content);
    res.end(tpl);
  }
 

}).listen(8080, err => {
  if(err) throw err;
  console.log("服务端启动成功");
});