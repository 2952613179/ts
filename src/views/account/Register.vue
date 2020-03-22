<template>
    <div class="login">
        <el-form ref="form" :model="user" label-width="80px" class="from">
            <h1 class="title">用户注册</h1>
            <el-form-item
                    label="姓名"
                    prop="userName"
                    :rules="{required: true, message: '用户名不能为空'}"
            >
                <el-input v-focus v-model="user.userName" clearable/>
            </el-form-item>
            <el-form-item
                    label="账号"
                    prop="userAccount"
                    :rules="{required: true, message: '用户名不能为空'}"
            >
                <el-input v-model="user.userAccount" clearable/>
            </el-form-item>
            <el-form-item
                    label="密码"
                    prop="userPwd"
                    :rules="{required: true, message: '密码不能为空'}"
            >
                <el-input v-model="user.userPwd" type="password" clearable show-password/>
            </el-form-item>
            <el-form-item
                    label="确认密码"
                    prop="userConfirmPassword"
                    :rules=" { validator: confirm, trigger: 'blur' }"
            >
                <el-input v-model="user.userConfirmPassword" type="password" clearable show-password/>
            </el-form-item>
            <el-form-item
                    label="邀请码"
                    prop="userClass"
                    :rules="{required: true, message: '邀请码不能为空'}"
            >
                <div @keydown.enter="submit">
                    <el-input v-model="user.userClass" clearable/>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" @click="submit" :loading="user.flag">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                user: {
                    userName: "",
                    userAccount: "",
                    userPwd: "",
                    userConfirmPassword: "",
                    userClass: "",
                    flag: false
                }
            }
        },
        methods: {
            submit() {
                this.$refs.form.validate(async validate => {
                    console.log(validate);
                    if (!validate) return;
                    const result = await this.$request({
                        method: "POST",
                        url: "user/register",
                        data: this.user
                    })


                    if (result.num === 200) {
                        this.$message.success("注册成功");
                        this.$router.push("/login");
                    } else {
                        this.$message.error(result.str);
                    }
                })
            },
            confirm(rule, value, callback) {
                if (value === "") {
                    callback(new Error('密码不能为空'))
                } else if (value !== this.user.userPwd) {
                    callback(new Error('密码不一致'))
                } else {
                    callback();
                }
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
        height: 450px;
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

</style>