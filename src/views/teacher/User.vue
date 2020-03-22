<template>
    <div>
        <div style="margin-bottom: 15px" @keydown.enter="showUserList">
            <el-input size="medium" placeholder="请输入用户真实名字" v-model="userName" style="width: 30%;">
                <el-select v-model="userType" slot="prepend" style="width: 80px;" placeholder="请选择用户类型">
                    <el-option label="学生" value="0"></el-option>
                    <el-option label="老师" value="1"></el-option>
                    <el-option label="全部" value="3"></el-option>
                </el-select>
                <el-button @click="showUserList" slot="append" icon="el-icon-search"></el-button>
            </el-input>

            <el-button style="margin-left: 10px;" size="medium" type="success" @click="editUser.isOpen = true">添加用户
            </el-button>
        </div>
        <el-table
                :data="userData"
                border
                style="width: 100%">

            <el-table-column
                    type="index"
                    label="*">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userAccount"
                    label="用户账号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userType"
                    label="用户类型"
                    width="180">
                <template slot-scope="scope">
                    {{ scope.row.userType === 0 ? "学生" : "老师" }}
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <hint-btn icon="el-icon-edit" title="修改" @click="editUserMethod(scope.row.userId)"></hint-btn>
                    <hint-btn icon="el-icon-delete" type="danger" @click="deleteUserMethod(scope.row.userId)"
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


        <el-dialog :title="editUser.userId == '' ? '添加用户' : '修改用户'" :visible.sync="editUser.isOpen">
            <el-form :model="editUser" ref="form" label-width="100px">
                <el-form-item
                        prop="userName"
                        :rules="{required: true, message: '姓名不能为空'}"
                        label="用户姓名">
                    <el-input v-model="editUser.userName"
                              :disabled="editUser.userId == '' ? false : true"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        prop="userAccount"
                        :rules="{required: true, message: '用户账号不能为空'}"
                        label="用户账号">
                    <el-input v-model="editUser.userAccount"
                              :disabled="editUser.userId == '' ? false : true"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        prop="userPwd"
                        :rules="{required: true, message: '用户密码不能为空'}"
                        label="用户密码">
                    <el-input v-model="editUser.userPwd" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        prop="userType"
                        :rules="{required: true, message: '用户类型不能为空'}"
                        label="用户类型">
                    <el-select v-model="editUser.userType"
                               :disabled="editUser.userId == '' ? false : true"
                               placeholder="请选择用户类型">
                        <el-option label="学生" value="0"></el-option>
                        <el-option label="老师" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                        prop="userClass"
                        :rules="{required: true, message: '所属班级不能为空'}"
                        label="所属班级">
                    <el-select v-model="editUser.userClass"
                               filterable
                               :disabled="editUser.userId == '' ? false : true"
                               placeholder="请选择所属班级">
                        <el-option v-for="(item, index) in classList"
                                   :key="index"
                                   :label="item.className"
                                   :value="item.classId"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUser.isOpen = false">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import hintBtn from "../../components/hintBtn";

    export default {
        name: "User",
        data() {
            return {
                userData: [],
                userName: "",
                userType: "3",
                paging: {page: 1, limit: 10, count: 0},
                editUser: {
                    isOpen: false,
                    userName: "",
                    userId: "",
                    userAccount: "",
                    userPwd: "",
                    userType: "",
                    userClass: ""
                },
                classList: []
            }
        },
        components: {
            hintBtn
        },
        methods: {
            handleSizeChange(val) {
                this.paging.limit = val;
                this.showUserList();
            },
            handleCurrentChange(val) {
                console.log(val);
                this.paging.page = val;
                this.showUserList();
            },
            async showUserList() {
                const result = await this.$request({
                    method: "GET",
                    url: 'user/userLike',
                    params: {
                        userType: this.userType,
                        userName: this.userName,
                        page: this.paging.page,
                        limit: this.paging.limit
                    }
                })
                console.log(result);
                this.userData = result.tableData;
                this.paging.count = result.count;
            },
            async editUserMethod(val) {
                const result = await this.$request({
                    url: "user/selectUser",
                    params: {userId: val},
                    method: "GET"
                })
                console.log(result);
                this.editUser.isOpen = true;
                this.editUser.userId = result.userId;
                this.editUser.userName = result.userName;
                this.editUser.userAccount = result.userAccount;
                this.editUser.userPwd = result.userPwd;
                this.editUser.userType = result.userType.toString();
                this.editUser.userClass = result.userClass.toString();
            },
            deleteUserMethod(val) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await this.$request({
                        url: `user/deleteUser/${val}`,
                        method: "DELETE"
                    })
                    if (result.num === 200) {
                        this.$message.success(result.str);
                        this.showUserList()
                    } else {
                        this.$message.error(result.str);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            saveUser() {
                this.$refs.form.validate(async validate => {
                    if (!validate) return;
                    const result = await this.$request({
                        url: "user/addUser",
                        method: "POST",
                        data: this.editUser
                    });
                    console.log(result);
                    if (result.num === 200) {
                        this.$message.success(result.str);
                        this.showUserList();
                        this.editUser.isOpen = false;
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
                console.log(result);
                this.classList = result;
            }
        },
        mounted() {
            this.showUserList();
        },
        watch: {
            "editUser.isOpen"(to) {
                if (!to) {
                    this.editUser.userId = '';
                    this.editUser.userAccount = '';
                    this.editUser.userType = '';
                    this.editUser.userPwd = '';
                    this.editUser.userName = '';
                    this.editUser.userClass = '';
                } else {
                    this.showClassList()
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