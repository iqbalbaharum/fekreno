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
          <q-btn flat icon="fas fa-bell" dense round color="white" @click="onHandleClickNotifications">
            <q-badge color="orange" floating v-if="notifications.length > 0">{{ notifications.length }}</q-badge>
          </q-btn>
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

    <q-drawer
        side="right"
        v-model="rightDrawerOpen"
        overlay
        bordered
        :width="300"
        content-class="bg-grey-1"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <notification-component />
          </div>
        </q-scroll-area>
      </q-drawer>

    <q-page-container style="background-color: #fafafa;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Sidebar from './Sidebar'
import Notification from 'src/models/Notification'
import NotificationComponent from 'src/components/Notification'

export default {
  name: 'MainLayout',
  components: { Sidebar, NotificationComponent },
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    }
  },

  computed: {
    notifications() {
      return Notification.query().get()
    }
  },

  created() {
    this.$store.dispatch('GetUserNotifications')
  },

  methods: {
    onClickLogout() {
      this.$store.dispatch('Logout')
      this.$router.push('/login')
    },
    onHandleClickNotifications() {
      this.rightDrawerOpen = !this.rightDrawerOpen
    }
  },
}
</script>
