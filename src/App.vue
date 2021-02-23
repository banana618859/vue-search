<template>
  <div id="app">
    <img src="./assets/logo.png" style="width:40px; position:absolute; left:20px; top:10px;">
    <h1>{{ msg }}</h1>

    <div style="padding:0 20px;">

      <el-tabs 
        v-model="activeTab" 
        @tab-click="handleClick" 
        @tab-add="handleAddTab"
        @tab-remove="handleRemoveTab">
        <el-tab-pane label="Vant" name="vant"></el-tab-pane>
        <el-tab-pane label="图表" name="chart"></el-tab-pane>
        <el-tab-pane label="折叠面板" name="collapse"></el-tab-pane>
        <el-tab-pane label="pdf" name="pdf"></el-tab-pane>
        <el-tab-pane label="后台学生表" name="stu"></el-tab-pane>
        <el-tab-pane label="二维码" name="aa"></el-tab-pane>
        <el-tab-pane label="导航菜单" name="one00"></el-tab-pane>
        <el-tab-pane label="testCase" name="one0"></el-tab-pane>
        <el-tab-pane label="最快的表格" name="one"></el-tab-pane>
        <el-tab-pane label="可拖拽树" name="two"></el-tab-pane>
        <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <!-- 原文链接：https://blog.csdn.net/douyiqing/article/details/101205380 -->
        </el-tab-pane>
        <el-tab-pane label="拖拽例子" name="third"></el-tab-pane>
        <el-tab-pane label="作用域插槽" name="fourth"></el-tab-pane>
        <el-tab-pane label="内容渲染" name="fifth"></el-tab-pane>
      </el-tabs>

    </div>

    <div style="width:1000px; border:1px solid #eee; margin:10px auto;">

      <div 
        v-show="activeTab =='vant'"
        style="min-height:600px;"
        >
        <myVant></myVant>
      </div>
        <div 
        v-show="activeTab =='chart'"
        style="min-height:600px;"
        >
        <div>
          <p>图表控制：</p>
          <el-input size="mini" v-model="chartTitle" style="width: 100px;"></el-input>
          <el-checkbox size="mini" v-model="needVersion"></el-checkbox>
        </div>
        <LineChart 
          :chartH="chartH"
          :title="chartTitle"
          :needVersion="needVersion"
        ></LineChart>
      </div>
      <div 
        v-show="activeTab =='collapse'"
        style="min-height:600px;"
        >
        <collapse></collapse>
      </div>
      <div 
        v-show="activeTab =='pdf'"
        style="min-height:600px;"
        >
      </div>
 
      <div 
        v-show="activeTab =='stu'"
        style="min-height:600px;"
        >
        <student></student>
      </div>
      <div 
        v-show="activeTab =='aa'"
        style="min-height:600px;"
        >
        <qrCode></qrCode>
      </div>
      <div 
        v-show="activeTab =='one00'"
        style="min-height:600px;"
        >
        <navMenu></navMenu>
      </div>
      <div 
        v-show="activeTab =='one0'"
        style="min-height:300px;"
        >
        <theTable></theTable>
      </div>
      <div 
        v-show="activeTab =='one'"
        style="min-height:300px;"
        >
        <myLiTable></myLiTable>
      </div>
      <div 
        v-show="activeTab =='two'"
        style="min-height:300px;"
        >
        <projectTree></projectTree>
      </div>
      <div v-show="activeTab =='first'">
        <input type="text" name="" 
        style="width:100%; height:40px; line-height:40px; padding:5px 10px; " 
         v-model="searchKeyWord" 
         @change="getSearchRel" placeholder="/请输入搜索内容">
      
        <ul id="resultRel" class="searchRel">
          <li v-for="(item,index) in tableData" :key=index style="width:100%;">
            <p>{{index+" : "+item.goodname}}</p>
          </li>
        </ul>
      </div>

      <div 
        v-show="activeTab =='second'" 
        style="min-height:300px;">
        second page!
          <el-select
            @mouseenter.native="selectEnter"
            @focus="focusFun"
            @blur="blurFun"
            ref="son"
            v-model="value" 
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          
            <!-- <div style="display:flex;" id="items">
              <div class="item" v-for="(item,index) in valueArr">
                <p>{{item.name}}</p>
              </div>
            </div> -->
            <div style="border:1px solid red; padding:10px; overflow: hidden;">
              <div style="float: left; border: 1px solid blue; margin-right: 2%;; width: 48%;">
                <el-table
                  id="items"
                  :data="tableDatab"
                  stripe
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
                  </el-table>
              </div>

              <div style="width: 48%;border:1px solid #ccc; float: left; height: 100px;">
                second
              </div>
            </div>
      </div>
      <div 
        v-show="activeTab =='third'"
        style="min-height:300px;">
        <div>
          <dragTable></dragTable>
        </div>
        
        <div style="border:1px solid red; margin-top:10px;">
          <dragTableTwo></dragTableTwo>
        </div>

      </div>
      <div 
        v-show="activeTab =='fourth'"
        style="min-height:300px;"
        >
        <testplanTable></testplanTable>

        <!-- //组件调用时 -->
        <!-- <MyFooter :agek.sync="age">

          <template slot="footer">
            <div>单纯插入：some footer</div>
          </template>

          <template slot="footer" slot-scope="foot">
            <div>使用插槽作用域插入some thin</div>
            <div>这里拿到插槽内的所有属性：{{foot}}</div>
          </template>

          <template v-slot:footer="foot">
              <div>some things</div>
              <div>这里拿到插槽内的所有属性：{{foot}}</div>
          </template>

          <template v-slot="{ footer }">
            <span>{{money}}</span>
            asdfsad
          </template>
          
        </MyFooter> -->

        <!-- 原文链接：https://blog.csdn.net/liushijun_/article/details/92186739 -->
      </div>
      <div 
        v-show="activeTab =='fifth'"
        style="min-height:300px;"
        >
        <myTable></myTable>
      </div>

    </div>

  </div>
