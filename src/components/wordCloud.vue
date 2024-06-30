<template>
  <div id="myEchart"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import axios from "axios";
import config from "@/js/config";

export default {
  mounted(){
    this.initEchart()
    console.log("初始化词云")
  },
  methods:{
    async initData() {
      // 发送 GET 请求获取热搜榜数据
      await axios.get(config.getApiUrl('/api/formulasWord'))
          .then(response => {
            // 请求成功，更新 hotSearchList 数据
            this.dataList = response.data.data;
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('获取数据失败:', error);
          });
    },
    initEchart(){
      const echartDom = document.getElementById('myEchart')
      const myChart = echarts.init(echartDom)
      const option  = {
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          keepAspect: false,
          // maskImage: maskImage,
          left: 'center',
          top: 'center',
          width: '100%',
          height: '90%',
          right: null,
          bottom: null,
          sizeRange: [12, 60],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            // focus: 'self',
            textStyle: {
              textShadowBlur: 3,
              textShadowColor: '#333'
            }
          },
          //data属性中的value值却大，权重就却大，展示字体就却大
          data: [
            {name: 'Farrah',value: 366},
            {name: "汽车",value: 900},
            {name: "视频",value: 606}
          ]
        }]

      }
      option && myChart.setOption(option)

      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
}

</script>
