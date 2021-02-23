<template>
  <!--    <div :ref="planTableKey" class="planTable" :style="{height: (ContentHeight -33) + 'px'}">-->
  <div :ref="planTableKey" class="planTable_table">
    <vxe-table
      stripe
      size="mini"
      border="node"
      show-overflow
      column-key
      show-header-overflow
      highlight-hover-row
      highlight-current-row
      height="100%"
      :row-style="rowStyle"
      :row-class-name="setRowClassName"
      :cell-class-name="setCellClassName"
      :header-row-class-name="setHeaderRowClassName"
      :header-cell-class-name="setHeaderCellClassName"
      @header-cell-click="headCellClick"
      resizable
      auto-resize
      header-align="left"
      ref="xTable"
      class="sortable-column-demo"
      @cell-dblclick="dbclickFun"
      @cell-click="cellClickEvent"
      :edit-rules="validRules"
      :edit-config="{ trigger: 'dblclick',mode: 'cell',showIcon:false,showStatus:false, activeMethod: activeCellMethod}"
      :context-menu="{body: {options: bodyMenus}, visibleMethod}"
      @context-menu-click="contextMenuClickEvent"
      @edit-closed="editClosedEvent"
      :data="listData"
    >
      <vxe-table-column width="45px" field="Id" title=" " align="right">
        <template v-slot="{ row }">
          <div v-if="row.breakPoint && !row.running" class="breakPointStyle">
            <i class="iconfont iconbreakpoint" style="color: #d81e06"></i>
          </div>
          <div v-if="row.running && !row.breakPoint" class="breakPointStyle">
            <i class="iconfont iconcaret-right" style="color: #F1A139">{{goToRow(row)}}</i>
          </div>
          <div v-if="row.running && row.breakPoint" class="breakPointStyle">
            <i class="iconfont iconbreakpoint-stop" style="color: #d81e06">{{goToRow(row)}}</i>
          </div>
          <div v-html="row.Id" style="float:right;padding-right: 2px"></div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="checkbox" :visible="false" type="checkbox" width="40"></vxe-table-column>
      <vxe-table-column width="60px" field="TESTNAME" title="Test" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.TESTNAME"></span>
          <!-- {{row}} -->
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="80px"
        field="SUBTESTNAME"
        title="SubTest"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.SUBTESTNAME"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="100px"
        field="SUBSUBTESTNAME"
        title="SubSubTest"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.SUBSUBTESTNAME"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="90px"
        field="DESCRIPTION"
        title="Description"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.DESCRIPTION"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="120px"
        field="FUNCTION"
        title="Function"
        :edit-render="{name: 'input'}"
      >
        <template v-slot:edit="{ row }" v-show="!noEditing">
          <el-autocomplete
            size="mini"
            v-model="row.FUNCTION"
            :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="true"
            :popper-append-to-body="false"
            :highlight-first-item="false"
            :hide-loading="true"
            popper-class="autoList"
          ></el-autocomplete>
        </template>
        <template v-slot="{ row }" v-show="noEditing">
          <span v-html="row.FUNCTION"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="80px"
        field="PARAM1"
        title="PARAM1"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.PARAM1"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="80px"
        field="PARAM2"
        title="PARAM2"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.PARAM2"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="50px" field="LOW" title="LOW" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.LOW"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="50px" field="HIGH" title="HIGH" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.HIGH"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="60px" field="UNIT" title="UNIT" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.UNIT"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="50px" field="KEY" title="KEY" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.KEY"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="50px" field="VAL" title="VAL" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.VAL"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="80px" field="TIMEOUT" title="Timeout" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.TIMEOUT"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="60px" field="TID" title="TID" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.TID"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        width="100px"
        field="DIMENSIONS"
        title="DIMENSIONS"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.DIMENSIONS"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        min-width="100px"
        field="FAIL_COUNT"
        title="Fail_count"
        :edit-render="{name: 'input'}"
      >
        <template v-slot="{ row }">
          <span v-html="row.FAIL_COUNT"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="60px" field="USER" title="USER" :edit-render="{name: 'input'}">
        <template v-slot="{ row }">
          <span v-html="row.USER"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="60px" field="RESULT" title="Result">
        <template v-slot="{ row }">
          <span v-html="row.RESULT"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="80px" field="TIMESTAMP" title="TimeStamp">
        <template v-slot="{ row }">
          <span v-html="row.TIMESTAMP"></span>
        </template>
      </vxe-table-column>
      <template v-slot:empty>
        <p>Temporarily no data</p>
      </template>
    </vxe-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import XEUtils from "xe-utils";
import { TestPlanTable } from "../js/TestPlanTable.js";

