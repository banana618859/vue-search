<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-02-01 20:09:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-02-01 20:20:12
-->
<template>
  <div>
    <van-tree-select
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-nav="clickNav">
      <template slot="content">
        <van-image 
          v-if="active === 0" 
          src="https://img.yzcdn.cn/vant/apple-1.jpg" 
          rel="external nofollow"  />
        <van-image 
          v-if="active === 1" 
          src="https://img.yzcdn.cn/vant/apple-2.jpg" 
          rel="external nofollow"  />
      </template>
    </van-tree-select>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        active: 0,
        items: [
          { text: '分组 1' }, 
          { text: '分组 2' }
        ],
        activeId: 1,
        activeIndex: 0
      }
    },
    methods:{
      clickNav(index){
        console.log('clickNav:',index);
        this.active = index;
      }
    }
  }
</script>