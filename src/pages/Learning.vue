<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Learning Management" />
        <q-breadcrumbs-el label="Track" v-if="data.tabs === 'track'" />
        <q-breadcrumbs-el label="Project" v-if="data.tabs === 'project'" />
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
          <q-tab name="track" label="Tracks" />
          <q-tab name="project" label="Projects" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'track'" class="flex flex-center">
      <track-box />
    </div>

    <div v-if="data.tabs === 'project'" class="flex flex-center">
      <project-box />
    </div>

  </div>
</template>

<script>
import TrackBox from './Tab/Track'
import ProjectBox from './Tab/Project'

export default {
  data() {
    return {
      data: {
        tabs: 'track'
      },
    }
  },

  computed: {
  },

  created() {
  },

  components: {
    TrackBox,
    ProjectBox
  },

  methods: {
  }
}
</script>
