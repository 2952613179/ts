const Login = () => import("../views/account/Login");
const Register = () => import("../views/account/Register");


const StudentHome = () => import("../views/student/Home");
const StudentSign = () => import("../views/student/Sign");
const StudentSignMessage = () => import("../views/student/SignMessage");
const StudentJob = () => import("../views/student/Job");
const StudentJobMessage =  () => import("../views/student/JobMessage");
const StudentUser =  () => import("../views/student/JobList");


const TeacherHome = () => import("../views/teacher/Home");
const TeacherJob = () => import("../views/teacher/Job");
const TeacherUser= () => import("../views/teacher/User");
const TeacherSign = () => import("../views/teacher/Sign");
const TeacherClass = () => import("../views/teacher/Class");

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
                path: "jobList",
                component: StudentUser
            }
        ]
    },
    {
        path: "/teacher/home",
        component: TeacherHome,
        meta: {
            title: "老师端"
        },
        children: [
            {
                path: '',
                redirect: "user"
            },
            {
                path: 'user',
                component: TeacherUser
            },
            {
                path: 'class',
                component: TeacherClass
            },
            {
                path: 'job',
                component: TeacherJob
            },
            {
                path: 'sign',
                component: TeacherSign
            },
        ]
    }
];
export default routes;
