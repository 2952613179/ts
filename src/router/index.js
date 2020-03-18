import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("../views/account/Login");
const Register = () => import("../views/account/Register");


const StudentHome = () => import("../views/student/Home");
const StudentSign = () => import("../views/student/Sign");
const StudentSignMessage = () => import("../views/student/SignMessage");
const StudentJob = () => import("../views/student/Job");
const StudentJobMessage =  () => import("../views/student/JobMessage");
const StudentUser =  () => import("../views/student/User");


Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录"
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            title: "注册"
        }
    },
    {
        path: "/student/home",
        component: StudentHome,
        meta: {
            title: "学生端"
        },
        children: [
            {
                path: "",
                redirect: "sign"
            },
            {
                path: "sign",
                component: StudentSign
            },
            {
                path: "signMessage",
                component: StudentSignMessage
            },
            {
                path: "job",
                component: StudentJob
            },
            {
                path: "jobMessage",
                component: StudentJobMessage
            },
            {
                path: "user",
                component: StudentUser
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(((to, from, next) => {
    document.title = to.matched[0].meta.title;
    next();
}))
export default router
