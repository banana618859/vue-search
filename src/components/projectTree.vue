<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-07-22 14:45:35
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-07-22 16:20:42
--> 
<template>
    <div>
        <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
        </el-tree>
        <p>
            拖拽事件
        </p>
        <div style="height: 200px; border:1px solid #f00;padding:15px;">
            <div style="height: 100%; width: 150px; float: left; border:1px solid #000">
                <p
                    id="oneP"
                    draggable="true"
                    @dragstart="ondragstart"
                    @drag="ondrag"
                    @dragend="ondragend">
                树</p>
            </div>
            <div 
                class="droptarget"
                style="height: 100%; width: 250px; float: left; margin-left: 15px; border:1px solid #ccc"
                @dragenter="ondragenter"
                @dragover="ondragover"
                @dragleave="ondragleave"
                @drop="ondrop">
                <p>内容</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
        ondragstart(){
            console.log('ondragstart')
            //dataTransfer.setData()方法设置数据类型和拖动的数据
            let obj = {
                id: "oneP",
                name: 'df',
                age: 10
            }
            let str = 'oneP'
            event.dataTransfer.setData("Text", str);
            // 拖动 p 元素时输出一些文本
            // document.getElementById("demo").innerHTML = "开始拖动 p 元素.";
            //修改拖动元素的透明度
            event.target.style.opacity = "0.4";
        },
        ondrag(){
            console.log('ondrag')
            event.preventDefault();
        },
        ondragend(){
            console.log('ondragend')
        },
        ondragenter(){
            console.log('ondragenter')
            if ( event.target.className == "droptarget" ) {
                event.target.style.border = "3px dotted red";
            }
        },
        ondragover(){
            console.log('ondragover')
            event.preventDefault();
        },
        ondragleave(){
            console.log('ondragleave')
            if ( event.target.className == "droptarget" ) {
                event.target.style.border = "1px solid #ccc";
            }
        },
        ondrop(){
            console.log('ondrop')
            event.preventDefault();
            if ( event.target.className == "droptarget" ) {
                // document.getElementById("demo").style.color = "";
                event.target.style.border = "";
                var data = event.dataTransfer.getData("Text");
                console.log('data:',data)
                event.target.appendChild(document.getElementById(data));
            }
        },
        handleDragStart(node, ev) {
            console.log('drag start', node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
            console.log('tree drag enter: ', dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
            console.log('tree drag leave: ', dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
            console.log('tree drag over: ', dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
            return type !== 'inner';
            } else {
            return true;
            }
        },
        allowDrag(draggingNode) {
            return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
        }
    }
  };
</script>