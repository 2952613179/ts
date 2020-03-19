<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input size="medium" placeholder="请输入学生名字" v-model="userName" style="width: 30%;">
                <el-select v-model="userType" slot="prepend" style="width: 80px;" placeholder="请选择用户类型">
                    <el-option label="学生" value="0"></el-option>
                    <el-option label="老师" value="1"></el-option>
                    <el-option label="全部" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;"  size="medium" type="success">添加用户</el-button>
        </div>
        <el-table
                :data="UserData"
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
        name: "User",
        data() {
            return {
                UserData: [],
                userName: "",
                userType: "3",
                paging: {page: 1, limit: 10, count:0}
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