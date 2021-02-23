<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-22 16:32:11
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-23 08:40:26
--> 
<template>
    <div>
        <p>testCase-table</p>
        <el-table
        row-key="id"
        :data="tableData"
        height="250"
        size="mini"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="delRow(scope.row)" size="mini">删除</el-button>
            <el-button type="primary" @click="editRow(scope.row)" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p>添加行：</p>
      <div>
        <el-form ref="form" :model="form" size="mini" style="width: 500px;border:1px solid red;" label-width="80px">
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.level">
              <el-radio label="一级函数"></el-radio>
              <el-radio label="二级函数"></el-radio>
              <el-radio label="三级函数"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.function" placeholder="请选择活动区域">
              <el-option
                v-for="(item,index) in allFirstFun" :key="item.displayName+index" 
                :label="item.displayName" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
              form:{
                level: 0,
                function: ''
              },
              allFirstFun:[
              {
                  displayName: '使用设备',
                  name:'use_instrume'
                },
                {
                  displayName: '使用函数',
                  name:'use_function'
                }
              ],
              allSecondFun:[
                {
                  displayName: 'use_instrume',
                  name:'use_instrume'
                }
              ],
              tableData: [
                  {
                  id: 1,
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }, {
                  id: 2,
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                }, {
                  id: 3,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [{
                      id: 31,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                      id: 32,
                      date: '2016-05-01',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                  }]
                }, {
                  id: 4,
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
                }
              ],
            }
        },
        methods:{
          delRow(row){
            console.log('delRow:',row)
          },
          editRow(row){
            console.log('editRow:',row)
          },
          onSubmit(form){
            console.log('form：',form)
          }
        }
    }
</script>