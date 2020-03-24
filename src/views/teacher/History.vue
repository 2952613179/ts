<template>
    <div>
        <div>
            <el-switch
                    style="display: block"
                    v-model="signIsJob"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="查签到"
                    inactive-text="查作业">
            </el-switch>
            <el-date-picker
                    v-model="date"
                    type="month"
                    placeholder="选择月">
            </el-date-picker>

            <el-select v-model="actionClass" placeholder="请选择">
                <el-option
                        v-for="item in classList"
                        :key="item.classId"
                        :label="item.className"
                        :value="item.className">
                </el-option>
            </el-select>

            <el-button icon="el-icon-search" @click="showTableData" circle></el-button>
        </div>
        <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        type="index"
                        label="*"
                ></el-table-column>
                <el-table-column
                        prop="user_name"
                        label="学生姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="所属班级"
                        width="180">
                    {{ actionClass }}
                </el-table-column>
                <el-table-column
                        label="累计次数">
                    <template slot-scope="scope">
                        {{ scope.row.cut ? scope.row.cut : 0 }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignHistory",
        data() {
            return {
                date: new Date(),
                classList: [],
                tableData: [],
                actionClass: "",
                signIsJob: true,
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                return row.cut ? '' : 'warning-row';
            },
            async showClassList() {
                const result = await this.$request({
                    url: "class/classList"
                })
                console.log(result);
                this.classList = result;
            },
            async showTableData() {
                if (this.date === null || this.actionClass === "") {
                    this.$message.error("所需信息缺失")
                }
                const result = await this.$request({
                    url: "sign/statSign",
                    params: {
                        month: this.$dateFormat(this.date, "yyyy-MM"),
                        className: this.actionClass,
                        type: this.signIsJob ? "1" : "2"
                    }
                })
                console.log(result);
                this.tableData = result.object.filter(temp => temp.user_type ===  0);
            }
        },
        watch: {
            date(to) {
                if (to === null) return;
                this.showTableData();
            },
            actionClass(to) {
                if (to === '') return;
                this.showTableData();
            }
        },
        mounted() {
            this.showClassList();
        }
    }
</script>

<style scoped>

</style>