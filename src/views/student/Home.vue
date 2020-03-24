<template>
    <div>
        <mt-header fixed :title="tabbar"></mt-header>
        <mt-tabbar fixed v-model="tabbar">
            <mt-tab-item :id="item.label" v-for="(item, index) in tabList" :key="index">
                <i :class="item.icon"></i>
                <p>{{ item.label }}</p>
            </mt-tab-item>
        </mt-tabbar>
        <div style="margin-top: 40px;padding-bottom: 62px">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
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
                    {label: "作业列表", a: "/student/home/jobList", icon: "el-icon-document"}
                ]
            }
        },
        watch: {
            tabbar(to) {
                if (to === window.sessionStorage.getItem("tab")) return;
                window.sessionStorage.setItem("tab", to);
                this.$router.push(this.tabList.filter(tab => tab.label == to)[0].a);
            }
        },
        created() {
            let val = window.sessionStorage.getItem("tab");
            if (val) {
                this.tabbar = val;
                const action = this.tabList.filter(tab => tab.label == val)[0];
                if (this.$route.path !== action.a) {
                    this.$router.push(action.a);
                }
            }
        }
    }
</script>

<style scoped>
</style>