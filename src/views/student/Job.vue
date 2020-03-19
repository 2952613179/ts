<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="选择作业">
                <input class="el-input__inner" readonly v-model="actionJob" @click="isJobOpen = !isJobOpen"/>
                <my-popup :is-open="isJobOpen" @changeOpen="changeOpen" @ascertain="ascertain"
                          :list="jobList"></my-popup>
            </el-form-item>
            <el-form-item class="preview" v-for="(item, index) in fileList" :key="index">
                <img style="width: 130px;height: 130px;border: 1px solid #ccc" :src="item" alt="">
            </el-form-item>
            <el-form-item class="preview" label="上传作业图片">
                <input type="file" @change="updateFile" ref="file" style="display: none" accept="image/*" autocapitalize="characters">
                <img src="../../assets/images/timg.png" @click="$refs.file.click()" style="border: 1px dashed #ccc" height="130" width="130"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" class="btn" @click="submit">点击上传</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import myPopup from "../../components/myPopup";

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
                isJobOpen: false,
                fileList: []
            }
        },
        methods: {
            showJobList() {

            },
            changeOpen(val) {
                this.isJobOpen = val;
            },
            ascertain(val) {
                this.actionJob = val;
            },
            updateFile() {
                this.fileList.push(URL.createObjectURL(this.$refs.file.files[0].slice()));
                this.$refs.file.value = "";
            },
            submit() {

            }
        },
        mounted() {
            this.showJobList();
        },
        components: {
            myPopup
        }
    }
</script>

<style scoped>
    .el-form {
        padding-top: 30px;
    }
    .preview {
        text-align: center;
    }

</style>