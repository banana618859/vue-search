<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-27 09:58:41
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-27 10:38:18
 -->
<template>
    <div>
        <!--  row-key 是必须的 -->
        <el-table
            id="secondTable"
            row-key="id"
            :data="moduleContent"
            style="width: 100%"
            size="medium">
            <el-table-column
              prop="title"
              label="标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              label="封面">
              <template slot-scope="scope">
                <span>{{scope.row.cover}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="digest"
              label="摘要">
            </el-table-column>
            <el-table-column>
              <template slot="header" slot-scope="scope">
                <el-button type="primary" icon="el-icon-plus">添加</el-button>
              </template>
              <template slot-scope="scope">
                <el-button type="text"  icon="el-icon-view" size="small">预览</el-button>
                <el-button type="text"  icon="el-icon-delete" size="small">下架</el-button>
              </template>
            </el-table-column>
          </el-table>
            <!-- 原文链接：https://blog.csdn.net/wangliuqi123/article/details/91382542 -->
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import Sortable from 'sortablejs';
    export default {
      name: "AppModule",
      data() {
        return {
          addModuleForm:{
            name:""
          },
          removeModuleForm:{
            name:""
          },
          addModuleDialog:false,
          removeModuleDialog:false,
          clickModule:"推荐",
          moduleContent: [
            {
              id:"1",
              title:"标题1",
              type:"图文",
              cover:"封面1",
              date:"2019-12-12 12:12:12",
              digest:"这是一段摘要内容1"
            },{
              id:"2",
              title:"标题2",
              type:"视频",
              cover:"封面2",
              date:"2019-12-12 12:12:12",
              digest:"这是一段摘要内容2"
            },{
              id:"3",
              title:"标题3",
              type:"图文3",
              cover:"封面3",
              date:"2019-12-12 12:12:12",
              digest:"这是一段摘要内容3"
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
        draggable,
        Sortable
      },
      mounted() {
  // 表格拖拽事件的添加
        const el = document.querySelectorAll('#secondTable .el-table__body-wrapper > table > tbody')[0];
        console.log('el-333:',el)
        let self = this;
        new Sortable(el, {
  // 拖拽结束后的操作
          onEnd({ newIndex, oldIndex }) {
  // 修改data中的数组，
            const targetRow = self.moduleContent.splice(oldIndex, 1)[0]
            self.moduleContent.splice(newIndex, 0, targetRow)
          }
        });
      },
    }
  </script>

<style scoped>
	.sortable-ghost {
      opacity: 0.4;
      background-color: #F4E2C9;
    }
</style>