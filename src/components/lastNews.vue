<template>
  <div id="lastNews">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in dataList" :key="item">
          <a href="{{item.url}}">
            <h3>{{ item.text }}</h3>
            <img :src="item.picUrl" alt="carousel-item"/>
          </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/js/config";

export default {
  name: "lastNews",
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    this.init()
    console.log("初始化lastNews")
  },
  methods: {
    async init() {
      // 发送 GET 请求获取热搜榜数据
      await axios.get(config.getApiUrl('/api/LatestPharmaceuticalinfo'))
          .then(response => {
            // 请求成功，更新 hotSearchList 数据
            this.dataList = response.data.data;
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('获取数据失败:', error);
          });
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>