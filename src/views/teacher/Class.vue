<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input size="medium" placeholder="请输入学生名字" v-model="className" style="width: 30%;">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;" size="medium" type="success">添加班级</el-button>
        </div>
        <el-table
                :data="classData"
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
        name: "Class",
        data() {
            return {
                className: "",
                classData: [],
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