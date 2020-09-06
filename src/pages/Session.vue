<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Session Management" />
        <q-breadcrumbs-el label="Session" v-if="data.tabs === 'session'" />
        <q-breadcrumbs-el label="Templates" v-if="data.tabs === 'templates'" />
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
          <q-tab name="session" label="Session" />
          <q-tab name="templates" label="Templates" />
        </q-tabs>
      </div>
    </div>

    <div class="flex flex-center">
      <databox 
        title="PWA Sessions" 
        :crud="['delete', 'read']" 
        :editablescol="['session']"
        :rows="sessions" 
        :columns="columns" 
      >
        <template v-slot:create-dialog-body>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input outlined v-model="text" label="Outlined" />
            </div>
            <div class="col">
              <q-input outlined v-model="text" label="Outlined" />
            </div>
            <div class="col">
              <q-input outlined v-model="text" label="Outlined" />
            </div>
          </div>
        </template>

      </databox>
    </div>

  </div>
</template>

<script>
import Databox from '../components/Databox'
import Session from './../models/Session'

export default {
  data() {
    return {
      data: {
        tabs: 'session'
      },
      columns: [
        { name: 'session', align: 'left', label: 'Session', field: 'uuid', sortable: true },
        { name: 'user', align: 'center', label: 'User', field: 'user', sortable: true },
        { name: 'signedInAt', align: 'center', label: 'Signed In', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ]
    }
  },

  computed: {
    sessions() {
      return Session.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllSessions')
  },

  components: {
    Databox
  }
}
</script>
