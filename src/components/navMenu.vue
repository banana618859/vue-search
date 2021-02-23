<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-23 08:50:12
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-28 09:10:54
--> 
<template>
    <div>
        
        <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>

        <el-cascader
          v-model="value"
          :options="options"
          :show-all-levels="true"
          @change="handleChange"></el-cascader>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1',
          value: [],
          options: [{
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                  label: '一致'
                }, {
                  value: 'fankui',
                  label: '反馈'
                }, {
                  value: 'xiaolv',
                  label: '效率'
                }]
              }
            ]}
          ]
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleChange(value) {
          console.log(value);
          // setTimeout(()=>{
          //   this.value = '指南';
          // },1000)
        }
      }
    }
  </script>

  <style scoped>
      li{
          display: block;
      }
  </style>