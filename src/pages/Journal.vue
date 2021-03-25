<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Journals" />
      </q-breadcrumbs>
    </div>
    
    <!-- Journal Tab -->
    <div class="q-pa-md row justify-end">
      <q-tabs
        v-model="tab"
        class="bg-blue-grey-1 text-teal"
        active-color="primary"
        indicator-color="primary"
        align="left"
        flat
      >
        <q-tab name="alljournal" label="All Journals" color="primary" />
        <q-tab name="unreviewedjournal" label="Unreviewed Journal" color="primary" />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated class="q-mt-lg">
      <q-tab-panel name="alljournal" class="q-pa-none">
        <allJournal-tab/>
      </q-tab-panel>
      <q-tab-panel name="unreviewedjournal" class="q-pa-none">
        <unreviewedJournal-tab/>
      </q-tab-panel>
    </q-tab-panels> 

    <!-- <unreviewedJournal-tab/> -->
    <!-- <allJournal-tab/> -->

    <!-- testing div -->
    <!-- <div class="q-gutter-y-md" style="max-width: 350px">
      <q-option-group
        v-model="panel"
        inline
        :options="[
          { label: 'Mails', value: 'mails' },
          { label: 'Alarms', value: 'alarms' },
          { label: 'Movies', value: 'movies' }
        ]"
      />

      <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="mails">
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div> -->
  </div>
</template>

<script>
import AllJournalTab from './Tab/AllJournal'
import UnreviewedJournalTab from './Tab/Journal'

export default {
  data() {
    return {
      // declare what tab that will be displayed first
      tab: 'unreviewedjournal'
    }
  },

  computed: {
  },

  created() {
  },

  components: {
    AllJournalTab,
    UnreviewedJournalTab
  },

  methods: {
  }
}
</script>
