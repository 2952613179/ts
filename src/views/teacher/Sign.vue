<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input placeholder="请输入学生名字" v-model="userName" size="medium" style="width: 30%;">
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

            <el-button style="margin-left: 10px;" size="medium" type="success">添加签到日</el-button>
        </div>
        <el-table
                :data="signData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
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
    </div>
</template>

<script>
    export default {
        name: "Sign",
        data() {
            return {
                userName: "",
                signData: [],
                signDate: "",
                paging: {page: 1, limit: 10, count:0}
            }
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin-top: 10px;
    }
</style>