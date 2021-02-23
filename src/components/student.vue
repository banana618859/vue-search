<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 22:26:29
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-10-26 11:39:49
-->
<template>
  <div>

  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    mounted(){
      // this.getData()
    },
    methods:{
      getData(){
        console.log('getData:',this.$theAxios);
        this.$theAxios('./api/data0').then(function (response) {
        console.log('response:',response);
        // that.tableData = response.data.data;

         
      })
      .catch(function (error) {
        console.log(error);
      });
      }
    }
  }
</script>