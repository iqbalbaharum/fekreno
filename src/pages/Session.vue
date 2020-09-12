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

    <div v-if="data.tabs === 'session'" class="flex flex-center">
 
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        tabs: 'session'
      },
    }
  },
}
</script>
