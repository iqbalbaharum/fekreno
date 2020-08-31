import Vue from 'vue'
import Vuex from 'vuex'

import repository from '../repositories/RepositoryFactory'

Vue.prototype.$repository = repository
Vuex.Store.prototype.$repository = repository
