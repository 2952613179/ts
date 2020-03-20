<template>
    <div class="login">
        <el-form ref="form" :model="user" label-width="80px" class="from">
            <h1 class="title">用户登录</h1>
            <el-form-item
                    label="账号"
                    prop="userAccount"
                    :rules="{required: true, message: '用户名不能为空'}"
            >
                <div >

                    <el-input v-focus  v-model="user.userAccount" clearable/>
                </div>
            </el-form-item>
            <el-form-item
                    label="密码"
                    prop="userPwd"
                    :rules="{required: true, message: '密码不能为空'}"
            >
                <div @keydown.enter="submit">
                    <el-input  v-model="user.userPwd" type="password" clearable show-password/>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" @click="submit" :loading="user.flag">登录</el-button>
            </el-form-item>
            <el-form-item label="联系我们">
                <img src="~@/assets/images/login/qq.jpg" class="img"/>
                <img src="~@/assets/images/login/wx.png" class="img"/>
            </el-form-item>
            <el-form-item label="没有账号?">
                <router-link to="/register" style="color: #ff5962">点我前往注册</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    userAccount: "admin",
                    userPwd: "123456",
                    flag: false
                }
            }
        },
        methods: {
            submit() {
                this.$refs.form.validate(async validate => {
                    if (!validate || this.user.flag) return;
                    this.user.flag = true;
                    try {
                        const result = await this.$request({
                            url: "/login",
                            method: "POST",
                            data: this.user,
                        });
                        if (result.num === 200) {
                            this.$message.success("登录成功");
                            this.$router.push("/student/home/sign");
                        } else {
                            this.user.userAccount = "";
                            this.user.userPwd = "";
                            this.$message.error("账号或者密码错误");
                        }
                    } catch (e) {

                    }
                    this.user.flag = false;
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        background: url("~@/assets/images/login/background.jpg") no-repeat;
        background-size: 100%;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0px;
        top: 0px;
    }

    .from {
        width: 400px;
        height: 500px;
        top: 50%;
        left: 50%;
        position: absolute;
        margin-top: -250px;
        margin-left: -200px;
        border: 1px solid #cdcdcd;
        background: rgba(205, 205, 205, .6);
        border-radius: 5px;
        padding-right: 50px;
    }

    .title {
        font-size: 20px;
        color: #2d2d2d;
        text-align: center;
        padding-left: 50px;
        margin-bottom: 20px;
    }

    .btn {
        width: 100%;
    }

    .img {
        width: 150px;
        height: 150px;
        margin: 5px 5px;
    }
</style>