<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-15 19:38:57
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-01-11 18:52:20
--> 
<template>
  <div style="text-align: left; position: relative;">
    <div style="border: 1px solid #ccc; padding:10px; margin: 10px; width: 150px; position: absolute; top: 10px; left: -200px;">
      拖拽区域：
      <draggable v-model="myArray" draggable=".oneRow">
        <div v-for="element in myArray" :key="element.name" class="oneRow">
            {{element.name}}
        </div>
    </draggable>
    </div>
    <p class="titleP">
      <span  style="float: right;">
        运行次数：<el-input v-model="cNum" :disabled="inputOff" style="width: 100px;"></el-input>
        <el-button type="success" size="mini" 
        @click="start">
        开始运行,次数{{nowCount}}
      </el-button>
      <el-button type="danger" size="mini" 
        @click="stop=true">
        停止,当前游标{{currentCount}}
      </el-button>
      总用时{{spendTime}}，平均用时{{averageTime}}
      <el-button type="primary" size="mini" 
        style="margin-right: 15px;" 
        @click="collapseAll">
        全部折叠
      </el-button>
      </span>
      
      li列表

    </p>
    
    <div class="mytable" style="height: 35px;">
      <ul>

        <li>
          <span
            v-for="(item,index) in tableCol" 
            :key="item.name+index"
            :class=item.class>
            {{item.label}}
          </span>
        </li>
      </ul>
    </div>
    <div class="mytable" id="mytable">
      <draggable v-model="tableData" draggable=".oneGroup">
        <div 
          v-for="(oneGroup,index) in tableData" 
          :key="oneGroup.groupName+index"
          class="oneGroup">
          <p class="group" :id="oneGroup.groupName">
            <el-button type="primary" size="mini" 
              @click="collapseFun(oneGroup.groupName)">
              折叠
            </el-button>
            <span style="margin-left: 10px;">
              {{oneGroup.groupName}}
            </span>
          </p>
          <ul>
            <draggable v-model="oneGroup.children" draggable=".liRow">
              <li 
              v-for="(item,index) in oneGroup.children" 
              :key="item.Id+index"
              class="liRow"
              @dblclick="rowDblClick(item)">
              <span class="w80">
                <i v-show="item.Id == currentIndex" class="el-icon-right"></i>
              </span>
              <span class="w80" :class="[{'rowChange': item.modify}]">
                {{item.Id}}
              </span>
              <span class="w200" @click="clickCell(item, 'username')">
                <span v-if="!item.usernameEdit">{{item.username}}</span>
                <el-input v-else v-model="item.username"
                  @blur="inputBlur(item, 'username')"></el-input>
              </span>
              
              <span class="w80" @click="clickCell(item, 'sex')">
                <span v-if="!item.sexEdit">{{item.sex}}</span>
                <el-input v-else v-model="item.sex"
                  @blur="inputBlur(item, 'sex')"></el-input>
              </span>
              <span class="w80" @click="clickCell(item, 'age')">
                <span v-if="!item.ageEdit">{{item.age}}</span>
                <el-input v-else v-model="item.age"
                  @blur="inputBlur(item, 'age')"></el-input>
              </span>
              <span class="w250" >
                {{item.value}}
              </span>
              <span :class="[{'w80 redbg': item.result == 'fail'},
                            {'w80 greenbg': item.result == 'pass'}]">
                {{item.result}}
              </span>
            </li>
            </draggable>
          </ul>
        </div>
      </draggable>
      
    </div>


    <el-dialog
    class="mydialog"
    title="编辑行"
    :visible.sync="showRow"
    :show-close="true"
    :close-on-click-modal="false"
    width="35%">
    <div v-if="currentRow">
      <el-form ref="theRow" class="smallBox" size="mini" 
        :model="currentRow" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="currentRow.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="currentRow.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="currentRow.age"></el-input>
        </el-form-item>
        
      </el-form>
      <p slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          style="float: right;"
          @click="sureChange(currentRow)"
        >确定</el-button>
      </p>
    </div>
    
  </el-dialog>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
          components: {
              draggable
          },
          data () {
            return {
              currentCount: 0,
              inputOff: false,
              cNum: 100,
              averageTime: 0,
              spendTime: 0,
              stop: false,
              nowCount: 0,
              currentIndex: 1,
              valueMe: '',
              oldValue: '',
              myArray: [
              {
                  name: 'tom',
                  age: 10
                },
                {
                  name: 'tom1',
                  age: 11
                },
                {
                  name: 'tom2',
                  age: 12
                },
                {
                  name: 'tom3',
                  age: 13
                }
              ],
              tableCol:[
                {
                  name: 'index',
                  label: '运行',
                  class: ['w80']
                },
                {
                  name: 'Id',
                  label: '序号',
                  class: ['w80']
                },
                {
                  name: 'username',
                  label: '姓名',
                  class: ['w200']
                },
                {
                  name: 'sex',
                  label: '性别',
                  class: ['w80']
                },
                {
                  name: 'age',
                  label: '年龄',
                  class: ['w80']
                },
                {
                  name: 'value',
                  label: '值',
                  class: ['w250']
                },
                {
                  name: 'result',
                  label: '判定',
                  class: ['w80']
                }
              ],
              tableData: [],
              rowH: 35,
              allDataCount: 40,
              scrollH: 0,
              allH: 0,
              mytableId: null,
              showRow: false,
              currentRow: null,
              count:3
            }
          },
          mounted(){
            this.mytableId = document.getElementById('mytable');
            console.log("mytableId:",this.mytableId);


          },
          created () {
            // this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.tableData =[]
            let arr = []
            let groupCount = 1;
            let aindex=0
            for(let s=0;s<groupCount;s++){
              let oneGroup = {
                groupName: 'group'+s,
                children: []
              }

              for(let i=0;i<this.allDataCount;i++){
                this.allH += this.rowH;
                aindex++;
                let one = {
                  Id: aindex,
                  username: 'tom'+i,
                  sex: '男',
                  age: aindex,
                  value: '',
                  result: '',
                  usernameEdit: false,
                  sexEdit: false,
                  ageEdit: false
                }
                
                // if(i==0){
                //   one.index = true;
                // }
                oneGroup.children.push(one)
              }
              this.tableData.push(oneGroup);
            }
            console.log('this.tableData:',this.tableData)
          },
          methods:{
            changeEdit(item,name,status){
              switch(name){
                case 'username':
                  item.usernameEdit = status;
                  break;
                case 'sex':
                  item.sexEdit = status;
                  break;
                case 'age':
                  item.ageEdit = status;
                  break;
              }
            },
            inputBlur(item,name){
              this.changeEdit(item,name,false);
              if(item[name] != this.oldValue){
                console.log('有改动--')
                item.modify = true;
              }
              item.editable = false;
            },
            clickCell(item, name){
              console.log('clickCell:',item,name);
              this.changeEdit(item,name,true);
              this.oldValue = item[name];
              this.$nextTick(()=>{
                // console.log('内容:',$(event.target).find('input').val())
                $(event.target).find('input').focus()
              })
            },
            collapseAll(){
              $('#mytable ul').slideToggle()
            },
            collapseFun(refName){
              console.log('collapseFun:',refName,window.$('#'+refName));
              $('#'+refName).next('ul').slideToggle()
            },
            randomId(n) { 
              // yizheng-add 2020-05-23
              // 生成n位长度的字符串
              var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
              var result = "";
              for(var i = 0; i < n; i++) {
                  result += str[parseInt(Math.random() * str.length)];
              }
              return result;
            },
            sureChange(row){
              console.log('sureChange',row);
              this.showRow = false;
            },
            rowDblClick(row){
              console.log('rowDblClick',row);
              this.showRow = true;
              this.currentRow = row;
            },
            myMsg(theText,theType){
              this.$message({
                message: theText,
                type: theType
              })
            },
            async start(){
              this.inputOff=true;
              let start = Date.now();
              this.nowCount=0
              for(let i=0;i<this.cNum;i++){
                if(this.stop){
                  break;
                }
                await this.startOne(i);
                this.currentCount = i;
                this.averageTime = this.getCostTime(1, parseInt((Date.now()-start)/this.nowCount));
                this.nowCount++
              }
              this.spendTime = this.getCostTime(1, Date.now()-start);
              this.inputOff=false;
              console.log('运行结束：',this.nowCount,this.spendTime);
            },
            async startOne(count){
              // 清空上一次结果
              for(let i=0;i<this.tableData.length;i++){
                let group = this.tableData[i];
                for(let s=0;s<group.children.length;s++){
                  let one = group.children[s]
                  one.value = '';
                  one.result = '';
                }
              }
              // this.myMsg('马上开始...','success');
              this.scrollH = 0
              this.mytableId.scrollTop =this.scrollH;
              await this.scrollTo(count);
              
              // setTimeout(() => {
              //   this.scrollTo(this.count)
              // }, 3500);
            },
            scrollTo(count){
              return new Promise( async (resolve,reject)=>{
                let startTime = Date.now();
                // console.log('this.mytableId:',this.mytableId,this.allH);
              
                for(let i=0;i<this.tableData.length;i++){
                  let group = this.tableData[i];
                  for(let s=0;s<group.children.length;s++){
                    // 等待50ms
                    await this.sleep(2)
                    let one = group.children[s]
                    // one.index = true;
                    this.currentIndex = one.Id;

                    one.value = '';
                    one.result = '';
                
                    one.value= this.randomId(12);
                    // one.index = false;
                    if(count%(s+1) == 0){
                      one.result = 'fail'
                    }else{
                      one.result = 'pass'
                    }
                    
                    if(this.scrollH < this.allH-50){
                      this.scrollH += 35;
                      let top = this.scrollH;
                      if(top>200){
                        top = top-100
                      }
                      this.mytableId.scrollTop = top ;
                    }else{
                      // window.clearInterval(timer);
                    }
                  }
                }

                let useTime = parseInt((Date.now() - startTime)/1000)
                // this.$message({
                //   message: `运行完毕,用时: ${useTime}秒`,
                //   type: 'success'
                // })
                resolve()
            })

              
            },
            editRow(row){
              console.log('editRow:',row)
            },
            delRow(row){
              console.log('delRow:',row)
            }
          }
          
        }
</script>

<style scoped>
  .oneRow{
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: #eee;
    border-bottom: 1px solid #666; 
  }
  .rowChange{
    color: blue;
  }
  /deep/ .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  *{
    box-sizing: border-box;
  }
  .group{
    padding: 3px 10px; background-color: #eee;
  }
  .redbg{background-color: red; color: #eee;}
  .greenbg{background-color: green; color: #eee;}

  .topBtn{position: absolute; top: 5px; right: 100px;}
  .titleP{
    text-align: left;
    height: 40px; line-height: 40px; background-color: #eee; padding: 0 10px;
  }
  .mytable{
    height: 360px;
    overflow: auto;
  }
  .mytable li{
    display: flex;
    width: 100%;
    line-height: 35px;
    height: 35px;
    border-bottom: 1px solid #eee;
    margin: 0;
    padding: 0 10px;
  }
  .mytable li span{
    display: inline-block;
    height: 100%;
    padding: 0 5px;
    /* 省略 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .w50{width: 50px;}
  .w80{width: 80px;}
  .w100{width: 100px;}
  .w120{width: 120px;}
  .w150{width: 150px;}
  .w200{width: 200px;}
  .w250{width: 250px;}
  
</style>
