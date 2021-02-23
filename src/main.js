/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-08-16 11:54:01
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-01-28 09:11:40
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

import theAxios from 'axios';
Vue.prototype.$theAxios = theAxios;

import $ from 'jquery';
window.$ = $;

//vue 全局混入
import mixin from './js/mixin'
Vue.mixin(mixin)
window.mixin = mixin;



// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
    }
})

// vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXETable)

new Vue({
  el: '#app',
  render: h => h(App)
})
