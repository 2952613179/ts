<template>
    <div>
        <el-table
                :data="signList"
                style="width: 100%"
                v-infinite-scroll="load"
        >
            <el-table-column
                    label="日期"
                    prop="signTime">
            </el-table-column>
            <el-table-column
                    label="签到日期"
                    prop="optime" width="160">
                <template slot-scope="scope">
                    {{ scope.row.optime | format}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SignMessage",
        data() {
            return {
                signList: [],
                page: 1,
                limit: 30
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
                    url: "/signList",
                    params: {page: this.page, limit: this.limit}
                });
                this.signList = result.tableData;
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
</style>