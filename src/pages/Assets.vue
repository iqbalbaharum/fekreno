<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Asset Management" />
        <q-breadcrumbs-el label="Zone" v-if="data.tabs === 'zone'" />
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
          <q-tab name="zone" label="Zones" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'zone'" class="flex flex-center">
      <zone-box />
    </div>

  </div>
</template>

<script>
import ZoneBox from './Tab/Zone'

export default {
  data() {
    return {
      data: {
        tabs: 'zone'
      },
    }
  },

  computed: {
  },

  created() {
  },

  components: {
    ZoneBox,
  },

  methods: {
  }
}
</script>
