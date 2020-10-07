<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Track" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-lg row justify-center q-gutter-sm">
      <div class="col-md-4" v-for="(track, index) in alltracks" :key="index">
        <q-card flat bordered class="track-card" @click="goToSingleTrack(track.id)">
          <q-card-section horizontal>
            <q-card-section>
              <q-avatar color="accent" text-color="white" />   
            </q-card-section>
            <q-card-section>
              <div class="text-h4 q-mb-xs">{{ track.title }}</div>
              <q-badge color="grey">
                {{ track.totalProjects }} Projects
              </q-badge>
            </q-card-section>       
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
import Track from './../models/Track'

export default {
  data() {
    return {
    }
  },

  computed: {
    alltracks() {
      return Track.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllTracks')
  },

  methods: {
    goToSingleTrack(id) {
      this.$router.push({ path: `/track/${id}` })
    }
  },
}
</script>

<style>
.track-card {
  width: 
}
</style>