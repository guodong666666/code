const path = require('path');
const template = require('art-template');

//增强res的功能
module.exports = function (res) {

  /**
   * 设置响应状态码
   * @param {number} code 状态码
   * @returns {object} 相应对象
   */
  res.status = code => {
    res.statusCode = code;
    return res;
  };

  /**
   * 响应内容，文本格式
   * @param {string} data 
   */
  res.send = data => {
    res.setHeader("content-type", 'text/plaint; charset=utf-8');
    res.end(data);
  };



  /**
   * 给res增加重定向功能
   * @param {重定向地址} location 
   */
  res.redirect = location => {
    res.writeHead(302, {
      'Location': location
    });
    res.end();
  }

  /**
   * 给res增加渲染方法
   * @param {string} viewName 渲染的视图路径 
   * @param {*} data 渲染的数据 
   */
  res.render = (viewName, data) => {
    let viewPath = path.join(__dirname, "../views", viewName);
    let html = template(viewPath, data || {});
    res.writeHead(200, {
      "content-type": "text/html;charset=ttf-8"
    });
    res.end(html);
  };

  return res;
}