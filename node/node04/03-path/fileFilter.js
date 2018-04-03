const fs = require("fs");
const path = require("path");

function filterFile(rootDir, extName) {

  let fileArray = [];

  function _filter(rootDir) {

    //读取文件
    let files = fs.readdirSync(rootDir);

    files.forEach( (v, i) => {
      v = path.join(rootDir, v);
      //读取v的状态
      let status = fs.statSync(v);
      
      if(status.isDirectory()) {
        //如果是目录，递归执行
        _filter(v);
      }else if(status.isFile() && path.extname(v) === extName) {
        //如果是文件，并且后最名等于传递进来的后缀名，保存到数组中
        fileArray.push(v);
      }
      
    });

  }
  
  _filter(rootDir);
  
  return fileArray;

}

//查找./demo目录下所有的js文件
console.log(filterFile("./demo", ".js"));;