<template>
  <div>
    <q-list separator>
      <q-item clickable :to="`/track/${track.id}`" v-for="(track) in tracks" :key="track.id">
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ track.title }}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span>{{ track.description }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{ track.createdAt }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import UserTrack from './../../models/UserTrack'

export default {
  data() {
    return {
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