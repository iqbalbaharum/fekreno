<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Journals" />
      </q-breadcrumbs>
    </div>
    
    <journal-box />

  </div>
</template>

<script>
import JournalBox from './Tab/Journal'

export default {
  data() {
    return {
    }
  },

  computed: {
  },

  created() {
  },

  components: {
    JournalBox
  },

  methods: {
  }
}
</script>