</template>

<script>
import $ from 'jquery';

/* 你可以百度一下如何全局引入jquery 
如何在vue-cli webpack全局引入jquery
https://www.cnblogs.com/ch-zaizai/p/7261690.html
 */

import Sortable from 'sortablejs';
import dragTable from './components/dragTable.vue'
import dragTableTwo from './components/dragTableTwo.vue'

import MyFooter from './components/MyFooter.vue'
import testplanTable from './components/testplanTable.vue'
import myTable from './components/myTable.vue'
import myLiTable from './components/myLiTable.vue'
import theTable from './components/theTable.vue'
import navMenu from './components/navMenu.vue'
import projectTree from './components/projectTree.vue';
import qrCode from './components/qrCode.vue';
import student from './components/student.vue';
// import ToPdf from './components/ToPdf.vue';

import collapse from './components/collapse.vue';

import LineChart from './components/LineChart.vue';

import myVant from './components/myVant.vue';

import {Myclass} from './js/myclass'
export default {
  name: 'app',
  data () {
    return {
      chartTitle: '',
      needVersion: false,
      showChart: false,
      chartH: 0,
      baseChartH: 300,
      age: 18,
      tableDatab: [{
          date: '2016-05-02',
          name: '11',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '2',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '3',
          address: '上海市普陀区金沙江路 1519 弄'
        }
      ],
      valueArr: [
        { name: 11111 },
        { name: 22222 },
        { name: 33333 },
        { name: 44444 }
      ],
      msg: 'Welcome to Your Vue.js App',
      activeTab: 'one0',
      searchKeyWord: '',
      tableData: [{
        goodname:'',
      }],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  components:{
    dragTable,
    MyFooter,
    testplanTable,
    myTable,
    myLiTable,
    projectTree,
    theTable,
    navMenu,
    dragTableTwo,
    qrCode,
    student,
    collapse,
    LineChart,
    myVant
  },
  created(){
    
  },
  mounted(){
    
    let myclass = new Myclass('张三','tom');
    console.log('myclass:',myclass);
    myclass.myname()
    this.getSearchRel();
    // this.test()

    // $.ajax({
    //       url: '/api/kkk/stu',
    //       dataType: "json",
    //       data: "",
    //       success: function (data) {
    //           console.log('success:', data.result, data.result.length);
    //       }
    // })
  },
  methods:{
    test() {
      var that = this
      // var el = document.getElementById('items')
      // const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];

      // console.log('el-111',el)
      // // 常用
      // new Sortable(el, {
      //   sort: true,
      //   onChoose: function (/**Event*/evt) {
      //       // evt.oldIndex;  // element index within parent
      //       console.log('evt.oldIndexrr-choose:',evt)
      //   },
      //   // 开始拖拽的时候
      //   onStart: function (/**Event*/evt) {
      //       evt.oldIndex;  // element index within parent
      //       console.log('evt.oldIndex:',evt.oldIndex)
      //   },
      //   onEnd: function (evt) {
      //     // 获取排序之后的data数据
      //     that.valueArr.splice(evt.newIndex, 0, that.valueArr.splice(evt.oldIndex, 1)[0])
      //     var newArray = that.valueArr.slice(0)
      //     that.valueArr = []
      //     that.$nextTick(function () {
      //       that.valueArr = newArray
      //       console.log(that.valueArr)
      //     })
      //   }
      // })
    },
    selectEnter(){
      console.log('mouseenter123')
      // console.log(this.$refs["son"])
      this.$refs.son.visible = true
      // this.$refs.son.focus()
      /*this.$nextTick(() => {
        this.$refs.son.focus()
      })*/
    },
    selectLeave(){
      console.log('selectLeave')
      // console.log(this.$refs["son"])
      this.$refs.son.visible = false
      // this.$refs.son.focus()
      /*this.$nextTick(() => {
        this.$refs.son.focus()
      })*/
    },
    focusFun(){
      console.log('focusFun')
    },
    blurFun(){
      console.log('blurFun')
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.activeName = tab.name;
    },
    handleAddTab(){
      alert('do you want to add one item?')
    },
    handleRemoveTab(){
      alert('Do you want to remove a item?')
    },
    getSearchRel(){
      console.log('this.searchKeyword:',this.$theAxios,this.searchKeyWord)
      var that = this;
      this.tableData = [];
      //请求百度api

      /*this.$theAxios('https://www.apiopen.top/novelApi').then(function (response) {
        console.log(response);
        that.tableData = response.data.data;

         setTimeout(() => {
           var relArr = $('#resultRel p');
            console.log('relArr-length:',relArr.length);
            for(var i=0;i<relArr.length;i++){
              console.log('rel-first:',$(relArr[i]).text());
              var thisRow = $(relArr[i]).text();
              if(thisRow.indexOf(that.searchKeyWord) !=-1){
                var secondArr = thisRow.split(that.searchKeyWord);
                var theStr = '<span style="color:red;">'+ that.searchKeyWord +'</span>';
                var finalStr = secondArr.join(theStr);
                console.log('fin:',finalStr);
                $(relArr[i]).html(finalStr)
              }
            }
          },500)
      })
      .catch(function (error) {
        console.log(error);
      });*/
      var kk = '玉米'
      var url = "http://suggest.taobao.com/sug?code=utf-8&callback=cb&q="+this.searchKeyWord;
      $.ajax({
          url: url,
          dataType: "jsonp",
          data: "",
          success: function (data) {
              console.log('success:', data.result, data.result.length);
              var newItem;
              for(var i=0;i<data.result.length;i++){
                newItem = {
                  'goodname': data.result[i][0]
                } 
                that.tableData.push(newItem);
              }
              // 延迟一点处理,要等查询结果回来才能处理。
              setTimeout(() => {
               var relArr = $('#resultRel p');
                console.log('relArr-length:',relArr.length);
                for(var i=0;i<relArr.length;i++){
                  console.log('rel-first:',$(relArr[i]).text());
                  var thisRow = $(relArr[i]).text();
                  if(thisRow.indexOf(that.searchKeyWord) !=-1){
                    var secondArr = thisRow.split(that.searchKeyWord);
                    var theStr = '<span style="color:red;">'+ that.searchKeyWord +'</span>';
                    var finalStr = secondArr.join(theStr);
                    console.log('fin:',finalStr);
                    $(relArr[i]).html(finalStr)
                  }
                }
              },100)
          }

      });


      
    }
  }
}
</script>

<style scope>
  .item{
    width: 100px;
    height: 100px;
    border: solid 1px #ccc;
  }
  .flex{
    display: flex;
    justify-content: space-around;
  }

*{box-sizing:border-box; padding:0; margin:0;}
.searchRel li{line-height:35px; margin:0; cursor:pointer; text-align:left; padding:2px 10px;}
.searchRel li:hover{background:#eee;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  padding: 0 10px;
}

a {
  color: #42b983;
}
</style>
