<template>
    <el-tooltip class="item" effect="dark" :content="title" placement="top-start" :enterable="false">
        <el-button @click="$emit('click')" :type="type" :icon="icon" size="mini"></el-button>
    </el-tooltip>
</template>

<script>
    export default {
        name: "hintBtn",
        props: {
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: "primary"
            },
            icon: {
              type: String,
              required: true
            }
        }
    }
</script>

<style scoped>
    .el-button {
        max-height: 28px;
        max-width: 44px;
    }
</style>