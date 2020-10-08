<template>
  <div>
    <q-list separator>
      <q-item clickable :to="`/track/${track.id}`" v-for="(track) in tracks" :key="track.id">
        <q-item-section avatar>
          <q-icon name="account_tree" color="warning" />
        </q-item-section>

        <q-item-section class="col-4">
          <q-item-label>{{ track.title }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label caption>
            Joined {{ date.formatDate(track.createdAt, 'DD MMM YYYY HH:MM A') }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label class="text-subtitles">0/12</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import UserTrack from './../../models/UserTrack'
import { date } from 'quasar'

export default {
  data() {
    return {
      date: date,
      form: {
        type: ''
      },

      options: [
        {
          label: 'Personal',
          value: 'personal'
        },
        {
          label: 'Wishlist',
          value: 'wishlist'
        }
      ],

      dialog: {
        show: false
      }
    }
  },

  computed: {
    tracks() {
      return UserTrack.query().withAll().get()
    }
  },

  created() {
    this.$store.dispatch('GetUserTrack')
  },

  methods: {
  },
}
</script>