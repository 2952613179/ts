import Axios from "axios"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
import element from "element-ui"
export const request = function (config) {
    NProgress.start();
    const host = window.location.host;
    console.log(host);
    const itf = Axios.create({
        // 解决跨域无session
        withCredentials: true,
        baseURL: "http://" + host,
        // baseURL: "/api",
        timeout: 10 * 1000,
        traditional: false
    });

    itf.interceptors.response.use(result => result.data);

    return new Promise((resolve, reject) => {
        itf(config).then(result => {
            NProgress.done();
            resolve(result);
        }).catch(result => {
            NProgress.done();
            element.Message.error("网络异常");
            reject(result);
        })
    });
}