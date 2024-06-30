<template>
  <el-card>
    <h3 >{{ title }}</h3>
    <slot></slot> <!-- 这里是插槽，用于接受父组件传递的内容 -->
  </el-card>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: String, // 定义名为 title 的字符串类型 props
  },
};
</script>

<style scoped>

</style>