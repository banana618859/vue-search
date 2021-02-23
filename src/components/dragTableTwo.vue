<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 09:58:41
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-25 09:14:22
 -->
<template>
    <div style="display: flex; padding: 10px;">
      <div style="width: 20%; border:1px solid #ccc;">
        <draggable 
          v-model="myArray" 
          group="people" 
          @start="dragstart" 
          @end="dragend"
          @change="dragchange">
          <div v-for="element in myArray" :key="element.id">
            <span style="margin-right: 15px;">{{element.id}}</span>
            <span>{{element.title}}</span>
          </div>
       </draggable>
      </div>
      <div style="width: 20%; margin-left: 10px; border:1px solid #ccc;">
        {{myArray}}
      </div>

    </div>
</template>

<script>
  import draggable from 'vuedraggable'
    export default {
      name: "AppModule",
      data() {
        return {
          myArray: [
            {
              id:"1",
              title:"标题1",
            },{
              id:"2",
              title:"标题2",
            },{
              id:"3",
              title:"标题3",
            },
          ],
          dragOptions: {
            animation: 120,
            scroll: true,
            group: 'sortlist',
            ghostClass: 'ghost-style'
          },
          done: [
            {
              id: 1,
              content: '推荐'
            },
            {
              id: 2,
              content: '政务'
            }
          ],
        }
      },
      components: {
        draggable
      },
      mounted() {
      },
      methods:{
        dragstart(a,b,c){
          console.log('dragstart:',a,b,c)
        },
        dragend(a,b,c){
          console.log('dragend:',a,b,c)
        },
        dragchange(a,b,c){
          console.log('dragchange:',a,b,c);
          // 拖拽变化后，重新修改id
          for(let i=0;i<this.myArray.length;i++){
            this.myArray[i].id = i+1;
          }
        }
      }
    }
  </script>

<style scoped>
	.sortable-ghost {
      opacity: 0.4;
      background-color: #F4E2C9;
    }
</style>