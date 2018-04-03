const fs = require("fs");
const path = require("path");
//功能:封装一个tree函数，打印出当前目录下得所有文件，格式如下：
// ├── a
// │   ├── a
// │   │   └── b
// │   └── b
// ├── a.js
// ├── b
// └── c
//     ├── a
//     ├── aa
//     │   └── aaa
//     └── abc
//         └── dddd


//读取root目录下所有的文件
function tree(root) {
  //如果没有传目录，那么默认当前目录
  root = root || __dirname;
  //不是最后一个文件时的前缀
  let prefix = "├── ";
  //最后一个文件时的前缀
  let prefix_last = "└── ";
  //var prefix = "│   ";
  //var prefix_last = "    ";
  _tree(root, prefix, prefix_last);
}

//内部方法，用于递归的遍历文件
function _tree(root, prefix, prefix_last) {
  //读取root目录下所有的文件
  let files = fs.readdirSync(root);
  files.forEach(function (item, index) {
    //碰到node_modules目录，跳过
    if (item === "node_modules") {
      return;
    }
    //当前文件是否是最后一个
    let isLast = false;
    
    if (index === files.length - 1) {
      //如果是最后一个， 打印 prefix_last
      console.log(prefix_last + item);
      isLast = true;
    } else {
      //如果不是最后一个，打印 prefix
      console.log(prefix + item);
    }
    
    //判断当前文件是否是目录，如果是目录，需要继续遍历。
    let itemDir = path.join(root, item);
    let status = fs.statSync(itemDir);
    if (status.isDirectory()) {
      let temp, temp1;
      //如果是第二层，直接在prefix的后面 添加 "|   "或者"   "即可，比如 "│   ├── a.js"
      //如果是第三层以上，需要在中间添加"|   "或者"   "
      let sep = isLast ? "    " : "│   ";
      if(prefix.length < 8) {
        temp = sep + prefix;
        temp1 = sep + prefix_last;
      }else {
        temp = prefix.slice(0, -4) + sep + prefix.slice(-4);
        temp1 = prefix_last.slice(0, -4) + sep + prefix_last.slice(-4);
      }
      _tree(itemDir, temp, temp1);
    }
  });
}

//导出tree方法
module.exports = tree;
