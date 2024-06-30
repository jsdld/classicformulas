<template>
  <el-container>
    <!-- 页眉 -->
    <el-header>
      <h1 style="color: white; margin-left: 20px;">AI制药信息平台</h1>
    </el-header>
    <!-- 主体内容 -->
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>新闻</h2>
        </el-col>
      </el-row>
      <!-- 热点名方词云 -->
      <el-row>
        <el-col :span="24">
          <el-card>
            <h3>热点名方词云</h3>
            <!-- 热点名方词云内容 -->
            <wordCloud></wordCloud>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <!-- 最新制药信息展示 -->
        <el-col :span="12">
          <el-card>
            <h3>最新制药信息</h3>
            <!-- 最新制药新闻 -->
            <lastNews></lastNews>
          </el-card>
        </el-col>
        <!-- 经典名方展示 -->
        <el-col :span="12">
          <el-card>
            <h3>经典名方</h3>
            <!-- 经典名方新闻 -->
            <div>
              <ul>
                <li v-for="(item, index) in dataList" :key="index">
                  <p>{{ index }}</p>
                  <a :href="item.url" target="_blank">{{ item.text }}</a>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <el-card>-->
<!--            <h3>ai制药</h3>-->
<!--            &lt;!&ndash; ai制药新闻 &ndash;&gt;-->
<!--            <div>-->
<!--              <ul>-->
<!--                <li v-for="(item, index) in dataList1" :key="index">-->
<!--                  <p>{{ index }}</p>-->
<!--                  <a :href="item.url" target="_blank">{{ item.text }}</a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
      </el-row>

      <!-- 可视化数据界面 -->
      <el-row>
        <el-col :span="24">
          <el-card>
            <h3>可视化数据界面</h3>
            <!-- 可视化数据内容 -->
            <!-- 这里放置可视化数据界面的展示 -->
            <!-- 可以使用 ECharts 或 ElementUI 的图表组件来展示数据 -->
          </el-card>
        </el-col>
      </el-row>
      <!-- 热搜榜 -->
      <el-row>
        <el-col :span="24">
          <el-card>
            <h3>热搜榜 - 中医药</h3>
            <!-- 热搜榜内容 -->
            <el-table :data="hotSearchList" border style="width: 100%">
              <el-table-column type="index" label="排名" width="80"></el-table-column>
              <el-table-column prop="name" label="关键词"></el-table-column>
              <el-table-column prop="heat" label="热度"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <!-- 页脚 -->
    <el-footer>© 2024 - 保留所有权利</el-footer>
  </el-container>
</template>

<script>
// import InfoCard from './components/InfoCard.vue';// 引入自定义的 InfoCard 组件
import axios from "axios";
import config from "@/js/config";
import wordCloud from "@/components/wordCloud";
import lastNews from "@/components/lastNews";

export default {
  components: {
    wordCloud,
    lastNews
    // InfoCard,
  },
  data() {
    return {
      hotSearchList: [],
      dataList: [],
      dataList1: []
    };
  },
  mounted() {
    // 在组件挂载完成后发送请求获取热搜榜数据
    this.fetchHotSearchData();
    this.fetchData();
  },
  methods: {
    async fetchHotSearchData() {
      // 发送 GET 请求获取热搜榜数据
      await axios.get(config.getApiUrl('/api/hotSearch'))
          .then(response => {
            // 请求成功，更新 hotSearchList 数据
            this.hotSearchList = response.data.data;
            console.log(this.hotSearchList)
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('获取热搜榜数据失败:', error);
          });
    },
    async fetchData() {
      await axios.get(config.getApiUrl('/api/newsList'))
          .then(response => {
            this.dataList = response.data.data;
            console.log(response.data)
          }).catch(error => {
            // 请求失败，处理错误
            console.error('获取热点新闻数据失败:', error);
          });
    }
  }
};
</script>

<style>
</style>
