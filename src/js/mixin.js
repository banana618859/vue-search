/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-22 15:20:25
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-01-16 16:41:48
 */

export default {
  computed: {
        
      loginAndPro() {
          if (this.userInfo && this.currentProject) {
              return true;
          } else {
              return false;
         }
      },
  },
  methods: {
    getCostTime(startTime, endTime) {
        if (!startTime || !endTime) {
          return '0m0s0ms'
        }
        if (startTime === 0 || endTime === 0) {
          return '0m0s0ms'
        }
        if (startTime >= endTime) {
          return '0m0s0ms'
        }
        var minutes = Math.floor((endTime - startTime) / (60 * 1000));
        if(minutes==0){
          minutes='00'
        }else if(minutes<10){
          minutes='0'+minutes;
        }
        var leaves = (endTime - startTime) % (60 * 1000)
        var seconds = Math.floor(leaves / 1000)
        if(seconds==0){
          seconds='00'
        }else if(seconds<10){
          seconds='0'+seconds;
        }
    
        var mseconds = Math.floor(leaves % 1000)
        if(mseconds==0){
          mseconds='000'
        }
        return minutes + ':' + seconds + ':' + mseconds
      },
        sleep(delay){
            return new Promise((res)=>{
                let timer = setTimeout(()=>{
                    window.clearTimeout(timer);
                    res()
                },delay)
            })
        },
      myMsg(theText, theType) {

    //     let obj={
    //         oldValue: 1,
    //         newValue: 2,
    //         rowObj:{
    //             Id: 1,
    //             breakPoint: false
    //         },
    //         colName: 'Id'
    //     }
        
    //    console.log(obj)

          let text = theText;
          // 中英文转化
          let hasMidPoint = theText.indexOf('.');
          if (hasMidPoint > 0) {
              // 需要翻译
              text = Languages.t(theText)
          }
          this.$message({
              message: text,
              type: theType
          })
      },
      dealRel(err, rel) {
          console.log('dealRel-back-err,rel:', err, rel);
          if (!err && rel.error == 0) {
              return rel;
          } else {
              console.log('err:', err)
              return false;
          }
      },
      answerFun(tipText) {
          // 提示函数
          return new Promise((resolve, reject) => {
              this.$confirm(
                      Languages.t(tipText),
                      Languages.t('Common.tipTitle'), {
                          confirmButtonText: Languages.t('Common.ok'),
                          cancelButtonText: Languages.t('Common.cancel'),
                          type: "warning"
                      })
                  .then(async () => {
                      resolve(true);
                  })
                  .catch(() => {
                      resolve(false);
                  });
          })
      },
      sameStepData(userId, projectId) {
          return new Promise((resolve, reject) => {
              Meteor.call('synchronismTcTpData', userId, projectId, (err, rel) => {
                  let backRel = this.dealRel(err, rel);
                  if (backRel) {
                      // 通知父组件，数据同步完成
                      this.$emit('sameStepData');
                      resolve()
                      // this.myMsg('同步数据成功！','success')
                  } else {
                      reject()
                      this.myMsg('同步数据失败！', 'error')
                  }
              })
          })
      },
      getChannel() {
          let projectId = this.currentProject._id;
          let userId = this.userInfo._id;
          console.log('projectId:', projectId)
          Meteor.call('getChannelInfo', userId, projectId, (error, result) => {
              console.log('error,result-getMyDut', error, result);
              if (error || result.error > 0) {
                  console.log('error:', error, result)
              } else {
                  // 保存到vuex里面
                  for (let i = 0; i < result.length; i++) {
                      result[i]['runTime'] = {
                          passCount: 0,
                          failCount: 0
                      }
                  }
                  this.$store.commit('saveAllChannel', result)
              }
          })
      },
      getMyTc() {
          return new Promise((res, rej) => {
              if (!this.userInfo || !this.currentProject) {
                  this.myMsg("Common.newOrOpenProject", "warning");
                  return;
              }
              let userId = this.userInfo._id;
              let projectId = this.currentProject._id;

              Meteor.call("getMyTestCase", userId, projectId, (error, result) => {
                  console.log("error,result-tcall", error, result);
                  if (error || result.error > 1) {
                      rej(false)
                  }
                  // 存储到vuex里面
                  let tcNameArr = [];
                  for (let i = 0; i < result.data.length; i++) {
                      let oneTc = result.data[i];
                      tcNameArr.push(oneTc.kindName + "." + oneTc.name);
                  }
                  this.$store.commit("saveTcNameArr", tcNameArr);
                  res(true)
                  // this.$store.commit("saveTcArr", result.data);
              })
          })
      }
  }
}