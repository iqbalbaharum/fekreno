import { getToken, setToken, removeToken } from './../../datasources/localstorage.storage'
import User from './../../models/User'
import UserRole from './../../models/UserRole'
import Journal from './../../models/Journal'
import Repository from './../../models/Repository'
import UserProfile from './../../models/UserProfile'
import UserApplication from './../../models/UserApplication'

const user = {
  state: {
    token: getToken(process.env.MAIN_BE_TOKEN),
    roles: [],
    session: '',
    userId: '',
    email: '',
    mobile: '',
    name: '',
    avatar: 'https://cdn.quasar.dev/img/avatar.png'
  },

  mutations: {
    LOGIN: (state, token) => {
      state.token = token
      setToken(process.env.MAIN_BE_TOKEN, token)
    },

    LOGOUT: (state) => {
      state.token = ''
      removeToken(process.env.MAIN_BE_TOKEN)
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_SESSION: (state, session) => {
      state.session = session
    },

    SET_USER: (state, userId) => {
      state.userId = userId
    },

    SET_EMAIL: (state, data) => {
      state.email = data
    },

    SET_MOBILE: (state, data) => {
      state.mobile = data
    },

    SET_NAME: (state, data) => {
      state.name = data
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this.$repository.user.login(userInfo.email, userInfo.password)
          .then(res => {
            const token = res.data.token
            commit('LOGIN', token)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })

      })
    },

    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getInfo()
          .then(res => {
            const data = res.data
            commit('SET_ROLES', data.roles)
            commit('SET_SESSION', data.session)
            commit('SET_USER', data.user)
            commit('SET_NAME', data.name)
            commit('SET_EMAIL', data.email)
            commit('SET_MOBILE', data.mobile)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    Logout ({ commit }) {
      return new Promise((resolve) => {
        this.$repository.user.logout()
        commit('SET_ROLES', [])
        commit('SET_SESSION', '')
        commit('SET_USER', '')
        commit('SET_NAME', '')
        commit('SET_EMAIL', '')
        commit('SET_MOBILE', '')
        commit('LOGOUT')
        resolve()
      })
    },

    GetAllUsers() {
      return new Promise((resolve, reject) => {
        this.$repository.user.listing()
          .then(res => {
            User.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    GetUserByID({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getById(id)
          .then(res => {
            User.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    RegisterUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
            User.insert({ data: res.data })
            dispatch('GetAllUsers')
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    RegisterIndividual({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.register(data)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    DeleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.delete(id)
          .then(res => {
            resolve(res)
            User.delete(id)
            dispatch('GetAllUsers')
          })
          .catch(err => {
            reject(err)
          })
      })

    },

    async GetUserRoles({ commit }, id) {
      let res = await this.$repository.user.getUserRoles(id)
      const data = res.data

      for (let role of data) {
        await UserRole.create({
          data: {
            roleId: role.uuid,
            userId: id
          }
        })
      }

      return res.data
    },

    async GetUserApplications({ commit }) {
      let filter = {
        include: { relation: 'application' }
      }
      let res = await this.$repository.user.getUserApplications(filter)
      const data = res.data
      UserApplication.insert({ data: res.data })

      return res.data
    },

    async GetUserJournal({ commit, rootState }) {
      return new Promise((resolve, reject) => {

        let filter = {
          order: ['createdAt DESC'],
          include: [
            {
              relation: 'comments',
              include: [{ relation: 'user' }]
            }
          ]
        }

        this.$repository.user.getUserJournal(rootState.user.userId, filter)
          .then(res => {
            // clear table
            Journal.deleteAll()
            // insert
            Journal.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async GetUserRepositories({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        let filter = {
          order: ['createdAt DESC'],
          include: [
            {
              relation: 'project',
            },
            {
              relation: 'devEnvironment',
            },
            {
              relation: 'position',
            }
          ]
        }

        this.$repository.user.getUserRepositories(rootState.user.userId, filter)
          .then(res => {
            // insert
            Repository.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async GetUserProfile({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getUserProfile(rootState.user.userId)
          .then(res => {
            UserProfile.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async GetUserProfileById({ commit }, id) {
      return new Promise((resolve, reject) => {
        this.$repository.user.getUserProfile(id)
          .then(res => {
            UserProfile.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    async AssignUserRole({ commit }, data) {
      let res = await this.$repository.user.assignUserRoles(data.userId, data.roleId)
      return res.data
    },

    async UnassignUserRole({ commit }, data) {
      let res = await this.$repository.user.unassignUserRoles(data.userId, data.roleId)
      return res.data
    },

    ApplyUserApplication({ commit }, data) {
      return new Promise((resolve, reject) => {
        this.$repository.user.applyUserApplication(data.applicationId)
          .then(res => {
            UserApplication.insert({ data: res.data })
            resolve(res.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },


    async UnapplyUserApplication({ commit }, data) {
      let res = await this.$repository.user.unapplyUserApplication(data.applicationId)
      return res.data
    },

    async UpdateUserProfile({ commit, rootState }, data) {
      return new Promise((resolve, reject) => {
      this.$repository.user.updateUserProfile(rootState.user.userId, data)
        .then(res => {
          UserProfile.update({ where: rootState.user.userId, data: data })
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}

export default user
