const url = require('url');

module.exports = function (req) {

  let urlObj = url.parse(req.url, true);
  //将pathname和query挂载到req上，方便使用
  req.pathname = urlObj.pathname;
  req.query = urlObj.query;

}