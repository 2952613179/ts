<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="选择作业">
                <input class="el-input__inner" readonly v-model="actionJob" @click="isJobOpen = !isJobOpen"/>
                <mt-popup
                        v-model="isJobOpen"
                        position="bottom"
                        pop-transition="popup-fade"
                        style="width: 100%"
                >
                    <mt-picker :slots="jobList" @change="onJobChange"></mt-picker>
                    <div>
                        <el-button class="jobBtn" @click="actionJob = tempActionJob,isJobOpen = false">确定</el-button>
                        <el-button class="jobBtn" @click="isJobOpen = false">取消</el-button>
                    </div>
                </mt-popup>
            </el-form-item>
            <el-form-item label="上传作业图片">
                <mt-actionsheet
                        :actions="actions"
                        v-model="sheetVisible">
                </mt-actionsheet>
                <el-button type="primary" @click="sheetVisible = !sheetVisible">primary</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Job",
        data() {
            return {
                jobList: [
                    {
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                actionJob: "",
                tempActionJob: "",
                isJobOpen: false,
                actions: [{name: "拍照", method: this.photo}, {name: "从相册中选择", method: this.selectPhoto}],
                sheetVisible: false
            }
        },
        methods: {
            showJobList() {

            },
            photo() {

            },
            selectPhoto() {

            },
            onJobChange(picker, values) {
                this.tempActionJob = values[0]
            },
        },
        mounted() {
            this.showJobList();
        }
    }
</script>

<style scoped>
    .el-form {
        padding-top: 30px;
    }

    .jobBtn {
        width: 49%;
        margin: 0px;
        padding: 0px;
        border: 0px;
    }
</style>