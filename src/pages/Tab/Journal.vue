<template>
  <div class="q-pa-md">
    <q-list class="q-gutter-sm">
      <q-item v-for="(journal) in journals" :key="journal.id">
        <journal-item admin :journal="journal" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import JournalItem from './../../components/JournalItem'
import Journal from './../../models/Journal'
import { date } from 'quasar'

export default {
  data() {
    return {
      date: date,
      form: []
    }
  },

  computed: {
    journals() {
      return Journal.query().withAll().get()
    }
  },

  created() {
    this.$store.dispatch('GetAllJournals')
  },

  components: {
    JournalItem
  },

  methods: {

  }
}
</script>
