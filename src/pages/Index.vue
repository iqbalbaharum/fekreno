<template>
  <q-page class="flex q-pa-md">
    <div class="full-width row wrap justify-center items-start content-start">
      <div class="col-10 bg-accent">
        <q-card>
          <q-tabs
            v-model="tab"
            class="bg-blue-grey-1"
            active-color="black"
            indicator-color="black"
            align="start"
          >
            <q-tab name="overview" label="Overview" />
            <q-tab name="journal" label="Journal" />
            <q-tab name="progress" label="Progress" />
            <q-tab name="profile" label="Profile" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            
            <q-tab-panel name="overview">
              <overview-tab />
            </q-tab-panel>

            <q-tab-panel name="profile">
              <profile-tab />
            </q-tab-panel>

            <q-tab-panel name="journal">
              <journal-tab />
            </q-tab-panel>

            <q-tab-panel name="progress">
              <track-tab />
            </q-tab-panel>

          </q-tab-panels>

        </q-card>
      </div>
    </div>


  </q-page>
</template>

<script>
import OverviewTab from './User/Overview'
import ProfileTab from './User/Profile'
import JournalTab from './User/Journal'
import TrackTab from './User/UserTrack'

export default {
  name: 'PageIndex',
  data() {
    return {
      tab: 'overview'
    }
  },

  components: {
    OverviewTab,
    ProfileTab,
    JournalTab,
    TrackTab
  }
}
</script>
