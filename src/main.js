import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery';

import theAxios from 'axios';

Vue.prototype.$theAxios = theAxios;

new Vue({
  el: '#app',
  render: h => h(App)
})
