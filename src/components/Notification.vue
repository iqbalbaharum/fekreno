<template>
  <q-list class="q-gutter-y-sm">
    <q-item class="bg-white justify-center items-center" v-if="notifications.length <= 0">
      No notifications to display
    </q-item>
    <q-item clickable class="rounded-borders" v-else v-for="(notify, index) in notifications" :key="index" @click="onHandleNotificationClick(notify)">
      <q-item-section avatar>
        <q-avatar color="red">H</q-avatar>
      </q-item-section>
      <q-item-section>
        <div><span v-html="notify.message" /></div>
        <div class="text-blue text-caption">1 week ago</div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import Notification from 'src/models/Notification'

export default {
  data() {
    return {
      
    }
  },

  computed: {
    notifications() {
      return Notification.query().get()
    }
  },

  methods: {
    onHandleNotificationClick(notify) {
      switch(notify.type) {
        case 'TOPIC':
          this.$router.push({ path: `/general/${notify.refId}` })
          break;  
      }
    }
  }
}
</script>