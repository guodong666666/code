var fs = require("fs");

function copy(src, dist, callback) {
  fs.readFile(src, (err, data) =>{
    if(err) {
      return callback(err);
    }
    
    
    fs.writeFile(dist, data, err => {
      
      if(err) {
        return callback(err);
      }
      
      //如果成功，返回null
      callback(null);
    })
    
  })
}

module.exports = copy;