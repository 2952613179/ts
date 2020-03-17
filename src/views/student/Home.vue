<template>
    <div>
        <mt-header fixed :title="tabbar"></mt-header>
        <mt-tabbar fixed v-model="tabbar">
            <mt-tab-item :id="itme.label" v-for="itme in tabList">
                <router-link :to="itme.a">
                    <i :class="itme.icon"></i>
                    <p>{{ itme.label }}</p>
                </router-link>
            </mt-tab-item>
        </mt-tabbar>
        <div><router-view/></div>
    </div>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {
                tabbar: "今日签到",
                tabList: [
                    {label: "今日签到", a: "/student/home/sign", icon: "el-icon-edit-outline"},
                    {label: "签到记录", a: "/student/home/signMessage", icon: "el-icon-document"},
                    {label: "作业提交", a: "/student/home/job", icon: "el-icon-upload"},
                    {label: "作业记录", a: "/student/home/jobMessage", icon: "el-icon-document"},
                    {label: "个人信息", a: "/student/home/user", icon: "el-icon-user-solid"}
                ]
            }
        },
        watch: {
        }
    }
</script>

<style scoped>
    a {
        color: #2d2d2d;
    }
    .router-link-active {
        color: #26a2ff;
    }
</style>