export default {
  name: "TestPlanTable",
  props: {
    // testPlanTableSpace: String,
    isCheckedFilter: Boolean,
    functionData: {
      type: Array,
      default: () => []
    },
    searchInput: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      named: false,
      openFiles: ["123"],
      onetable: [
        {
          Id: "",
          TESTNAME: "10001",
          SUBTESTNAME: "Group1",
          SUBSUBTESTNAME: "Test1",
          DESCRIPTION: "",
          UNIT: "",
          LOW: "",
          HIGH: "",
          FUNCTION: "",
          PARAM1: "",
          PARAM2: "",
          KEY: "",
          VAL: "",
          TIMEOUT: "",
          TID: "",
          DIMENSIONS: "",
          FAIL_COUNT: "",
          USER: "",
          RESULT: "",
          TIMESTAMP: "",
          breakPoint: false,
          running: false,
          selectedTag: "",
          isSelect: ""
        },
        {
          Id: "",
          TESTNAME: "10002",
          SUBTESTNAME: "Group2",
          SUBSUBTESTNAME: "Test2",
          DESCRIPTION: "",
          UNIT: "",
          LOW: "",
          HIGH: "",
          FUNCTION: "",
          PARAM1: "",
          PARAM2: "",
          KEY: "",
          VAL: "",
          TIMEOUT: "",
          TID: "",
          DIMENSIONS: "",
          FAIL_COUNT: "",
          USER: "",
          RESULT: "",
          TIMESTAMP: "",
          breakPoint: false,
          running: false,
          selectedTag: "",
          isSelect: ""
        }
      ],
      planTableKey: this.testPlanTableSpace,
      treeConfig: {
        //分组
        children: "children"
      },
      bodyMenus: [
        [
          //菜单列表
          {
            code: "addAbove",
            // name: '在该选择项上方添加行',
            name: "Add a row above",
            disabled: false
          },
          {
            code: "addBelow",
            // name: '在该选择项下方添加行',
            name: " Add a row below",
            disabled: false
          },
          {
            code: "copyRow",
            // name: '复制',
            name: "Copy selected rows",
            disabled: false
          },
          {
            code: "Delete",
            // name: '删除',
            name: "Delete",
            disabled: false
          },
          {
            code: "cutSelection",
            // name: '剪切',
            name: "Cut Selection",
            disabled: false
          },
          {
            code: "clipboardAbove",
            // name: '在该选择项上方粘贴',
            name: "Insert clipboard above",
            disabled: false
          },
          {
            code: "clipboardBelow",
            // name: '在该选择项下方粘贴',
            name: "Insert clipboard below",
            disabled: false
          },
          {
            code: "multipleSelect",
            // name: '多选',
            name: "Multiple select",
            disabled: false
          },
          {
            code: "duplicateselect",
            // name: '重复选择',
            name: "Duplicate select",
            disabled: false
          },
          {
            code: "jumpSelect",
            // name: '跳转到选择',
            name: "Jump to",
            disabled: false
          },
          {
            code: "clearBreak",
            // name: '清除所有断点',
            name: "Clear all break point",
            disabled: false
          }
        ]
      ],
      menusList: null, //复制菜单列表
      sortable2: null, //拖拽对象
      tableTreeDataMg: "", //table的Data
      groupName: "", //分组名
      importDataArr: [], //选中的文件名数组
      setGroupNameDialog: false, //
      ContentHeight: "500", //默认高度
      editActived: "", //编辑状态
      isFieldName: false, //打开的文件字段名是否正确
      processStatus: true, //暂停图标
      copyRowData: [], //复制的row
      dbRowData: [], //单击选中
      jumpAbove: false,
      jumpBelow: false,
      filterName: "", //搜索Val
      jumpIndex: 0, //跳跃
      restaurants: [],
      timeout: null,
      fullColumn: [], //拖拽后的列
      noEditing: false,
      ctrlRow: false,
      shiftRow: false,
      startIndex: "",
      selectStartIndex: "",
      sendIndexEnd: 0,
      isHeadsearch: "",
      valueCopy: "", //全局复制data
      validRules: {
        FUNCTION: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("Function can not be empty"));
              } else if (!this.functionData.includes(value)) {
                callback(new Error("Function invalid"));
              } else {
                callback("");
              }
            }
          }
        ]
      }
    };
  },
  watch: {
    searchInput(val, oldVal) {
      if (val != "") {
        this.noEditing = true;
      } else {
        this.noEditing = false;
      }
    }
  },
  computed: {
    //关键字搜索
    listData() {
      const that = this;
      that.filterName = XEUtils.toString(that.searchInput)
        .trim()
        .toLowerCase();
      let options = { children: "children" };
      if (that.filterName) {
        const filterRE = new RegExp(this.filterName, "gi");
        if (that.isHeadsearch !== "") {
          that.testPlanHead = [];
          that.testPlanHead.push(that.isHeadsearch);
        } else {
          that.testPlanHead = that.searchProps;
        }
        const rest = that.onetable.filter(item =>
          that.testPlanHead.some(
            key =>
              XEUtils.toString(item[key])
                .toLowerCase()
                .indexOf(that.filterName) > -1
          )
        );
        if (that.isCheckedFilter) {
          return rest.map(row => {
            const item = Object.assign({}, row);
            that.testPlanHead.forEach(key => {
              item[key] = XEUtils.toString(item[key]).replace(
                filterRE,
                match => `<span class="keyword-lighten">${match}</span>`
              );
            });
            return item;
          });
        } else {
          return that.onetable.map(row => {
            const item = Object.assign({}, row);
            if (rest[0] != undefined && rest[0].Id == item.Id) {
              that.$refs.xTable.setCurrentRow(rest[0]);
            }
            that.testPlanHead.forEach(key => {
              item[key] = XEUtils.toString(item[key]).replace(
                filterRE,
                match => `<span class="keyword-lighten">${match}</span>`
              );
            });
            return item;
          });
        }
        return this.onetable;
      }
      return this.onetable;
    }
  },
  created() {
    this.columnDrop();
    TestPlanTable.next_id(this.onetable);
    var that = this;
    //监听键盘按下
    document.onkeydown = function(e) {
      var ctrlKey = window.event.ctrlKey;
      var shiftKey = window.event.shiftKey;
      if (ctrlKey) {
        that.ctrlRow = true;
      }
      if (shiftKey) {
        that.shiftRow = true;
      }
    };
    //监听键盘松开
    document.onkeyup = function(e) {
      var ctrlKey = window.event.ctrlKey;
      var shiftKey = window.event.shiftKey;
      if (!ctrlKey) {
        that.ctrlRow = false;
      }
      if (!shiftKey) {
        that.shiftRow = false;
      }
    };
  },
  beforeDestroy() {
    if (this.sortable2) {
      this.sortable2.destroy();
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    //拖拽00
    columnDrop() {
      this.$nextTick(() => {
        console.log('columnDrop')
        let xTable = this.$refs.xTable;
        this.sortable = Sortable.create(
          xTable.$el.querySelector(
            ".body--wrapper>.vxe-table--header .vxe-header--row"
          ),
          {
            // handle: '.col_3',
            filter: ".col_1,.col_2",
            onEnd: ({ item, newIndex, oldIndex }) => {
              console.log("Sortable:", item, newIndex, oldIndex);
              return
              let { fullColumn, tableColumn } = xTable.getTableColumn();
              let targetThElem = item;
              let wrapperElem = targetThElem.parentNode;
              let newColumn = fullColumn[newIndex];
              let oldColumn = fullColumn[oldIndex];
              if (newColumn.fixed) {
                // 错误的移动
                if (newIndex > oldIndex) {
                  wrapperElem.insertBefore(
                    targetThElem,
                    wrapperElem.children[oldIndex]
                  );
                } else {
                  wrapperElem.insertBefore(
                    wrapperElem.children[oldIndex],
                    targetThElem
                  );
                }
                return this.$XModal.message({
                  message: "固定列不允许拖动！",
                  status: "error"
                });
              }
              // 转换真实索引
              let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex]);
              let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex]);
              // 移动到目标列
              let currRow = fullColumn.splice(oldColumnIndex, 1)[0];
              fullColumn.splice(newColumnIndex, 0, currRow);
              console.log('fullColumn:', fullColumn)
              xTable.loadColumn(fullColumn);
              // TestPlanTable.next_id(this.onetable);
              // this.$emit('removeRecords', removeRecords);
            }
          }
        );
      });
    },

    //右键--菜单
    visibleMethod({ row, columns }) {
      let xTable = this.$refs.xTable;
      let treeConfig = this.treeConfig;
      // this.dbRowData=[];
      if (this.dbRowData.length === 0) {
        xTable.setCurrentRow(row); //add by zhangzhifeng
        this.dbRowData = this.getSelectedData();
      }
      this.bodyMenus.forEach(list => {
        list.forEach(item => {
          if (this.onetable.length < 1 || this.openFiles.length !== 1) {
            //如果数据为空
            if (["tagSelect"].includes(item.code)) {
              item.visible = false;
            }
            item.disabled = true;
            if (["addAbove", "addBelow"].includes(item.code)) {
              item.disabled = false;
              if (this.openFiles.length !== 1) {
                item.disabled = true;
              }
            }
            if (["clipboardAbove", "clipboardBelow"].includes(item.code)) {
              item.disabled = false;
              // if (this.$store.state.copyData.length ===0) {
              //   item.disabled = true
              // }
            }
            return;
          } else {
            if (["tagSelect"].includes(item.code)) {
              item.visible = true;
            }
            item.disabled = false;
          }
          if (["addAbove"].includes(item.code)) {
          }
          if (["addBelow"].includes(item.code)) {
          }
          if (["jumpSelect"].includes(item.code)) {
            // if((Sequencer._BreakPoint || Sequencer._BreakPoint) && Sequencer._Testing) {
            //   item.disabled = false
            // } else {
            //   item.disabled = true
            // }
            item.disabled = true;
          }
          if (
            ["copyRow", "Delete", "cutSelection", "tagSelect"].includes(
              item.code
            )
          ) {
            item.disabled = false;
            if (
              this.dbRowData == "" ||
              !this.dbRowData ||
              this.dbRowData.length < 1
            ) {
              if (["tagSelect"].includes(item.code)) {
                item.visible = false;
              }
              item.disabled = true;
            }
            // return;
          }
          if (["clipboardAbove", "clipboardBelow"].includes(item.code)) {
            item.disabled = false;
            // if (this.$store.state.copyData.length ===0) {
            //   item.disabled = true
            // }
            //return;
          }
          if (["tagSelect"].includes(item.code)) {
            item.visible = true;
            item.disabled = false;
          }
          if (["removeEvent"].includes(item.code)) {
            let isSelect = xTable.getSelectRecords();
            if (isSelect && isSelect.length) {
              item.disabled = false;
            } else {
              item.disabled = true;
            }
          }
        });
      });
      return true;
    },
    //右键--菜单功能实现
    contextMenuClickEvent({ menu, row, column }) {
      let xTable = this.$refs.xTable;
      const columns = xTable.getColumnByField("checkbox");
      let isColums = false;
      // let state = this.$store.state;
      let state = 1;
      switch (menu.code) {
        case "addAbove":
          // this.setGroupNameDialog=true
          if (this.openFiles.length !== 1) {
            return;
          }
          this.tableAddRow(row, "above");
          // xTable.syncData().then(() => xTable.setActiveCell(newRow,'Test'));
          break;
        case "addBelow":
          // this.setGroupNameDialog=true
          if (this.openFiles.length !== 1) {
            return;
          }
          this.tableAddRow(row, "below");
          // xTable.syncData().then(() => xTable.setActiveCell(newRow,'Test'));
          break;
        case "copyRow":
          this.valueCopy = this.copyData(this.dbRowData);
          // this.$store.commit("saveCopyData", this.valueCopy);
          // this.dbRowData='';
          break;
        case "Delete":
          console.log("Delete");
          if (this.dbRowData && this.dbRowData.length != 0) {
            for (var key in this.dbRowData) {
              xTable.remove(this.dbRowData[key]);
            }
          }
          if (this.dbRowData.length == 0) {
            this.removeEvent();
          }
          break;
        case "cutSelection":
          this.valueCopy = this.copyData(this.dbRowData);
          // this.$store.commit("saveCopyData", this.valueCopy);
          if (this.dbRowData && this.dbRowData.length !== 0) {
            for (var key in this.dbRowData) {
              xTable.remove(this.dbRowData[key]);
            }
          }
          // xTable.clearCurrentRow();
          break;
        case "clipboardAbove":
          console.log("clipboardAbove");
          this.upDownnewRow(this.valueCopy, row, "Above");
          this.dbRowData = [];
          break;
        case "clipboardBelow":
          console.log("clipboardBelow");
          this.upDownnewRow(this.valueCopy, row, "Below");
          this.dbRowData = [];
          break;
        case "multipleSelect":
          console.log("多选");
          isColums = true;
          if (columns.visible) {
            this.duplicateSelect(false);
          } else {
            this.duplicateSelect(true);
            columns.visible = true;
          }
          break;
        case "duplicateselect":
          console.log("重复选中");
          this.valueCopy = this.copyData(this.dbRowData);
          // this.$store.commit("saveCopyData", this.valueCopy);
          this.upDownnewRow(this.valueCopy, row, "Below");
          break;
        case "jumpSelect":
          this.$emit("jumpSelect", row, this.onetable.indexOf(row));
          // if (this.dbRowData.length == 1) {
          //   xTable.scrollToRow(xTable.getData(this.dbRowData[0].Id - 1));
          // }
          break;
        case "clearBreak":
          this.onetable.forEach(item => {
            if (item.breakPoint) {
              item.breakPoint = false;
              // item.running=false;
            }
          });
          break;
        case "circle_red":
          row.selectedTag = "circle_red";
          break;
        case "circle_Light_orange":
          row.selectedTag = "circle_Light_orange";
          break;
        case "circle_orange":
          row.selectedTag = "circle_orange";
          break;
        case "circle_gree":
          row.selectedTag = "circle_gree";
          break;
        case "circle_blue":
          row.selectedTag = "circle_blue";
          break;
        case "circle_purple":
          row.selectedTag = "circle_purple";
          break;
        case "clearTag":
          let tagList = xTable.getData();
          this.chearTag(tagList);
          break;
      }
    },
    /*多选或者取消多选
      @isShow  是否显示多选*/
    duplicateSelect(isShow) {
      let xTable = this.$refs.xTable;
      const columns = xTable.getColumnByField("checkbox");
      xTable.clearCheckboxRow();
      xTable.clearCurrentRow();
      if (isShow) {
        columns.visible = true;
      } else {
        columns.visible = false;
      }
      xTable.refreshColumn();
    },

    getCurrentColumn: function() {
      this.$refs.xTable.syncData();
      let currentColumn = this.$refs.xTable.getCurrentColumn();
      return currentColumn;
    },

    //删除选中的row
    removeEvent: function() {
      let removeRecords = this.getSelectedData();
      let options = { children: "children" };
      if (XEUtils.getType(removeRecords) === "array") {
        console.log("removeRecords");
        removeRecords.forEach(row => {
          let matchObj = XEUtils.findTree(
            this.onetable,
            item => item === row,
            options
          );
          if (matchObj) {
            let { items, index } = matchObj;
            let restRow = items.splice(index, 1)[0];
            this.$emit("RemoveRow", restRow);
          }
        });
      }
      const that = this;
      if (XEUtils.getType(removeRecords) === "object") {
        let matchObj = XEUtils.findTree(
          this.onetable,
          item => item === removeRecords,
          options
        );
        if (matchObj) {
          let { items, index } = matchObj;
          let restRow = items.splice(index, 1)[0];
          this.$emit("RemoveRow", restRow);
        }
      }
      this.$emit("removeRecords", removeRecords);
    },

    //导入
    addImport: function(xTable, row, data) {
      const filesHtml =
        "<input type='file' id='impot_Event' multiple style='display: none' accept='.py' nwworkingdir='C:\\Users\\seeing\\Downloads\\'>";
      $("body").append(filesHtml);
      TestPlanTable.impotEvent(xTable, row, data);
      $("#impot_Event").click();
    },
    //禁止编辑
    activeCellMethod({ row, rowIndex }) {
      if (this.noEditing) {
        return false;
      }
      if (this.openFiles.length > 1) {
        return false;
      }
      return true;
    },
    //开始编辑
    editActivedEvent({ row }) {
      if (this.$refs.xTable.isActiveByRow(row)) {
        //编辑开始，暂停拖拽
        // this.sortable2.options.disabled=true;
      }
    },
    //编辑结束
    editClosedEvent({ row, column }) {
      //获取已修改的数据
      if (this.$refs.xTable.getUpdateRecords().length > 0) {
        console.log(
          "this.$refs.xTable.getUpdateRecords()",
          this.$refs.xTable.getUpdateRecords()
        );
        this.$emit("TableChange", row, column);
      }
    },
    //序号排序
    next_id(tableData) {
      console.log("next_id");
      if (!tableData) {
        return false;
      }

      let rowId = 1;
      tableData.forEach(function(item) {
        if (item.children) {
          let rowIdArr = [];
          item.children.forEach(function(items) {
            items.Id = rowId;
            rowId++;
            rowIdArr.push(items.Id);
            return;
          });
          //统计
          rowIdArr.sort(function(a, b) {
            return a - b;
          });
          item.Id = rowIdArr[0] + " ~ " + rowIdArr[rowIdArr.length - 1];
        } else {
          item.Id = rowId;
          rowId++;
        }
      });
      return true;
    },
    //刷新数据状态
    syncData: function() {
      this.$refs.xTable.syncData();
    },
    /*表格插入一行
     * @data   数据
     * @row    当前row
     * @isUp   当前的上一行或下一行插入
     * */
    upDownnewRow: function(data, row, isUp) {
      let xTable = this.$refs.xTable;
      let indexKey = 1;
      if (isUp == "Above") {
        console.log("clipboardAbove", data, row, isUp);
        if (data.length == 1) {
          data[0]._XID = "";
          xTable.createRow(data[0]).then(newRow => {
            // 插入到指定节点位置中
            let rowNode = XEUtils.findTree(
              this.onetable,
              item => item === row,
              this.options
            );
            if (rowNode) {
              rowNode.items.splice(rowNode.index, 0, newRow);
              // xTable.syncData().then(() => rowNode.items.splice(rowNode.index, 0, newRow));
            } else {
              this.onetable.splice(
                this.onetable ? this.onetable.length : 0,
                0,
                newRow
              );
            }
            this.next_id(this.onetable);
            xTable.syncData();
          });
          this.$emit("CopyRow", this.copyRowData[0]);
        } else {
          data.forEach(item => {
            item._XID = "";
            xTable.createRow(item).then(newRow => {
              // 插入到指定节点位置中
              let rowNode = XEUtils.findTree(
                this.onetable,
                item => item === row,
                this.options
              );
              if (rowNode) {
                rowNode.items.splice(rowNode.index, 0, newRow);
                // xTable.syncData().then(() => rowNode.items.splice(rowNode.index, 0, newRow));
              } else {
                this.onetable.splice(
                  this.onetable ? this.onetable.length : 0,
                  0,
                  newRow
                );
              }
              this.next_id(this.onetable);
              xTable.syncData();
            });
            this.$emit("CopyRow", item);
          });
        }
      }
      if (isUp == "Below") {
        if (data.length == 1) {
          data[0]._XID = "";
          xTable.createRow(data[0]).then(newRow => {
            // 插入到指定节点位置中
            let rowNode = XEUtils.findTree(
              this.onetable,
              item => item === row,
              this.options
            );
            if (rowNode) {
              rowNode.items.splice(rowNode.index + 1, 0, newRow);
              // xTable.syncData().then(() => rowNode.items.splice(rowNode.index+1, 0, newRow));
            } else {
              this.onetable.splice(
                this.onetable ? this.onetable.length : 0,
                0,
                newRow
              );
            }
            this.next_id(this.onetable);
            xTable.syncData();
          });
          this.$emit("CopyRow", data[0]);
        } else {
          data.forEach(item => {
            item._XID = "";
            xTable.createRow(item).then(newRow => {
              // 插入到指定节点位置中
              let rowNode = XEUtils.findTree(
                this.onetable,
                item => item === row,
                this.options
              );
              if (rowNode) {
                if (indexKey > data.length) {
                  return;
                }
                console.log("indexKey", indexKey);
                rowNode.items.splice(rowNode.index + indexKey, 0, newRow);
                indexKey++;
              } else {
                this.onetable.splice(
                  this.onetable ? this.onetable.length : 0,
                  0,
                  newRow
                );
              }
              this.next_id(this.onetable);
              xTable.syncData();
            });
            this.$emit("CopyRow", data[0]);
            return;
          });
        }
      }
    },
    //是否有编辑。
    isEditState() {
      let updateRecords = this.$refs.xTable.getUpdateRecords();
      if (updateRecords.length > 0) {
        this.$emit("testPlanEditStatus", true);
      }
    },
    //返回最新的TableData
    refreshTableData() {
      this.$refs.xTable.syncData();
      console.log("--refreshTableData--");
      return this.onetable;
    },

    //设置行样式
    setRowClassName({ row, column }) {
      if (row.selectedTag != "") {
        return row.selectedTag;
      }

      for (var key in this.dbRowData) {
        if (
          this.dbRowData[key] === row &&
          this.dbRowData[key].isSelect !== "" &&
          this.dbRowData[key].isSelect
        ) {
          return "selectRowClass";
        }
      }
    },
    //设置单元格样式
    setCellClassName: function({ column, columnIndex }) {
      if (columnIndex == 0) {
        return "cellState_bag";
      } else if (columnIndex == 1) {
        return "cellState_bag";
      }
      if (this.isHeadsearch !== "" && this.isHeadsearch == column.property) {
        return "select_cloumn";
      }
    },
    //设置表头单元样式
    setHeaderCellClassName: function({ column, columnIndex }) {
      if (columnIndex == 0) {
        return "cellState_bag";
      } else if (columnIndex == 1) {
        return "cellState_bag";
      }
    },
    //设置表头行样式
    setHeaderRowClassName: function({ column }) {
      return "heatcCellState_bag";
    },
    //双击后触发
    dbclickFun: function({ row, columnIndex }) {
      if (row.running) {
        return;
      }
      if (columnIndex == 0) {
        row.breakPoint = !row.breakPoint;
        this.$refs.xTable.syncData();
      }
    },
    //表格背景样式
    rowStyle({ row, column }) {
      // Result: '',   //  FAIL   PASS  Disabled    Skipped
      if (row.isSelect) {
        return {
          backgroundColor: "#e6f7ff"
        };
      }
      if (row.running && row.breakPoint) {
        return {
          backgroundColor: "#FF7E"
        };
      } else if (row.running) {
        return {
          backgroundColor: "#e6f7cc"
        };
      } else {
        switch (row.RESULT) {
          case "FAIL":
            return {
              backgroundColor: "#FF7E79"
              // color: '#ffffff'
            };
            break;
          case "PASS":
            return {
              backgroundColor: "#A9D5BC"
              // color: '#ffffff'
            };
            break;
          case "Disabled":
            return {
              backgroundColor: "#A8A8A8"
              // color: '#ffffff'
            };
            break;
          case "Skipped":
            return {
              backgroundColor: "#D4E5EF"
              // color: '#ffffff'
            };
            break;
        }
      }
    },
    //滚动到指定行
    goToRow: function(row) {
      this.$refs.xTable.scrollToRow(row);
    },
    //深度复制方法
    copyData: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    //运行
    runningFun: function() {
      // for(let i=0;i<this.onetable.length;i++){
      let i = 0;
      let that = this;
      setInterval(function() {
        if (i == that.onetable.length) {
          return;
        }
        if (that.onetable[i].State == "el-icon-aim") {
          that.onetable[i - 1].State = "";
          return;
        }
        if (i != 0) {
          that.onetable[i - 1].State = "";
        }
        that.onetable[i].State = "el-icon-right";
        i++;
      }, 1000);
    },
    //清除标签
    chearTag: function(rowData) {
      for (let i in rowData) {
        rowData[i].selectedTag = " ";
      }
    },
    cellClassName({ row, column }) {
      if ((row === this.selectRow) & (column === this.selectColumn)) {
        return "col-orange";
      }
    },
    //点击表头选中
    headCellClick({ row, column }) {
      this.isHeadsearch = column.property;
    },
    //点击选中后触发
    cellClickEvent({ row, column }) {
      console.log("cellClickEvent",row);
      this.selectRow = row;
      this.selectColumn = column;
      this.isHeadsearch = ""; //取消列选中
      if (!this.shiftRow && !this.ctrlRow) {
        this.$emit("clickRow", row);
      }
      if (!this.shiftRow && !this.ctrlRow && this.dbRowData.length != 0) {
        for (var key in this.dbRowData) {
          this.dbRowData[key].isSelect = false;
        }
        this.startIndex = "";
        this.dbRowData = [];
        if (this.dbRowData.length === 0) {
          row.isSelect = true;
          this.dbRowData.push(row);
        }
      }
      if (this.shiftRow) {
        console.log("shift");
        let endIndex;
        var start, end;
        endIndex = row.Id;
        if (this.startIndex == "") {
          this.startIndex = 0;
        }
        if (this.startIndex < endIndex) {
          //做比较，将第一次点击行和最后一次点击行的index，的小值赋值给start，大的赋值给end
          start = this.startIndex;
          end = endIndex;
        } else {
          start = endIndex;
          end = this.startIndex;
        }
        let selectdb = this.dbRowData.length;
        let startEndIndex;
        if (end < selectdb) {
          startEndIndex = selectdb - start;
        } else {
          startEndIndex = end - start;
        }
        for (var j = 0; startEndIndex > j; j++) {
          if (end < selectdb) {
            this.onetable[end].isSelect = false;
            for (var key in this.dbRowData) {
              if (this.dbRowData[key].Id === this.onetable[end].Id) {
                this.dbRowData.splice(key, 1);
              }
            }
            end++;
          } else {
            if (end == selectdb) {
              return;
            }
            this.onetable[start].isSelect = true;
            if (this.dbRowData.length !== 0) {
              // console.log('当前shiftRow');
              for (var key in this.dbRowData) {
                if (this.dbRowData[key].Id === this.onetable[start].Id) {
                  this.dbRowData.splice(key, 1);
                  // return
                }
              }
              this.dbRowData.push(this.onetable[start]);
            } else {
              this.dbRowData.push(this.onetable[start]);
            }
          }
          start++;
        }
      } else {
        if (this.dbRowData.length === 0 || row.isSelect) {
          this.startIndex = row.Id - 1;
        } else {
          this.startIndex = row.Id;
        }
      }
      if (this.ctrlRow) {
        console.log("Ctrl");
        if (this.dbRowData.length === 0 && this.selectStartIndex !== "") {
          this.onetable[this.selectStartIndex].isSelect = true;
          this.dbRowData.push(this.onetable[this.selectStartIndex]);
          this.selectStartIndex = "";
        }
        if (!row.isSelect || row.isSelect === "") {
          row.isSelect = true;
        } else {
          row.isSelect = false;
        }
        if (this.dbRowData.length != 0) {
          console.log("当前ctrlRow");
          for (var key in this.dbRowData) {
            if (
              this.dbRowData[key].Id === row.Id ||
              this.dbRowData[key].isSelect === "" ||
              !this.dbRowData[key].isSelect
            ) {
              this.dbRowData[key].isSelect = false;
              this.dbRowData.splice(key, 1);
              return;
            }
          }
          this.dbRowData.push(row);
        } else {
          this.dbRowData.push(row);
        }
      } else {
        this.selectStartIndex = row.Id - 1;
      }
      // console.log('this.dbRowData ---key',this.dbRowData);
    },

    clearAll() {
      this.onetable = [];
      this.openFiles.splice(0);
    },
    /*打开csv
     * @data  数组
     * */
    openCsvData: function(path, test, subtest, data) {
      console.log("openCsvData");
      this.refreshStatus(); //清空状态
      let findFile = this.openFiles.find(item => {
        return item.path === path;
      });
      if (findFile === undefined || this.openFiles.length !== 1) {
        console.log("init data");
        this.onetable = [];
        this.openFiles.splice(0);
        this.openFiles.push({
          path: path,
          test: test,
          subtest: subtest
        });
        this.addRow(data);
      }
    },
    getOpenFilePath() {
      if (this.openFiles.length !== 1) {
        return "";
      }
      return this.openFiles[0].path;
    },
    //增加数据
    addCsvData: function(path, test, subtest, data) {
      console.log("addCsvData");
      let findFile = this.openFiles.find(item => {
        return item.path === path;
      });

      if (findFile === undefined) {
        this.openFiles.push({
          path: path,
          test: test,
          subtest: subtest
        });
        this.addRow(data);
      }
    },
    //
    /*获取Table的列
     *@titleArr   返回表头[]
     * */
    getTableTile: function() {
      var titleArr = [];
      let column = this.$refs.xTable.getTableColumn();
      console.log("get ---->>Column");
      if (column && column.length != 0) {
        column.fullColumn.map(function(col) {
          titleArr.push(col.property);
        });
        return titleArr;
      }
    },
    /*设置并刷新table的列
     *@titleArr  表头  按照顺序
     */
    setTableColumn: function(titleArr) {
      console.log("setTableColumn", titleArr);
      const that = this;
      let titleColumn = [];
      if (titleArr && titleArr.length != 0) {
        titleArr.forEach(function(title) {
          titleColumn.push(that.$refs.xTable.getColumnByField(title));
        });
        that.$refs.xTable.loadColumn(titleColumn);
      }
    },
    /*添加表格行
     * row   行
     * jump  above or below  添加到上一行或下一行
     * */
    tableAddRow: function(row, jump) {
      console.log("tableAddRow", row);
      let xTable = this.$refs.xTable;
      xTable
        .createRow({
          Id: "",
          TESTNAME: this.openFiles[0].test,
          SUBTESTNAME: this.openFiles[0].subtest,
          SUBSUBTESTNAME: "",
          DESCRIPTION: "",
          UNIT: "",
          LOW: "",
          HIGH: "",
          FUNCTION: "",
          PARAM1: "",
          PARAM2: "",
          KEY: "",
          VAL: "",
          TIMEOUT: "",
          TID: "",
          DIMENSIONS: "",
          FAIL_COUNT: "",
          USER: "",
          RESULT: "",
          TIMESTAMP: "",
          breakPoint: false,
          running: false,
          selectedTag: "",
          isSelect: ""
        })
        .then(newRow => {
          console.log("addNewRow", newRow);
          // 插入到指定节点位置中
          let rowNode = XEUtils.findTree(
            this.onetable,
            item => item === row,
            this.treeConfig
          );
          if (rowNode) {
            if (jump == "above") {
              rowNode.items.splice(rowNode.index, 0, newRow);
            } else {
              rowNode.items.splice(rowNode.index + 1, 0, newRow);
            }
          } else {
            console.log("rowNode2222");
            this.onetable.splice(
              this.onetable ? this.onetable.length : 0,
              0,
              newRow
            );
          }
          TestPlanTable.next_id(this.onetable);
          this.$emit("AddRow", newRow);
        });
    },
    /*获取表格数据
     * return 表格数据
     * */
    getData: function() {
      return this.onetable;
    },
    /*增加行数据
     * rowData   数组[]*/
    addRow: function(rowData) {
      //根据数据的父类合并
      let item = {};
      if (rowData.length === 0) {
        return;
      }
      //遍历数组
      rowData.forEach((Rval, rIndex) => {
        if (Rval) {
          if (Rval.hasOwnProperty("_XID")) {
            delete Rval._XID;
          }
          Rval["breakPoint"] = false;
          Rval["running"] = false;
          Rval["selectedTag"] = "";
          Rval["isSelect"] = "";
          this.onetable.push(Rval);
        }
      });
      TestPlanTable.next_id(this.onetable);
    },
    /*获取当前表格
     * 返回当前选中的数据
     * */
    getSelectedData: function() {
      let currentRecord = this.$refs.xTable.getCurrentRecord();
      let checkboxRecords = this.$refs.xTable.getCheckboxRecords();
      console.log("getSelectedData");
      if (checkboxRecords && checkboxRecords.length > 0) {
        return checkboxRecords;
      } else if (currentRecord) {
        return [currentRecord];
      }
      return "";
    },

    getSelectRecords() {
      return this.$refs.xTable.getCheckboxRecords();
    },
    /*搜索
     *@data    搜索内容
     * @jump  普通搜索的上一个或者下一个  above OR next
     * */
    searchJump: function(jump) {
      const that = this;
      if (that.isCheckedFilter) {
        return;
      }
      if (that.filterName) {
        const rest = that.onetable.filter(item =>
          that.testPlanHead.some(
            key =>
              XEUtils.toString(item[key])
                .toLowerCase()
                .indexOf(that.filterName) > -1
          )
        );
        let arrID = [];
        for (var i in rest) {
          arrID.push(rest[i].Id);
        }
        if (jump == "below") {
          console.log("below");
          that.jumpIndex++;
          return this.onetable.map(row => {
            const item = Object.assign({}, row);
            if (
              arrID.length > 1 &&
              that.jumpIndex < arrID.length &&
              arrID[that.jumpIndex] == item.Id
            ) {
              that.$refs.xTable.scrollToRow(
                that.$refs.xTable.getData(item.Id - 1)
              );
              that.$refs.xTable.setCurrentRow(item);
            }
          });
        } else {
          console.log("above");
          that.jumpIndex--;
          return this.onetable.map(row => {
            const item = Object.assign({}, row);
            if (
              arrID.length > 1 &&
              that.jumpIndex < arrID.length &&
              arrID[that.jumpIndex] == item.Id
            ) {
              that.$refs.xTable.scrollToRow(
                that.$refs.xTable.getData(item.Id - 1)
              );
              that.$refs.xTable.setCurrentRow(item);
            }
          });
        }
      }
    },
    /*回调*/
    updateRunRowData: function(row) {
      //更新当前行状态
    },
    /*忽略行 22
     * isIgnore  是否忽略  true /false*/
    IgnoreRow: function(isIgnore) {
      if (isIgnore) {
      }
    },
    /*重置*/
    resetSet: function() {
      //除了断点，其他全部重置
      let xTable = this.$refs.xTable;
      xTable.clearCheckboxRow();
      xTable.clearCurrentRow();
      xTable.clearData(this.onetable, "RESULT");
      xTable.clearData(this.onetable, "TIMESTAMP");
      let rowData = xTable.getData();
      for (let i in rowData) {
        rowData[i].selectedTag = " ";
        rowData[i].running = false;
      }
      this.$emit("resetSetRow");
    },
    //切换当前表格时恢复当前状态
    refreshStatus: function() {
      let xTable = this.$refs.xTable;
      xTable.clearCheckboxRow();
      xTable.clearCurrentRow();
      xTable.clearSelected();
      xTable.clearActived();
      this.copyRowData = [];
      // this.$store.state.copy=[];
      this.dbRowData = [];
    },

    /*检查*/
    getValidation: function() {
      //检查
    },
    //自动完成
    loadAll() {
      let listArr = [{
        value:'datalogger',
      },{
        value:'delay',
      },{
        value:'dmm',
      }];
      // for (var key in this.functionData) {
      //   let list = { value: this.functionData[key] };
      //   listArr.push(list);
      // }
      return listArr;
    },
    //自动完成
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 10 * Math.random());
    },
    //自动完成
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async fullValidEvent() {
      console.log("fullValidEvent");
      const errMap = await this.$refs.xTable
        .fullValidate()
        .catch(errMap => errMap);
      console.log(errMap);
      if (errMap) {
        this.$message.error("Validate failed");
      } else {
        this.$message.success("Validate ok");
      }
    }
  }
};
</script>


