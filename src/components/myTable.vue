<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-15 19:38:57
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-16 19:14:17
--> 
<template>
  <div>
    <el-input @change="valueChange" @keydown.enter.native="keydownFun" @keyup.enter.native="keyupFun" v-model="valueMe"></el-input>
    <vxe-table
          border
          resizable
          :empty-render="{name: 'NotData'}"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="80" :content-render="{name: 'MyExpand'}"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
  </div>
</template>
<script>
  export default {
          data () {
            return {
              valueMe: '',
              tableData: []
            }
          },
          mounted(){
            // this.renderFun()
          },
          created () {
            // this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.tableData =[]
            let arr = []
            for(let i=0;i<5;i++){
              let one = {
                name: 'tom'+i,
                sex: '男',
                age: 20+i
              }
              arr.push(one)
            }
            this.tableData = arr;
          },
          methods:{
            valueChange(){
              event.preventDefault()
              event.stopPropagation()
              
              console.log('valueChange123465:',event,event.keyCode)
            },
            keydownFun(){
              console.log('keydownFun8:')
              return false;
              // event.preventDefault()
              // event.stopPropagation()
              console.log('keydownFun89:',event)
            },
            keyupFun(){
              console.log('keydownFun9:')
              return false;
              // event.preventDefault()
              // event.stopPropagation()
              console.log('keyupFun45678:',event)
            },
            renderFun(){
                // 创建一个简单的展开内容渲染
                VXETable.renderer.add('MyExpand', {
                  renderExpand (h, renderOpts, params) {
                    const { row } = params
                    return 
                      `<ul>
                        <li>
                          <span>Name：</span>
                          <span>${ row.name}</span>
                        </li>
                        <li>
                          <span>UpdateTime：</span>
                          <span>${ row.sex }</span>
                        </li>
                        <li>
                          <span>CreateTime：</span>
                          <span>${ row.age }</span>
                        </li>
                      </ul>`
                    
                  }
                })
            }
          },
          
        }
</script>
