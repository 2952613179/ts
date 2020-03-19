<template>
    <mt-popup
            v-model="isOpenWindow"
            position="bottom"
            pop-transition="popup-fade"
            style="width: 100%"
    >
        <mt-picker :slots="list" @change="onJobChange"></mt-picker>
        <div>
            <el-button class="btn" @click="ascertain">确定</el-button>
            <el-button class="btn" @click="isOpenWindow = false">取消</el-button>
        </div>
    </mt-popup>
</template>

<script>
    export default {
        name: "myPopup",
        props: {
            isOpen: {
                require: true,
                type: Boolean
            },
            list: {
                require: true,
                type: Array
            }
        },
        data() {
            return {
                tempAction: "",
                isOpenWindow: this.isOpen
            }
        },
        methods: {
            onJobChange(picker, values) {
                this.tempAction = values[0]
            },
            ascertain() {
                this.$emit("ascertain", this.tempAction);
                this.isOpenWindow = false;
            }
        },
        watch: {
            isOpen(to) {
                this.isOpenWindow = to;
            },
            isOpenWindow(to) {
                this.$emit("changeOpen", to);
            }
        }
    }
</script>

<style scoped>

    .btn {
        width: 49%;
        margin: 0px;
        padding: 0px;
        border: 0px;
    }
</style>