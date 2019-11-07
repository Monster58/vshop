// vue.config.js
module.exports = {
  devServer: {
    port: "3000", //前台代理端口
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        ws: true, //如果要代理websockets
        changeOrigin: true //将选项changeOrigin设置true为基于名称的虚拟托管站点。
      }
    }
  }
};
