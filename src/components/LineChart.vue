<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-01-27 15:16:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-01-28 09:36:21
-->
<template>
  <div>
    <div style="float: left; width: 30%; border: 1px solid red;">
      <highcharts style="margin: 10px auto;" :options="chartOptions"></highcharts>
    </div>
    <div style="float: left; width: 30%; border: 1px solid red;">
      <highcharts style="margin: 10px auto;" :options="yuanOptions"></highcharts>
    </div>
    <div style="float: left; width: 40%; border: 1px solid red;">
      <highcharts style="margin: 10px auto;" :options="options"></highcharts>
    </div>
    
  </div>
</template>


<script>
  export default {
    props:{
      title:{
        type: String,
        default: '数据变化趋势',
      },
      chartH:{
        type: Number,
        default: 200,
      },
      needVersion:{
        type: Boolean,
        default: false,
      }
    },
    watch:{
      title(newVal,oldVal){
        if(newVal){
          this.chartOptions.title.text=newVal
          this.yuanOptions.title.text=newVal
          this.options.title.text=newVal
        }else{
          this.chartOptions.title.text='数据变化趋势'
        }
      },
      needVersion(newVal,oldVal){
        this.chartOptions.credits.enabled=newVal
      }
    },
    mounted(){
      // this.removeHightchartsLogo()
    },
    methods:{
      removeHightchartsLogo(){
        var high = document.getElementsByClassName('highcharts-credits')[0];
        console.log(high);
        high.style.display='none';
      }
    },
    data() {
      return {
        options: {
          title: {
            text: '按时间汇总',
            x: -20 // center
          },
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: ['00:00~01:00', '01:00~02:00', '02:00~03:00', '03:00~04:00', '04:00~05:00', '05:00~06:00',
              '06:00~07:00', '07:00~08:00', '08:00~09:00', '09:00~10:00', '10:00~11:00',
              '11:00~12:00', '12:00~13:00', '13:00~14:00', '14:00~15:00', '15:00~16:00',
              '16:00~17:00', '17:00~18:00', '18:00~19:00', '19:00~20:00', '20:00~21:00',
              '21:00~22:00', '22:00~23:00', '23:00~24:00'
            ]
          },
          yAxis: {
            title: {
              text: '过车统计'
            },
            // 标示线
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            valueSuffix: '辆' // 提示信息所带单位
          },
          legend: {
            enabled: false //  禁用图例
          },
          credits: {
            enabled: false // 禁用版权信息
          },
          series: [{
            name: '过车数量', 
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
              7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }]
        },
        yuanOptions:{
          title: {
            text: '过车统计1'
          },
          series: [{
          type: 'pie',
          name: '浏览器访问量占比',
          data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['其他',   0.7]
          ]
        }]
        },
        chartOptions: {
          chartWidth: 100,
          chartHeight: 250,
          title: {
            text: '数据变化趋势'
          },
          series: [{
            data: [1, 2, 3] // sample data
          }],
          credits: {
            enabled: true // 禁用版权信息
          }
        },
        
      }
    }
  }
</script>