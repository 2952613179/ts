module.exports = {
    /*devServer: {
        proxy: {
            '/api': {
                // target: 'http://301lh57485.wicp.vip', // 你请求的第三方接口
                // target: "http://127.0.0.1:8279",
                // target: "http://43.227.66.156:8279",
                target: "http://liandyao.vicp.net",
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {  // 路径重写，
                    '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
                }
            }
        }
    },
*/
    // config.plugins.delete('prefetch')
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
    publicPath: "./",
    assetsDir: 'static'
}
