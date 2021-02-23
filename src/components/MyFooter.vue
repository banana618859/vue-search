<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-28 09:03:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-28 10:08:03
 -->

<template>
     <div>
         {{agek}}
         <div style="border:1px solid red">
            <!-- //这里name的值就是这个插槽的名称。-->
            <slot 
                name='footer' 
                :age='90'  
                :slotname="slotname" 
                :money="money" />            
         </div>
         <p>另一行</p>
     </div>
 </template>
 <script>
     export default{
         props:{
            agek:{ type: Number, default:0 }
         },
         data(){
             return{
                slotname:'son name',
                money: 199
             }
         },
         methods:{
            changeFaDataSync(){
                console.log('changeFaDataSync')
                this.$emit('update:agek',115)
            }
         }
     }
 </script>
 <!-- 原文链接：https://blog.csdn.net/liushijun_/article/details/92186739 -->