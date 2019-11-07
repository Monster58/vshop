// vue.config.js
module.exports = {
    devServer: {
        port: "3000", //前台代理端口
        proxy: {
            "/api": {
                target: process.env.VUE_APP_BASEURL,
                ws: true, //如果要代理websockets
                changeOrigin: true, //将选项changeOrigin设置true为基于名称的虚拟托管站点。
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        }
    }
};