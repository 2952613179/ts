<template>
    <div>
        <el-container style="height: 98vh" direction="vertical">
            <el-header>
                <ul class="headerList">
                    <li>
                        <i style="font-size: 60px; color: #6d6d6d"
                           :class="isNavOpen ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                           @click="isNavOpen = !isNavOpen"
                        ></i>
                    </li>
                    <li style="line-height: 20px">
                        <h1 style="margin-left: 20px; color: #3b3b3b">网课签到系统(老师客户端)</h1>
                    </li>
                </ul>
                <div style="float: right">
                    <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                            <h1 class="headPhoto">admin</h1>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item disabled>前端支持:qq(2952613179)</el-dropdown-item>
                            <el-dropdown-item disabled>后台支持:qq(1287990181)</el-dropdown-item>
                            <el-dropdown-item divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container direction="horizontal">
                <el-aside :style="isNavOpen ? 'width:64px' : 'width:200px'">
                    <el-menu :collapse="isNavOpen"
                             :collapse-transition="false"
                             router
                             :default-active="navActionPath"
                    >
                        <el-menu-item
                                @click="action(item.path)"
                                v-for="(item, index) in navList"
                                :key="index"
                                :index="item.path"
                        >
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.label }}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-card class="max_height box-card">
                        <div slot="header" class="clearfix">
                            <span>{{ navAction }}</span>
                            <el-button style="float: right; padding: 3px 0" @click="retreat" type="text">后退</el-button>
                        </div>
                        <router-view/>
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                isNavOpen: false,
                navList: [
                    {label: "用户管理", path: "/teacher/home/user", icon: "el-icon-user"},
                    {label: "班级管理", path: "/teacher/home/class", icon: "el-icon-folder-opened"},
                    {label: "学生签到情况", path: "/teacher/home/sign", icon: "el-icon-edit-outline"},
                    {label: "学生作业情况", path: "/teacher/home/job", icon: "el-icon-document"},
                ],
                navAction: "学生管理",
                navActionPath: "/teacher/home/user"
            }
        },
        methods: {
            action(val) {
                this.navActionPath = val;
                window.sessionStorage.setItem("teacherPath", val);
                this.navAction = this.navList.filter(nav => nav.path == val)[0].label;
            },
            retreat() {
                this.$router.back();
                setTimeout(() => {
                    this.action(this.$route.path);
                }, 100)
            }
        },
        mounted() {
            let path = window.sessionStorage.getItem("teacherPath");
            if (path) {
                this.navActionPath = path;
                this.action(path);
                let routePath = this.$route.path;
                if (routePath !== path) {
                    this.$router.push(path)
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        border-bottom: 1px solid rgba(214, 214, 214, 0.31);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .el-aside {
        border-bottom: 1px solid rgba(172, 172, 172, 0.31);
        border-right: 1px solid rgba(172, 172, 172, 0.31);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        max-width: 200px;
        margin: 0px;
        padding: 0px;
    }

    .max_height {
        height: 100%;
    }

    .headerList {
        list-style: none;
        float: left;
        padding: 0px;
        margin: 0px;
        height: 100%;
    }

    .headerList li {
        float: left;
        padding: 0px;
        margin: 0px;
        height: 100%;
    }

    .headerList li i:hover {
        cursor: pointer;
    }

    .headPhoto {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: #2d2d2d;
        color: aliceblue;
        text-align: center;
        line-height: 50px;
        padding: 0px;
        margin: 5px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>