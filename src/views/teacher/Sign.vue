<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input placeholder="请输入班级名称" v-model="className" size="medium" style="width: 30%;">
                <el-date-picker
                        slot="prepend"
                        v-model="signDate"
                        align="right"
                        type="date"
                        placeholder="选择日期(未选择就是所有日期)"
                        :picker-options="pickerOptions">
                </el-date-picker>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;" size="medium" @click="createSignDate.isOpen = true" type="success">添加签到日</el-button>
        </div>
        <el-table
                :data="signList"
                border
                style="width: 100%">
            <el-table-column
                label="*"
                type="index"
            >
            </el-table-column>
            <el-table-column
                    prop="dateName"
                    label="签到日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="signCode"
                    label="签到验证码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="signCount"
                    label="应道人数">
            </el-table-column>
            <el-table-column
                    prop="userClass"
                    label="所属班级">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注">
            </el-table-column>
            <el-table-column
                    label="更多">
                <template slot-scope="scope">
                    <hint-btn title="查看签到详情" icon="el-icon-s-order" @click="showSignMsg(scope.row.dateId)"></hint-btn>
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

        <el-dialog title="添加签到日" :visible.sync="createSignDate.isOpen">
            <el-form ref="form" :model="createSignDate" label-width="100px">
                <el-form-item label="签到时间"
                              prop="signDate"
                              :rules="{required: true, message: '签到时间不能为空'}">
                    <el-date-picker
                            v-model="createSignDate.signDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签到验证码"
                              prop="signCode"
                              :rules="{required: true, message: '签到验证码不能为空'}">
                    <el-input v-model="createSignDate.signCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="应到人数"
                              prop="count"
                              :rules="[{required: true, message: '应到人数不能为空'}, { validator: isNumber, trigger: 'blur' }]">
                    <el-input v-model="createSignDate.count" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        prop="userClass"
                        :rules="{required: true, message: '所属班级不能为空'}"
                        label="所属班级">
                    <el-select v-model="createSignDate.userClass"
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
                    <el-input v-model="createSignDate.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createSignDate.isOpen = false">取 消</el-button>
                <el-button type="primary" @click="saveSign">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="签到详情" :visible.sync="signMsg.isOpen">
            <el-table :data="signMsg.list"
                      :row-class-name="tableRowClassName">
                <el-table-column property="userName" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="是否签到">
                    <template slot-scope="scope">
                        {{ scope.row.flag ? "已签到" : "未签到"}}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import hintBtn from "../../components/hintBtn";
    export default {
        name: "Sign",
        data() {
            return {
                className: "",
                signList: [],
                signDate: "",
                paging: {page: 1, limit: 10, count:0},
                createSignDate: {
                    isOpen: false,
                    signDate: "",
                    signCode: "",
                    userClass: "",
                    count: "",
                    remark: ""
                },
                classList: [],

                signMsg: {
                    isOpen: false,
                    list: []
                },
                isNumber: (rule, value, callback) => {
                    let zz = /^[0-9]*[1-9][0-9]*$/;
                    if (!zz.test(value)) {
                        callback(new Error("输入值必须为正整数"))
                    } else {
                        callback();
                    }
                }
            }
        },
        components: {
            hintBtn
        },
        computed: {
            pickerOptions() {
                return { disabledDate:(time) => {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]}
            }
        },
        methods: {

            tableRowClassName({row, rowIndex}) {
                console.log(row);
                console.log(row.flag ? '' : 'warning-row');
                return row.flag ? '' : 'warning-row';
            },
            saveSign() {
                this.$refs.form.validate(async validate => {
                    if (!validate) return;
                    const result = await this.$request({
                        url: "sign/signCode",
                        method: "POST",
                        data: {
                            dateName: this.$dateFormat(this.createSignDate.signDate),
                            signCode: this.createSignDate.signCode,
                            userClass: this.createSignDate.userClass,
                            signCount: this.createSignDate.count,
                            remark: this.createSignDate.remark
                        }
                    });
                    console.log(result);
                    if (result.num === 200) {
                        this.$message.success(result.str);
                        this.createSignDate.isOpen = false;
                        this.showSignList();
                    } else {
                        this.$message.error(result.str);
                    }
                })
            },
            handleSizeChange(val) {
                this.paging.limit = val;
                this.showSignList();
            },
            handleCurrentChange(val) {
                this.paging.page = val;
                this.showSignList();
            },
            async showSignList() {
                const result = await this.$request({
                    url: "sign/likeSignDate",
                    method: "GET",
                    params: {dateName: this.$dateFormat(this.signDate),userClass: this.className, page: this.paging.page, limit: this.paging.limit}
                })
                console.log(result);

                this.paging.count = result.count;
                this.signList = result.tableData;
            },
            async showClassList() {
                const result = await this.$request({
                    url: "class/classList",
                    methods: "GET"
                });
                this.classList = result;
            },
            async showSignMsg(val) {
                this.signMsg.list.length = 0;
                const result = await this.$request({
                    url: "sign/signListAndUserList",
                    method: "GET",
                    params: {dateId: val}
                })
                const {userList, signList} = result;
                for (let i = 0; i < userList.length; i++) {
                    let user = userList[i];
                    if (signList.filter(temp => temp.userId == user.userId).length !== 0) {
                        user.flag = true;
                    } else {
                        user.flag = false;
                    }
                    this.signMsg.list.push(user)
                }
                // console.log(result);
                this.signMsg.isOpen = true
            }
        },
        mounted() {
            this.showSignList();
        },
        watch: {
            "createSignDate.isOpen"(to) {
                if (to) {
                    this.showClassList();
                }
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin-top: 10px;
    }
</style>