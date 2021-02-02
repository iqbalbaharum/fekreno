import Vue from 'vue'
import Vuex from 'vuex'

import services from '../services/serviceFactory'

Vue.prototype.$services = services
Vuex.Store.prototype.$services = services
