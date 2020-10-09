<template>
  <div class="q-pa-md">
    <q-list class="q-gutter-sm">
      <q-item v-for="(journal) in journals" :key="journal.id">
        <q-card style="min-width: 100%">
          <q-item>
            <q-item-section avatar class="q-py-sm">
              <q-icon v-if="journal.category === 'Personal'" name="fas fa-user" color="accent" />
              <q-icon v-if="journal.category === 'Wishlist'" name="fas fa-star" color="warning" />
              <q-icon v-if="journal.category === 'Project'" name="fas fa-folder-open" color="positive" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold"><user-popup :id="journal.userId" :username="journal.user ? journal.user.name : ''" /></q-item-label>
              <q-item-label class="text-capitalize text-caption">{{ journal.category }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-section horizontal>
            <q-card-section>
              {{ journal.detail }}
            </q-card-section>
          </q-card-section>

          <q-card-section>
            <q-item-label caption>
              {{ date.formatDate(journal.createdAt, 'DD MMM YYYY HH:MM A') }}
            </q-item-label>
          </q-card-section>
          
        </q-card>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import Journal from './../../models/Journal'
import { date } from 'quasar'
import UserPopup from '../../components/UserPopup'

export default {
  data() {
    return {
      date: date
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
    UserPopup
  },

  methods: {

  }
}
</script>
