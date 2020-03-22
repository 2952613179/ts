<template>
    <div style="padding-top: 15%; position:relative; z-index: 0">
        <div style="text-align: center; margin: 0px auto">
            <div class="clock" style="margin: 0px auto;width: 90%">
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
                console.log(111)
                this.$mint.MessageBox.prompt('请输入签到验证码').then(async ({ value: code, action }) => {
                    if (code === null) {
                        console.log(111);
                        this.$mint.Toast({
                            message: '验证码不能为空',
                            iconClass: 'el-icon-error'
                        });
                    } else {
                        const result = await this.$request({
                            url: "sign/sign",
                            method: "POST",
                            data: {code}
                        })
                        this.$mint.Toast({
                            message: result.str,
                            iconClass: result.num === 200 ? "el-icon-check" : "el-icon-close"
                        });
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
        margin-top: 50px;
    }
</style>