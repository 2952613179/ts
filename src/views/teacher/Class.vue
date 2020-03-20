<template>
    <div>
        <div style="margin-bottom: 15px" @keydown.enter="showClassList">
            <el-input size="medium" placeholder="班级名称" v-model="className" style="width: 30%;">
                <el-button slot="append" icon="el-icon-search" @click="showClassList"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;" size="medium" type="success" @click="editClass.isOpen = true">添加班级</el-button>
        </div>
        <el-table
                :data="classData"
                border
                style="width: 100%">
            <el-table-column
                    prop="className"
                    label="班级名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="classCode"
                    label="邀请码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="classer"
                    label="负责人">
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <hint-btn icon="el-icon-edit" title="修改" @click="editClassMethod(scope.row.classId)"></hint-btn>
                    <hint-btn icon="el-icon-delete" type="danger" @click="deleteClassMethod(scope.row.classId)"
                              title="删除"></hint-btn>
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


        <el-dialog title="收货地址" :visible.sync="editClass.isOpen">
            <el-form :model="editClass" ref="form" label-width="100px">
                <el-form-item
                        label="班级名称"
                        prop="className"
                        :rules="{required: true, message: '班级名称不能为空'}"
                >
                    <el-input v-model="editClass.className" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="班主任"
                        prop="classer"
                        :rules="{required: true, message: '班主任不能为空'}"
                >
                    <el-input v-model="editClass.classer" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="班级邀请码"
                        prop="code"
                        :rules="{required: true, message: '邀请码不能为空'}"
                >
                    <el-input v-model="editClass.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="班级总人数"
                        prop="classCount"
                        :rules="{required: true, message: '人数不能为空'}"
                >
                    <el-input v-model="editClass.classCount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editClass.isOpen = false">取 消</el-button>
                <el-button type="primary" @click="saveClass">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import hintBtn from "../../components/hintBtn";

    export default {
        name: "Class",
        data() {
            return {
                className: "",
                classData: [],
                paging: {page: 1, limit: 10, count: 0},
                editClass: {
                    isOpen: false,
                    classId: '',
                    className: '',
                    classCount: '',
                    classer: '',
                    code: ''
                }
            }
        },
        components: {
            hintBtn
        },
        methods: {
            handleSizeChange(val) {
                this.paging.limit = val;
                this.showClassList();
            },
            handleCurrentChange(val) {
                this.page.limit = val;
                this.showClassList();
            },
            async showClassList() {
                /*const result = await this.$request({
                    url: "/likeClass",
                    methods: "GET",
                    params: {className: this.className, page: this.paging.page, limit: this.paging.limit}
                });
                this.classData = result.tableData;
                this.paging.count = result.count;*/
            },
            editClassMethod() {

            },
            deleteClassMethod() {

            },
            saveClass() {
                this.$refs.form.validate(validate => {
                    if (!validate) return;
                    this.editClass.isOpen = false;
                })

            }
        },
        mounted() {
            this.showClassList();
        },
        watch: {
            "editClass.isOpen"(to) {
                if (!to) {
                    this.editClass.classId = '';
                    this.editClass.className = '';
                    this.editClass.classCount = '';
                    this.editClass.classer = '';
                    this.editClass.code = '';
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