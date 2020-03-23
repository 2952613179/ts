<template>
    <div>
        <el-form :model="jobForm"  ref="form" label-width="100px">
            <el-form-item label="选择作业"
                          prop="actionJob"
                          :rules="{required: true, message: '请选择一个作业'}"
            >
                <input class="el-input__inner" readonly v-model="actionJobName" @click="isJobOpen = !isJobOpen"/>
                <my-popup :is-open="isJobOpen" @changeOpen="changeOpen" @ascertain="ascertain"
                          :list="jobList"></my-popup>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="jobForm.exp"
                          autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="preview" v-for="(item, index) in jobForm.fileList" :key="index">
                <img style="width: 130px;height: 130px;border: 1px solid #ccc" :src="item.url" :alt="item.name">
            </el-form-item>
            <el-form-item class="preview" label="作业图片" prop="fileList" :rules="{required: true, message: '作业图片不能为空'}">
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
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                workList: [],
                isJobOpen: false,
                actionJobName: "",
                jobForm: {
                    fileList: [],
                    exp: "",
                    actionJob: "",
                }
            }
        },
        methods: {
            async showJobList() {
                /**
                 * @type {Array}
                 */
                const result = await this.$request({
                    url: 'work/userClassWork',
                    method: "GET"
                })
                console.log(result);
                this.jobList[0].values.length = 0;
                result.filter(temp => this.jobList[0].values.push(temp.workName));
                this.workList = result;
            },
            changeOpen(val) {
                this.isJobOpen = val;
            },
            ascertain(val) {
                console.log(val);
                this.actionJobName = val
                this.jobForm.actionJob = this.workList.filter(temp => temp.workName === val)[0].workId;
            },
            updateFile() {
                let blob = this.$refs.file.files[0].slice()
                this.jobForm.fileList.push({url: URL.createObjectURL(blob), value: blob, name: this.$refs.file.files[0].name});
                this.$refs.file.value = "";
            },
            submit() {
                this.$refs.form.validate(async validate => {
                    if (!validate) return;

                    const formData = new FormData();
                    for (let i = 0; i < this.jobForm.fileList.length; i++) {
                        formData.append("file", this.jobForm.fileList[i].value, this.jobForm.fileList[i].name);
                    }
                    formData.append("subExp", this.jobForm.exp);
                    formData.append("workId", this.jobForm.actionJob);

                    const result = await this.$request({
                        url: "work/submitWork",
                        data: formData,
                        method: "POST"
                    })
                    console.log(result);
                    this.$mint.Toast({
                        message: result.str,
                        iconClass: result.num === 200 ? "el-icon-check" : "el-icon-close"
                    });

                })
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