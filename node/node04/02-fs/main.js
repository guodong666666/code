var fs = require("fs");
var path = require("path");

/*
fs.readdir("./", function(err, files) {
  if(err) {
    throw err;
  }

  console.log(files);
});*/

/*fs.stat("./", (err, status) => {
  console.log(status);
  console.log(status.isFile());//判断是否是文件
  console.log(status.isDirectory());//判断是否是目录
});*/


fs.readdir("../../../", (err, files) => {
  
  files.forEach(function(v) {
    
    fs.stat("../../../"+v, (err, status) => {
      if(status.isFile()) {
        console.log(v, "是文件");
      }else {
        console.log(v, "是目录");
      }
    });
    
  });
  
});