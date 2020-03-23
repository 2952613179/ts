import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";

Vue.use(VueRouter);

import routes from "./routes";


const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
let timeOut = null;
router.beforeEach(((to, from, next) => {
    if (to.matched[0]) {
        document.title = to.matched[0].meta.title;
    }

    let session = sessionStorage.getItem("obj");

    if (session !== "" && session != null) {
        store.commit("createUser", JSON.parse(session));
    }
    clearTimeout(timeOut);
    setTimeout(() => {
        sessionStorage.setItem("obj", "");
    }, 1000 * 60 * 15);

    if ((to.path !== "/login" && to.path !== "/register") && !store.state.user.userId) {
        next("/login")
    } else {
        if (store.state.user.userType === 0 && to.path.indexOf("teacher") > -1) {
            next(from);
        } else {
            next();
        }
    }
}))
export default router
