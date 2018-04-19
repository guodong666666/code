const indexController = require('../controllers/index')

//处理首页的路由
module.exports = function (req, res) {
  var pathname = req.pathname;
  if (pathname == "/") {
    indexController.showIndex(req, res);
  }
}