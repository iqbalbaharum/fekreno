<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Track" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-lg row item-start q-gutter-md">
      <q-card @click="goToSingleTrack(track.id)" class="track-card" v-for="(track, index) in alltracks" :key="index">
        <q-img :src="track.icon" style="max-width: 200px; height: 200px;" />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ track.title }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey" style="min-height: 20px;">
            {{ track.description }}
          </div>
        </q-card-section>
      </q-card>
      <!-- <q-card flat bordered class="track-card" @click="goToSingleTrack(track.id)">
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
      </q-card> -->
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

<style lang="scss" scoped>
.track-card {
  width: 100%;
  max-width: 250px;
  cursor: pointer;
}

</style>