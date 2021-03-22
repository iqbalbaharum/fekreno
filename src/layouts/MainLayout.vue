<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          
        </q-toolbar-title>

        <div>
          <q-btn flat class="text-white" v-if="isHide === false" @click="onClickLogout">Logout</q-btn>
          <q-btn flat class="text-white" v-if="isHide === true" to="/login">Sign In</q-btn>
          <q-btn flat class="text-white" v-if="isHide === true" to="/register">Register</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <sidebar />
    </q-drawer>

    <q-page-container style="background-color: #fafafa;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Sidebar from './Sidebar'
import { getToken } from 'src/datasources/localstorage.storage';

export default {
  name: 'MainLayout',
  components: { Sidebar },
  data () {
    return {
      leftDrawerOpen: false,
      isHide: null
    }
  },

  // will be processed first in vuejs without calling any method
  created() {
    if(getToken(process.env.MAIN_BE_TOKEN)) {
      this.isHide = false
    } else {
      this.isHide = true
    }
  },

  methods: {
    onClickLogout() {
      this.$store.dispatch('Logout')
      this.$router.push('/login')
    }
  },
}
</script>
