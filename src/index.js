'use strict';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

new Vue({
    el: '#app',
    router: router,
    store: store,
    components:{ App },
    template:'<App/>'
})
