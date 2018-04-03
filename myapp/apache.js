const express = require("express");

let app = express();


app.get("/", (req, res) => {
  res.jsonp({name:"zs", age:18});
})


app.listen(8080, function() {
  console.log("服务器启动成功了");
});