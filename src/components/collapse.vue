<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-01-12 14:19:48
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-02-23 09:07:13
-->
<template>
  <div>

    <div>
      <div class="block">
        <span class="demonstration">单选可搜索</span>
        <el-cascader
          placeholder="试试搜索：指南"
          :options="options"
          v-model="value"
          @blur="blurFun"
          @focus="focusFun"
          @change="changeFun"
          :filter-method="myFun"
          filterable></el-cascader>
      </div>
      
    </div>
    <div style="height: 150px; border:1px solid red;">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { Lazyload } from 'vant';

  Vue.use(Lazyload);
  
  export default {
    data() {
      return {
        value: ['zhinan2','shejiyuanze2','yizhi2'],
        keyWord: '',
        tempObj:{
            value: 'aa',
            label: '临时'
        },
        options:[],
        baseOptions: [
        {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }]
            }]
          },
          {
            value: 'zhinan2',
            label: '指南2',
            children: [{
              value: 'shejiyuanze2',
              label: '设计原则2',
              children: [{
                value: 'yizhi2',
                label: '一致2'
              }]
            }]
          }
        ],
        activeNames: ['1'],
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
      };
    },
    mounted(){
      this.options=JSON.parse(JSON.stringify(this.baseOptions))
    },
    methods: {
      changeFun(val){
        console.log('val',val);
        if(val){

        }else{
          
        }
      },
      myFun(node,keyWord){
        // 自定义列表数据
        console.log('myFun:',node.pathLabels,keyWord);
        this.keyWord = keyWord;
        let hasOne=false;
        for(let i=0;i<node.pathLabels.length;i++){
          if(node.pathLabels[i].indexOf(keyWord)>-1){
            hasOne=true;
          }
        }
        // 如果包含就返回，就会在下拉列表显示
        if(hasOne){
          return node;
        }
      },
      focusFun(){
        this.keyWord=''
        this.options=JSON.parse(JSON.stringify(this.baseOptions))
      },
      blurFun(){
        console.log('失去焦点',this.value,this.keyWord);
        if(this.keyWord){
          this.tempObj.label = this.keyWord;
          this.options.unshift(this.tempObj);
          this.value=[this.tempObj.value]
        }
      },
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style>
  .van-swipe{
    background-color: #ccc;
  }
  .van-swipe-item img{
    height: 140px;
  }
</style>