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
              <div class="row justify-between justify-center">
          <div>
                      <q-item-label 
              class="text-weight-bold text-capitalize">
                {{ journal.category }}
                <q-badge 
                  v-if="journal.status === 'new'"
                  color="positive">
                  {{ journal.status }}
                </q-badge>
                <q-badge 
                  v-if="journal.status === 'review'"
                  color="warning">
                  {{ journal.status }}
                </q-badge>
                <q-badge 
                  v-if="journal.status === 'discuss'"
                  color="blue">
                  {{ journal.status }}
                </q-badge>
            </q-item-label>
            <q-item-label class="text-capitalize text-caption">{{ date.formatDate(journal.createdAt, 'DD MMM YYYY HH:mm A') }}</q-item-label>
        </div>
        <div class="justify-between justify-center">
         <q-btn round size="sm" color="positive" icon="create" @click="onClickEdit">
            <q-tooltip>Edit Submission</q-tooltip>
          </q-btn>
        </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator />

        <q-card-section v-if="editdialog.show">
        <q-editor 
         v-model="form.detail"
          min-height="5rem"
          :toolbar="[]"
        />
        <div class="row justify-end"> 
       <q-btn class="flex items-end q-mt-sm" color="primary" text-color="white" label="Update Journal" @click="onClickUpdate('new')" />
        <q-btn class="flex items-end q-mt-sm" flat color="negative" label="Cancel" @click="onClickCancelEdit"/>
        </div>
      </q-card-section>
    <q-card-section v-else v-html="journal.detail" />

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
       <div class="row justify-end">
      <q-btn :loading="progress" class="flex items-end q-mt-sm" color="primary" text-color="white" label="Post Comment" @click="onClickPost">
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>
      <q-btn class="flex items-end q-mt-sm" flat color="negative" label="Cancel" @click="onClickCancel"/>
      </div>
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
        detail: '',
        comment: ' '
      },
      dialog: {
        show: false
      },
            editdialog: {
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
      this.editdialog.show = false
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
        onClickEdit() {
      this.form = {detail: this.journal.detail}
      this.editdialog.show = true
      this.dialog.show = false
    },
        // TODO: Update journal.detail; change journal.status to 'new'
    onClickUpdate(status) {
      if(!this.journal) {
        return
      }
      let edit = {}
      edit.journalId = this.journal.id
      edit.detail = this.form.detail
      edit.status = status
      this.progress = true
       this.$store.dispatch('UpdateJournal', edit)
        .then(res => {
          this.progress = false
        })
        .catch(res => {
          this.progress = false
        })
        this.editdialog.show = false
    },
    
    onClickCancelEdit() {
      this.editdialog.show = false
    },


    onClickCancel() {
      this.dialog.show = false
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