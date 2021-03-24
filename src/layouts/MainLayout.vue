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
          <q-btn flat class="text-white" @click="onClickLogout">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
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

export default {
  name: 'MainLayout',
  components: { Sidebar },
  data () {
    return {
      leftDrawerOpen: false
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
