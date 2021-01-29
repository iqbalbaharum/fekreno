<template>
  <q-card style="min-width: 100%">
    <q-item>
      <q-item-section avatar class="q-py-sm">
        <q-icon v-if="journal.category === 'Personal'" name="fas fa-smile" color="positive" />
        <q-icon v-if="journal.category === 'Wishlist'" name="fas fa-star" color="warning" />
        <q-icon v-if="journal.category === 'Project'" name="fas fa-folder-open" color="positive" />
      </q-item-section>

      <q-item-section v-if="admin">
        <q-item-label class="text-weight-bold"><user-popup popup :id="journal.userId" :username="journal.user ? journal.user.name : ''" /></q-item-label>
        <q-item-label class="text-capitalize text-caption">{{ date.formatDate(journal.createdAt, 'DD MMM YYYY HH:mm A') }}</q-item-label>
        <q-item-label class="text-capitalize text-caption">{{ journal.category }}</q-item-label>
      </q-item-section>

      <q-item-section v-else>
        <q-item-label class="text-weight-bold text-capitalize">{{ journal.category }}</q-item-label>
        <q-item-label class="text-capitalize text-caption">{{ date.formatDate(journal.createdAt, 'DD MMM YYYY HH:mm A') }}</q-item-label>
      </q-item-section>

      <q-item-section v-if="admin">
        <div class="row justify-end q-gutter-sm text-grey">
          <q-btn flat round :class="{ 'text-warning': journal.status === 'discuss' }" icon="fas fa-user-secret" @click="onClickUpdateStatus('discuss')" />
          <q-btn flat round :class="{ 'text-positive': journal.status === 'review' }" icon="fas fa-check"  @click="onClickUpdateStatus('review')" />
        </div>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal class="q-mb-lg">
      <q-card-section v-html="journal.detail">
      </q-card-section>
    </q-card-section>

    <q-card-section>
      <q-list>
        <q-item-label header class="text-grey row justify-between justify-center">
          <div class="q-gutter-sm">
            <span class="text-weight-bold">Discussion</span>
            <q-badge color="grey" text-color="white" :label="journal.comments.length" /> 
          </div>
          <q-btn flat dense size="sm" icon="fas fa-plus" label="comment" @click="onClickAddComment" />
          <q-separator class="q-mt-sm" />
        </q-item-label>

        <template v-if="journal.comments.length > 0">
          <q-item class="q-pa-md" v-for="(comment) in journal.comments" :key="comment.id">
            <!-- <q-item-section top avatar>
              <q-avatar color="primary" />
            </q-item-section> -->

            <q-item-section>
              <q-item-label>
                <user-popup class="text-weight-bold text-primary" :id="comment.userId" />
                <q-item-label caption>{{ date.formatDate(comment.createdAt, 'DD MMM YYYY HH:MM A') }}</q-item-label>
              </q-item-label>
              <q-item-label v-html="comment.comment" />
            </q-item-section>
            
            <q-item-section side top class="text-caption">
              {{ date.formatDate(journal.createdAt, 'DD MMM YYYY') }}
            </q-item-section>
            
          </q-item>
        </template>
      </q-list>
    </q-card-section>

    <q-card-section class="bg-yellow-1" v-if="dialog.show">
      <q-editor 
        v-model="form.comment"
        min-height="6rem"
        :toolbar="[]"
      />
      <q-btn :loading="progress" class="flex items-end q-mt-sm" color="primary" text-color="white" label="Post Comment" @click="onClickPost">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>
    </q-card-section>
    
  </q-card>
</template>

<script>
import UserPopup from './UserPopup'
import { date } from 'quasar'

export default {
  data() {
    return {
      date: date,
      form: {
        journalId: '',
        comment: ''
      },
      dialog: {
        show: false
      },
      progress: false
    }
  },

  components: {
    UserPopup
  },

  props: {
    journal: {
      type: Object
    },
    admin: {
      type: Boolean
    }
  },

  methods: {
    onClickAddComment() {
      this.dialog.show = true
    },

    onClickPost() {
      if(!this.journal) {
        return
      }

      this.progress = true

      this.form.journalId = this.journal.id
      this.$store.dispatch('AddJournalComment', this.form)
        .then(res => {
          this.progress = false
          this.dialog.show = false
        })
        .catch(res => {
          this.progress = false
        })
        
    },

    onClickUpdateStatus(status) {
      if(!this.journal) {
        return
      }

      let dt = {}
      dt.journalId = this.journal.id
      dt.status = status

      this.progress = true
      this.$store.dispatch('UpdateJournal', dt)
        .then(res => {
          this.progress = false
        })
        .catch(res => {
          this.progress = false
        })
    }
  },
}
</script>