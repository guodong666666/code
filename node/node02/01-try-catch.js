//在node中，try..catch只能捕获同步操作的异常，无法捕获异步操作的异常

const fs = require("fs");

fs.writeFile("./sss/abc.txt", "大家好", "utf-8", (err) => {
  if(err) {
    throw err;
  }
  console.log("ok");
});

fs.readFile("./text", err => {

});


fs.readFile("111", err => {

});
