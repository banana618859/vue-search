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
        <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      </el-tabs>

    </div>

    <div style="width:600px; border:1px solid #eee; margin:10px auto;">

      <div v-show="activeTab =='first'">
        <input type="text" name="" 
        style="width:100%; height:40px; line-height:40px; padding:5px 10px; " 
        v-model="searchKeyWord" @change="getSearchRel" placeholder="/请输入搜索内容">
      
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
      </div>
      <div 
        v-show="activeTab =='third'"
        style="min-height:300px;">
        third page!
      </div>
      <div 
        v-show="activeTab =='fourth'"
        style="min-height:300px;"
        >
        fourth page!
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
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeTab: 'second',
      searchKeyWord: '茯苓',
      tableData: [{
        goodname:'',
      }]
    }
  },
  created(){
    
  },
  mounted(){
    
    this.getSearchRel();
    
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
      this.activeName = tab.name;
    },
    handleAddTab(){
      alert('do you want to add one item?')
    },
    handleRomoveTab(){
      alert('Do you want to remove a item?')
    },
    getSearchRel(){
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

<style>
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
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
