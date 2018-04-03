const fs = require("fs");
const path = require("path");

//删除目录(递归)
let removeDir = root => {
  
  //如果目录不存在，啥也不做
  if(!fs.existsSync(root)) {
    return;
  }
  
  //获取src下所有的文件
  let files = fs.readdirSync(root);
  
  
  files.forEach(item => {
    item = path.join(root, item);
    //读取item文件的状态
    let status = fs.statSync(item);
    if (status.isFile()) {
      //如果是文件，可以直接删除
      fs.unlinkSync(item);
    } else if (status.isDirectory()) {
      //如果是目录，递归执行
      removeDir(item);
    }
    
  });
  
  //遍历完成，将自己删除
  fs.rmdirSync(root);
  
};

//拷贝文件
let copyFile = (src, dist) => {
  fs.writeFileSync(dist, fs.readFileSync(src));
};

//拷贝目录(递归）
let copyDir = (src, dist) => {

  //先删除dist目录，然后创建dist目录，保证dist是一个空得文件夹
  removeDir(dist);
  fs.mkdirSync(dist);
  
  //读取src下所有的文件
  let files = fs.readdirSync(src);
  
  files.forEach( item => {
    
    let srcItem = path.join(src, item);
    let distItem = path.join(dist, item);
    
    let status = fs.statSync(srcItem);
    
    if(status.isFile()) {
      //如果是文件，copy
      copyFile(srcItem, distItem);
    }else {
      //如果是目录，递归
      copyDir(srcItem, distItem);
    }
    
    
  });
  
  
};



module.exports = {
  removeDir: removeDir,
  copyFile: copyFile,
  copyDir: copyDir
};