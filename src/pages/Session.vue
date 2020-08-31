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
        :crud="['delete', 'read', 'create', 'update']" 
        :editablescol="['session']"
        :rows="rows" 
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

export default {
  data() {
    return {
      data: {
        tabs: 'session'
      },
      rows: [
        {
          session: 'Iqbal',
          createdAt: '28 Day',
          signedInAt: '2 days ago',
          action: ''
        }
      ],
      columns: [
        { name: 'session', align: 'left', label: 'Session', field: 'session', sortable: true },
        { name: 'createdAt', align: 'center', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'signedInAt', align: 'center', label: 'Signed In', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ]
    }
  },

  components: {
    Databox
  }
}
</script>
