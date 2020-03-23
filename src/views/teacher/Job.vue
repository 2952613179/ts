<template>
    <div>
        <div style="margin-bottom: 15px" @keydown.enter="showJobList">
            <el-input size="medium" placeholder="请输入作业题目" v-model="userClass" style="width: 30%;">
                <el-date-picker
                        slot="prepend"
                        v-model="jobDate"
                        align="right"
                        type="date"
                        placeholder="选择日期(未选择就是所有日期)"
                        :picker-options="pickerOptions">
                </el-date-picker>
                <el-button slot="append" icon="el-icon-search" @click="showJobList"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;" size="medium" type="success" @click="createJob.isOpen = true">发布作业
            </el-button>
        </div>
        <el-table
                :data="jobList"
                border
                style="width: 100%">
            <el-table-column
                    label="*"
                    type="index">
            </el-table-column>
            <el-table-column
                    prop="workName"
                    label="作业标题">
            </el-table-column>
            <el-table-column
                    prop="workExp"
                    label="作业描述">
            </el-table-column>
            <el-table-column
                    prop="workOper"
                    label="作业发布人">
            </el-table-column>
            <el-table-column
                    prop="userClass"
                    label="所属班级">
            </el-table-column>
            <el-table-column
                    prop="workStart"
                    label="作业开始时间" width="170">
                <template slot-scope="scope">
                    {{ scope.row.workStart | format }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="workEnd"
                    label="作业结束时间" width="170">
                <template slot-scope="scope">
                    {{ scope.row.workEnd | format }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注">
            </el-table-column>
            <el-table-column
                    label="更多" width="200">
                <template slot-scope="scope">
                    <hint-btn icon="el-icon-edit" type="warning" title="修改" @click="editJob(scope.row.workId)"></hint-btn>
                    <hint-btn title="查看附件" icon="el-icon-s-order" @click="showJobImg(scope.row.workId)"></hint-btn>
                    <hint-btn title="查看作业提交详情" icon="el-icon-s-claim" @click="showJobMsg(scope.row.workId)"></hint-btn>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paging.page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="paging.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paging.count">
        </el-pagination>


        <el-dialog :title="createJob.workId ? '修改作业' : '添加作业'" :visible.sync="createJob.isOpen">
            <el-form ref="form" :model="createJob" label-width="100px">
                <el-form-item label="作业名称"
                              prop="jobName"
                              :rules="{required: true, message: '作业名称不能为空'}">
                    <el-input v-model="createJob.jobName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作业描述"
                              prop="describe">
                    <el-input v-model="createJob.describe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作业发布人"
                              prop="issuer"
                              :rules="{required: true, message: '作业发布人不能为空'}">
                    <el-input v-model="createJob.issuer" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提交时效"
                              prop="date"
                              :rules="{required: true, message: '作业提交时间不能为空'}">
                    <el-date-picker
                            v-model="createJob.date"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>

                <el-form-item
                        prop="userClass"
                        :rules="{required: true, message: '所属班级不能为空'}"
                        label="所属班级">
                    <el-select v-model="createJob.userClass"
                               filterable
                               placeholder="请选择所属班级">
                        <el-option v-for="(item, index) in classList"
                                   :key="index"
                                   :label="item.className"
                                   :value="item.className"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注"
                              prop="remark">
                    <el-input v-model="createJob.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="preview" v-for="(item, index) in createJob.fileList" :key="index">
                    <img style="width: 130px;height: 130px;border: 1px solid #ccc" :src="item.url" alt="">
                    <el-button @click="deleteImg(index)">删除图片</el-button>
                </el-form-item>
                <el-form-item label="作业附件">
                    <input type="file" @change="updateFile" ref="file" style="display: none" accept="image/*">
                    <img src="../../assets/images/timg.png" @click="$refs.file.click()" style="border: 1px dashed #ccc"
                         height="130" width="130"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createJob.isOpen = false">取 消</el-button>
                <el-button type="primary" @click="saveJob">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog
                title="附件展示(点击即可预览)"
                :visible.sync="jobImg.isOpen">
            <el-image
                    v-for="(temp, index) in jobImg.list"
                    :key="index"
                    style="width: 100px; height: 100px"
                    :src="temp"
                    :preview-src-list="jobImg.list">
            </el-image>
        </el-dialog>

        <el-dialog title="作业上传详情" :visible.sync="jobMsgTable.isOpen">
            <el-table :data="jobMsgTable.list"
                      :row-class-name="tableRowClassName">
                <el-table-column property="userName" label="姓名"></el-table-column>
                <el-table-column property="subExp" label="描述" ></el-table-column>
                <el-table-column property="address" label="是否提交">
                    <template slot-scope="scope">
                        {{ scope.row.flag ? "已提交" : "未提交"}}
                    </template>
                </el-table-column>
                <el-table-column property="address" label="提交时间">
                    <template slot-scope="scope">
                        <span v-if="scope.row.flag">
                            {{  scope.row.subTime | format }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column property="address" label="评分" width="200">
                    <template slot-scope="scope">
                        <el-radio-group v-if="scope.row.flag" @change="updateRemark(scope.row)" v-model="scope.row.remark">
                            <el-radio-button label="A" v-if="!(scope.row.remark && scope.row.remark !== 'A')"></el-radio-button>
                            <el-radio-button label="B" v-if="!(scope.row.remark && scope.row.remark !== 'B')"></el-radio-button>
                            <el-radio-button label="C" v-if="!(scope.row.remark && scope.row.remark !== 'C')"></el-radio-button>
                        </el-radio-group>
                    </template>
                </el-table-column>

                <el-table-column property="address" label="更多">
                    <template slot-scope="scope">
                        <hint-btn v-if="scope.row.flag" title="查看附件" icon="el-icon-s-order"
                                  @click="showJobSubImg(scope.row.subId)"></hint-btn>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import hintBtn from "../../components/hintBtn";

    export default {
        name: "Job",
        data() {
            return {
                userClass: "",
                jobDate: "",
                jobList: [],
                paging: {page: 1, limit: 10, count: 0},
                createJob: {
                    isOpen: false,
                    workId: "",
                    fileList: [],
                    remark: "",
                    jobName: "",
                    describe: "",
                    issuer: "",
                    date: [],
                    userClass: ""
                },
                classList: [],
                jobImg:{
                    isOpen: false,
                    list: []
                },
                jobMsgTable: {
                    isOpen: false,
                    list: []
                }
            }
        },
        components: {
            hintBtn
        },
        methods: {
            async editJob(val) {
                const result = await this.$request({
                    url: "work/selectWork",
                    params: {workId: val}
                })

                this.createJob.workId = result.workId;
                this.createJob.remark = result.remark;
                this.createJob.jobName = result.workName;
                this.createJob.describe = result.workExp;
                this.createJob.issuer = result.workOper;
                this.createJob.userClass = result.userClass;
                let start = new Date(result.workStart);
                start.setTime(start.getTime() - 1000*60*60*8)
                let end = new Date( result.workEnd);
                end.setTime(end.getTime() - 1000*60*60*8)
                this.createJob.date = (start + "," + end).split(",")
                this.createJob.fileList.length = 0;
                let list = eval(result.workAtta);
                for (let i = 0; i < list.length; i++) {
                    let url = "workImg/" + list[i];
                    const resultImg = await this.$request({
                        url: url,
                        responseType: "blob"
                    });
                    this.createJob.fileList.push({url: URL.createObjectURL(resultImg), value: resultImg, name: list[i]});
                }
                this.createJob.isOpen = true;
            },
            deleteImg(index) {
                this.createJob.fileList.splice(index, 1);
            },
            async updateRemark(val) {
                console.log(val);
                const result = await this.$request({
                    url: `work/grade/${val.remark}/${val.subId}`,
                    method: "PUT"
                })
                console.log(result);
            },
            handleSizeChange(val) {
                this.paging.limit = val;
                this.showJobList();
            },
            handleCurrentChange(val) {
                this.paging.page = val;
                this.showJobList();
            },
            tableRowClassName({row, rowIndex}) {
                return row.flag ? '' : 'warning-row';
            },
            saveJob() {
                this.$refs.form.validate(async validate => {
                    if (!validate) return;
                    let list = [];
                    this.createJob.fileList.filter(temp => list.push({val: temp.value, name: temp.name}))
                    const formData = new FormData();
                    for (let i = 0; i < list.length; i++) {
                        console.log(list);
                        formData.append(`file`, list[i].val, list[i].name);
                    }
                    formData.append("workName", this.createJob.jobName);
                    formData.append("workId", this.createJob.workId);
                    formData.append("workExp", this.createJob.describe);
                    formData.append("workOper", this.createJob.issuer);
                    formData.append("workStart", new Date(this.createJob.date[0]).valueOf());
                    formData.append("workEnd", new Date(this.createJob.date[1]).valueOf());
                    formData.append("userClass", this.createJob.userClass);
                    formData.append("remark", this.createJob.remark);
                    const result = await this.$request({
                        method: "POST",
                        url: "work/addWork",
                        data: formData
                    })
                    console.log(result);
                    if (result.num === 200) {
                        this.$message.success(result.str);
                        this.createJob.isOpen = false;
                        this.showJobList()
                    } else {
                        this.$message.error(result.str);
                    }
                })
            },
            async showClassList() {
                const result = await this.$request({
                    url: "class/classList",
                    methods: "GET"
                });
                this.classList = result;
            },
            updateFile() {
                const blob = this.$refs.file.files[0].slice();
                this.createJob.fileList.push({
                    url: URL.createObjectURL(blob),
                    value: blob,
                    name: this.$refs.file.files[0].name
                });
                this.$refs.file.value = "";
            },
            async showJobList() {
                const result = await this.$request({
                    method: "GET",
                    url: "work/workList",
                    params: {
                        workStart: this.$dateFormat(this.jobDate),
                        userClass: this.userClass,
                        page: this.paging.page,
                        limit: this.paging.limit
                    }
                })
                console.log(result);
                this.paging.count = result.count;
                this.jobList = result.tableData;
            },
            async showJobImg(val) {
                this.jobImg.list.length = 0;
                let list = eval(this.jobList.filter(temp => temp.workId == val)[0].workAtta);
                for (let i = 0; i < list.length; i++) {
                    let url = "workImg/" + list[i];
                    const resultImg = await this.$request({
                        url: url,
                        responseType: "blob"
                    });
                    this.jobImg.list.push(URL.createObjectURL(resultImg));
                }

                this.jobImg.isOpen = true;
            },
            async showJobSubImg(val) {
                this.jobImg.list = [];
                let list = eval(this.jobMsgTable.list.filter(temp => temp.subId === val)[0].workAtta);

                for (let i = 0; i < list.length; i++) {
                    let url = "workImg/" + list[i];
                    const resultImg = await this.$request({
                        url: url,
                        responseType: "blob"
                    });
                    this.jobImg.list[i] = URL.createObjectURL(resultImg);
                }
                this.jobImg.isOpen = true;
            },
            async showJobMsg(val) {
                this.jobMsgTable.list.length = 0;
                const result = await this.$request({
                    url: "work/workUser",
                    method: "GET",
                    params: {workId: val}
                });
                console.log(result);
                for (let i = 0; i < result.user.length; i++) {
                    let user = result.user[i];
                    let workSubmit = result.workSubmit.filter(temp => temp.userId === user.userId);
                    if (workSubmit.length > 0) {
                        let ws = workSubmit[0];
                        user.flag = true
                        user.workAtta = ws.workAtta;
                        user.subId = ws.subId;
                        user.remark = ws.remark;
                        user.subExp = ws.subExp;
                        user.subTime = ws.subTime;
                    } else {
                        user.flag = false
                    }
                    this.jobMsgTable.list.push(user);
                }
                this.jobMsgTable.isOpen = true;
            }
        },
        watch: {
            "createJob.isOpen"(to) {
                if (!to) {
                    this.createJob.fileList.length = 0;
                    this.createJob.remark = "";
                    this.createJob.jobName = "";
                    this.createJob.describe = "";
                    this.createJob.issuer = "";
                    this.createJob.date = "";
                    this.createJob.userClass = "";
                    this.createJob.workId = "";
                } else {
                    this.showClassList();
                }
            }
        },
        computed: {
            pickerOptions() {
                return {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        mounted() {
            this.showJobList();
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin-top: 10px;
    }
</style>