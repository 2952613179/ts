<template>
    <div>
        <div class="clock" style="margin: 30% auto; min-width: 10px; max-width: 430px">
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
            <em class="divider">:</em>
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
            <em class="divider">:</em>
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
            <div class="flip">
                <div class="digital front" data-number="0"></div>
                <div class="digital back" data-number="1"></div>
            </div>
        </div>
        <div style="position: relative">
            <img src="../../assets/images/qd.png" @click="sgin" alt="点我签到"/>
        </div>
    </div>
</template>

<script>
    import {init} from "../../assets/js/script";

    export default {
        name: "Sign",
        mounted() {
            init();
        },
        methods: {
            sgin() {
                this.$mint.MessageBox.prompt('请输入签到验证码').then(async ({ value: code, action }) => {
                    console.log(code);
                    console.log(action);
                    if (code === null) {
                        console.log(111);
                        this.$mint.Toast({
                            message: '验证码不能为空',
                            iconClass: 'el-icon-error'
                        });
                    } else {
                        const result = await this.$request({
                            url: "/sign",
                            method: "POST",
                            data: {code}
                        })
                        console.log(result);

                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/style.css";

    img {
        position: absolute;
        left: 50%;
        width: 260px;
        height: 260px;
        margin-left: -130px;
    }
</style>