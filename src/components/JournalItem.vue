<template>
  <q-card style="min-width: 100%">
    <q-item>
      <q-item-section avatar class="q-py-sm">
        <q-icon v-if="journal.category === 'Personal'" name="fas fa-smile" color="positive" />
        <q-icon v-if="journal.category === 'Wishlist'" name="fas fa-star" color="warning" />
        <q-icon v-if="journal.category === 'Project'" name="fas fa-folder-open" color="positive" />
      </q-item-section>

      <q-item-section v-if="admin">
        <q-item-label header class="row justify-between justify-center">
          <div class="q-gutter-sm">
            <!-- <q-badge class="on-left" v-if="journal.status === 'updated'" transparent color="orange">
              {{ journal.status }}
            </q-badge> -->
            <q-item-label class="text-weight-bold"><user-popup popup :id="journal.userId" :username="journal.user ? journal.user.name : ''" /></q-item-label>
            <q-item-label class="text-capitalize text-caption">{{ date.formatDate(journal.updatedAt, 'DD MMM YYYY HH:mm A') }}
              <q-badge class="on-left" v-if="journal.status === 'updated'" transparent color="orange">
                Edited
              </q-badge>
            </q-item-label>
            <q-item-label class="text-capitalize text-caption">{{ journal.category }}</q-item-label>
          </div>
        </q-item-label>
      </q-item-section>

      <q-item-section v-else>
        <q-item-label header class="row justify-between justify-center">
          <div class="q-gutter-sm">
            <q-item-label class="text-weight-bold text-capitalize">{{ journal.category }}</q-item-label>
            <q-item-label class="text-capitalize text-caption">{{ date.formatDate(journal.updatedAt, 'DD MMM YYYY HH:mm A') }}</q-item-label>
          </div>
          <q-btn color="blue" icon="fas fa-edit" label="Edit" @click="onClickEditJournal()" />
        </q-item-label>
      </q-item-section>

      <!-- Review button & discuss button -->
      <q-item-section v-if="admin">
        <div class="row justify-end q-gutter-sm text-grey">
          <q-btn flat round :class="{ 'text-warning': journal.status === 'discuss' }" icon="fas fa-user-secret" @click="onClickUpdateStatusDiscuss()" />
          <q-btn flat round :class="{ 'text-positive': journal.status === 'review' }" icon="fas fa-check" @click="onClickUpdateStatusReviewed()" />
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

    <!-- Dialog Edit Journal -->
    <q-dialog v-model="editJournal" persistent>
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white text-h6">
          <q-item-label>Edit Journal</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">
          <div class="col-12">
            <q-select 
              filled
              v-model="journalForm.category" 
              emit-value 
              :options="options"
              label="Category" />
          </div>
          <div class="col-12">
            <q-editor 
              v-model="journalForm.detail"
              min-height="5rem"
              :toolbar="[]"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="CLOSE" v-close-popup />
          <q-btn flat label="CONFIRM" @click="onClickUpdateJournal()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog if edited journal successfully updated -->
    <q-dialog v-model="updatedAlert">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Successfully Updated</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Journal is successfully updated.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
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

      journalForm: {
        detail: '',
        category: ''
      },

      dialog: {
        show: false
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

      progress: false,
      editJournal: false,
      updatedAlert: false
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

    onClickEditJournal() {
      // populate data
      this.journalForm.detail = this.journal.detail
      this.journalForm.category = this.journal.category
      this.editJournal = true
    },

    onClickUpdateJournal() {
      if(!this.journal) {
        return
      }

      let editedJournal = {}
      editedJournal.journalId = this.journal.id
      editedJournal.detail = this.journalForm.detail
      editedJournal.category = this.journalForm.category
      editedJournal.updatedAt = Date.now

      this.progress = true

      this.$store.dispatch('UpdateJournal', editedJournal)
        .then(res => {
          this.progress = false
          this.editJournal = false
          this.updatedAlert = true
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
    },

    onClickUpdateStatusDiscuss() {
      if(!this.journal) {
        return
      }

      this.$store.dispatch('UpdateStatusDiscuss', this.journal)
        .then(res => {
          this.updatedAlert = true
        })
        .catch(err => {
          console.log(err);
        })
    },

    onClickUpdateStatusReviewed() {
      if(!this.journal) {
        return
      }
      
      this.$store.dispatch('UpdateStatusReviewed', this.journal)
        .then(res => {
          this.updatedAlert = true
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
}
</script>