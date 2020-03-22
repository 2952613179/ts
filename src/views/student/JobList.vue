<template>
    <div>
        <el-table
                :data="jobList"
                style="width: 100%"
        >
            <el-table-column
                    label="标题"
                    prop="workName">
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="workExp">
            </el-table-column>
            <el-table-column
                    label="更多"
                    prop="workExp">
                <template slot-scope="scope">
                    <el-button @click="showMsg(scope.row.workId)" size="mini">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详情" :visible.sync="isOpen" width="90%">
            <el-form label-position="left" label-width="100px" class="demo-table-expand">
                <el-form-item label="标题">
                    <span>{{ msg.workName }}</span>
                </el-form-item>
                <el-form-item label="描述">
                    <span>{{ msg.workExp }}</span>
                </el-form-item>
                <el-form-item label="发布人">
                    <span>{{ msg.workOper }}</span>
                </el-form-item>
                <el-form-item label="所属班级">
                    <span>{{ msg.userClass }}</span>
                </el-form-item>
                <el-form-item label="开始时间">
                    <span>{{ msg.workStart | format }}</span>
                </el-form-item>
                <el-form-item label="结束时间">
                    <span>{{ msg.workEnd | format }}</span>
                </el-form-item>
                <el-form-item label="备注">
                    <span> {{ msg.remark }}</span>
                </el-form-item>
                <el-form-item v-for="(temp, index) in msg.fileList" :key="index" :label="index === 0 ? '附件' : ''">
                    <span>
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="temp"
                            :preview-src-list="msg.fileList">
                        </el-image>
                    </span>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobList",
        data() {
            return {
                jobList: [],
                msg: {
                    fileList: []
                },
                isOpen: false
            }
        },
        methods: {
            async showJobList() {
                const result = await this.$request({
                    url: "work/userClassWork"
                })
                console.log(result);
                this.jobList = result;
            },
            async showMsg(val) {
                this.msg = this.jobList.filter(temp => temp.workId === val)[0];
                this.msg.fileList = [];
                let list = eval(this.msg.workAtta);
                for (let i = 0; i < list.length; i++) {
                    const resultImg = await this.$request({
                        url: "workImg/" + list[i],
                        responseType: "blob"
                    })
                    this.msg.fileList.push(URL.createObjectURL(resultImg));
                }
                this.isOpen = true;
            }
        },
        mounted() {
            this.showJobList();
        }
    }
</script>

<style scoped>

</style>