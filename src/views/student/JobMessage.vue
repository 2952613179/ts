<template>
    <div>
        <el-table
                :data="jobList"
                style="width: 100%"
                v-infinite-scroll="load"
        >
            <el-table-column
                    label="作业标题"
                    prop="workName">
            </el-table-column>
            <el-table-column
                    label="提交时间"
                    prop="subTime" width="100px">
                <template slot-scope="scope">
                    {{ scope.row.optime | format}}
                </template>
            </el-table-column>
            <el-table-column
                    label="评分"
                    prop="remark"
            >
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editJob(scope.row.subId)" size="mini">修改作业</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="修改作业" ref="form" width="90%" :visible.sync="editJobForm.isOpen">
            <el-form :model="editJobForm" label-width="100px">
                <el-form-item label="作业名称">
                    <el-input v-model="editJobForm.workName" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editJobForm.subExp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="preview" v-for="(item, index) in editJobForm.workAtta" :key="index">
                    <img style="width: 60px;height: 60px;border: 1px solid #ccc" :src="item.url" :alt="item.name">
                    <el-button style="margin-left: 10px" @click="imgDelete(index)" size="mini">删除图片</el-button>
                </el-form-item>
                <el-form-item class="preview" label="作业图片" prop="workAtta" :rules="{required: true, message: '作业图片不能为空'}">
                    <input type="file" @change="updateFile" ref="file" style="display: none" accept="image/*" autocapitalize="characters">
                    <img src="~@/assets/images/timg.png" @click="$refs.file.click()" style="border: 1px dashed #ccc" height="130" width="130"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editJobForm.isOpen = false">取 消</el-button>
                <el-button type="primary" @click="saveJob">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobMessage",
        data() {
            return {
                jobList: [],
                page: 1,
                limit: 30,
                editJobForm: {
                    isOpen: false,
                    workName: "",
                    subId: "",
                    subExp: "",
                    workId: "",
                    workAtta: []
                }
            }
        },
        mounted() {
            this.showList();
        },
        methods: {
            load() {
                this.page ++;
                this.showList();
            },
            async showList() {
                const result = await this.$request({
                    method: "GET",
                    url: "work/userWorkSubList",
                    params: {page: this.page, limit: this.limit}
                });
                this.jobList = result;
            },
            async editJob(val) {
                const result = await this.$request({
                    url: "work/selectWorkSubmit",
                    method: "GET",
                    params: {subId: val}
                })
                this.editJobForm.subId = result.subId;
                this.editJobForm.workName = result.workName;
                this.editJobForm.subExp = result.subExp;
                this.editJobForm.workId = result.workId;
                let list = eval(result.workAtta);
                this.editJobForm.workAtta.length = 0;
                for (let i = 0; i < list.length; i++) {
                    let url = "workImg/" + list[i];
                    const resultImg = await this.$request({
                        url: url,
                        responseType: "blob"
                    });
                    this.editJobForm.workAtta.push({url: URL.createObjectURL(resultImg), value: resultImg, name: list[i]});
                }
                this.editJobForm.isOpen = true;
            },
            async saveJob() {
                const formData = new FormData();
                for (let i = 0; i < this.editJobForm.workAtta.length; i++) {
                    formData.append("file", this.editJobForm.workAtta[i].value, this.editJobForm.workAtta[i].name);
                }
                formData.append("subId", this.editJobForm.subId);
                formData.append("subExp", this.editJobForm.subExp);
                formData.append("workId", this.editJobForm.workId);
                const result = await this.$request({
                    url: "work/submitWork",
                    method: "POST",
                    data: formData
                })
                this.$mint.Toast({
                    message: result.str,
                    iconClass: result.num === 200 ? "el-icon-check" : "el-icon-close"
                });
                this.editJobForm.isOpen = false;
            },
            updateFile() {
                let blob = this.$refs.file.files[0].slice()
                this.editJobForm.workAtta.push({url: URL.createObjectURL(blob), value: blob, name: this.$refs.file.files[0].name});
                this.$refs.file.value = "";
            },
            imgDelete(index) {
                this.editJobForm.workAtta.splice(index, 1);
            }
        }
    }
</script>

<style scoped>

</style>