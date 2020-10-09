<template>
  <div>
    <q-btn round flat size="xs" icon="fas fa-user" color="grey">
      <q-menu>
        <div class="bg-primary text-white row no-wrap q-pa-md">
          <div class="column">
            <div class="text-weight-bold">{{ user.name }}</div>
            <div class="text-caption">{{ user.email }}</div>
            <div class="text-caption">{{ user.mobile }}</div>
          </div>
        </div>
      </q-menu>
    </q-btn> {{ username }}
  </div>
</template>

<script>
import User from './../models/User'

export default {
  data() {
    return {
      
    }
  },

  computed: {
    user() {
      return User.find(this.id)
    }
  },

  props: {
    id: {
      type: String
    },
    username: {
      type: String
    }
  }
}
</script>