<style>
.planTable_table .heatcCellState_bag {
  background: linear-gradient(to bottom, #f5f4f4, #c7c7c7);
  color: #5a5a5a !important;
  /*color: #fff;*/
}
.cellState_bag {
  background: #eaeaea;
  color: #000 !important;
  text-align: center !important;
}
.cellState_bag:hover {
  cursor: pointer;
}
.selectRowClass {
  background-color: #e6f7ff !important;
  /*color: #fff;*/
}
.cel_white {
  background: #eaeaea;
  background-image: none !important;
}
.vxe-table .vxe-table--header-wrapper .vxe-table--repair {
  border-bottom: 0 !important;
}
.fa_select {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  left: 40px !important;
  margin-top: 2px;
}
.circle_red {
  background: #e76a5b;
  color: #e76a5b;
}
.circle_Light_orange {
  background: #eba55c;
  color: #eba55c;
}
.circle_orange {
  background: #f0cf67;
  color: #f0cf67;
}
.select_cloumn {
  background: #f0c3a6;
}
.circle_gree {
  background: #7ccb70;
  color: #577cf0;
}
.circle_blue {
  background: #577cf0;
  color: #577cf0;
}
.circle_purple {
  background: #a976cf;
  color: #a976cf;
}
.vxe-ctxmenu--option-wrapper li:nth-child(11) ul {
  width: 100px !important;
}
.vxe-table--ctxmenu-wrapper.child-pos--left .vxe-table--ctxmenu-clild-wrapper {
  left: calc(-100% + 75px);
}
.vxe-ctxmenu--link-content {
  display: inline-flex !important;
}
.vxe-table--ctxmenu-wrapper .vxe-ctxmenu--option-wrapper .vxe-ctxmenu--link {
  padding: 0 1em !important;
}
.keyword-lighten {
  color: #000;
  background-color: #ff0;
}
.el-autocomplete-suggestion__wrap {
  padding: 0 !important;
}
.el-autocomplete-suggestion li {
  font-size: 12px !important;
  line-height: 25px !important;
}
.autoList {
  margin-top: 5px !important;
}
.vxe-table .vxe-body--column {
  /*line-height: 1 !important;*/
}
.vxe-table.t--border .vxe-table--fixed-left-wrapper {
  border-right: 0 !important;
}
</style>

<style scoped>
.vxe-table {
  font-size: 12px !important;
  border-left: none !important;
  border-right: none !important;
}

/deep/ .vxe-table .vxe-cell {
  padding: 0px 3px;
}

.drag-btn {
  cursor: move;
  font-size: 12px;
}

.sortable-tree-demo .vxe-body--row.sortable-ghost,
.sortable-tree-demo .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}

.numberText {
  font-size: 12px;
}

.planTable_table {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.planTable_table .el-icon-aim {
  color: red;
}
/deep/ .vxe-table.size--mini .vxe-default-input,
.vxe-table.size--mini .vxe-default-select,
.vxe-table.size--mini .vxe-default-textarea,
.vxe-table.size--mini .vxe-input--wrapper {
  height: 21px;
}
/deep/ .vxe-table.size--mini .vxe-header--column.col--ellipsis {
  height: 23px !important;
}
/deep/ .vxe-table.size--mini .vxe-body--column.col--ellipsis,
.vxe-table.size--mini .vxe-footer--column.col--ellipsis,
.vxe-table.size--mini .vxe-header--column.col--ellipsis,
.vxe-table.vxe-editable.size--mini .vxe-body--column {
  height: 23px !important;
  line-height: 17px;
  vertical-align: middle;
}
/deep/ .el-input--mini .el-input__inner {
  height: 21px !important;
  line-height: 21px !important;
}
.breakPointStyle {
  position: relative;
  float: left;
  font-size: 16px;
  left: 4px;
}

.select_fa {
  text-align: center;
}
</style>
