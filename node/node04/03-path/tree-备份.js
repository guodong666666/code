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



tree("./");

//1. 读取root目录下所有的文件


function tree(root) {
  var suffix = "├── ";
  var suffix_last = "└── ";
  var prefix = "│   ";
  var prefix_last = "    ";
  _tree(root, suffix, suffix_last);
  function _tree(root, suffix, suffix_last) {
    //读取root目录下所有的文件
    let files = fs.readdirSync(root);
    files.forEach(function (item, index) {
      
      var isLast = false;
      if (item === "node_modules") {
        return;
      }
      
      if (index != files.length - 1) {
        //如果不是最后一个，打印 suffix
        console.log(suffix + item);
      } else {
        console.log(suffix_last + item);
        isLast = true;
      }
      
      //考虑第二层
      let itemDir = path.join(root, item);
      let status = fs.statSync(itemDir);
      
      //如果是目录，需要继续遍历
      if (status.isDirectory()) {
        //需要做判断，如果当前文件的父元素是最后一个了，那么添加带空格的前缀即可
        
        //prefix_last不应该加到最终传进来的路径的前面
        
        var temp, temp1;
        if(suffix.length >= 8) {
          temp = suffix.slice(0, -4) + (isLast ? prefix_last : prefix) + suffix.slice(-4);
          temp1 = suffix_last.slice(0, -4) + (isLast ? prefix_last : prefix) + suffix_last.slice(-4);
        }else {
          temp = (isLast ? prefix_last : prefix) + suffix;
          temp1 = (isLast ? prefix_last : prefix) + suffix_last;
        }
        
        _tree(itemDir, temp, temp1);
      }
      
    });
    
  }
}
