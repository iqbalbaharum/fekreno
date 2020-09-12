<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="User Management" />
        <q-breadcrumbs-el label="List" v-if="data.tabs === 'list'" />
        <q-breadcrumbs-el label="User Session" v-if="data.tabs === 'session'" />
        <q-breadcrumbs-el label="Role" v-if="data.tabs === 'role'" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-tabs
          narrow-indicator
          dense
          align="left"
          v-model="data.tabs"
          class="text-primary"
        >
          <q-tab name="list" label="Users" />
          <q-tab name="session" label="Session" />
          <q-tab name="role" label="Roles" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'list'" class="flex flex-center">
      <userbox />
    </div>

    <div v-if="data.tabs === 'session'" class="flex flex-center">
      <user-sessionbox />
    </div>

    <div v-if="data.tabs === 'role'" class="flex flex-center">
      <rolebox />
    </div>

  </div>
</template>

<script>
import Rolebox from './Tab/Role'
import Userbox from './Tab/User'
import UserSessionbox from './Tab/UserSession'

export default {
  data() {
    return {
      data: {
        tabs: 'list'
      },
    }
  },

  components: {
    Rolebox,
    Userbox,
    UserSessionbox,
  },
}
</script>
