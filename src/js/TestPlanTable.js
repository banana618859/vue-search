/*
 * @Descripttion: Test plan
 * @Author: liang
 * @Date: 2019-11
 */

export var TestPlanTable = {
    /**
     * @description 打开本地文件夹，选中文件后添加到表格中
     * @param
     * @参数
     * xTable  表格对象
     * row   当前行
     * data  数据
     */
    impotEvent:function(xTable,row,data){
        const _this = this;
        var chooser = document.querySelector('#impot_Event');
        chooser.addEventListener("change", function (evt) {
            var files = this.files;
            for (var i = 0; i < files.length; ++i){
                _this.groupName=files[i].name;
                const item = {
                    name:files[i].name,
                    filePath:files[i].path
                }
                _this.insertAtEvent(xTable,row,data);
            }
            chooser.remove();
        }, false);
    },

    /**
     * @description 打开CSV文件表头和固定表头匹配处理
     * @param
     * @参数
     * tableData  表格数据
     */
    next_id(tableData){
      console.log('tableData',tableData)
        if (!tableData) {
            return false
        }

        let rowId =1;
        tableData.forEach(function (item) {
            if(item.children){
                let rowIdArr=[];
                item.children.forEach(function (items) {
                    items.Id=rowId;
                    rowId ++;
                    rowIdArr.push(items.Id);
                    return
                })
                //统计
                rowIdArr.sort(function (a, b) {
                    return a-b;
                });
                item.Id=rowIdArr[0] + " ~ " + rowIdArr[rowIdArr.length-1];
            }else {
                item.Id=rowId;
                rowId ++;
            }
        })
        return true;
    },
}
