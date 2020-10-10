<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Journal" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md row justify-end">
      <q-btn @click="onClickAddJournal" color="primary" icon="fas fa-plus" label="Journal" />
    </div>
    
    <div class="q-pa-md">
      <q-list class="q-gutter-sm">
        <q-item v-for="(journal) in journals" :key="journal.id">
          <journal-item :journal="journal" />
        </q-item>
      </q-list>
    </div>

    <!-- DIALOG -->
    <q-dialog v-model="dialog.show" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Journal</q-item-label>
        </q-item-section>
        
        <q-card-section class="row q-gutter-sm justify-center">  
        <div class="col-12">
          <q-select 
            filled
            v-model="form.category" 
            emit-value 
            :options="options"
            label="Category" />
        </div>

        <q-space />

        <div class="col-12">
          <!-- <q-input
            v-model="form.detail"
            type="textarea"
            label="Details"
          /> -->
          <q-editor 
            v-model="form.detail"
            min-height="5rem"
            :toolbar="[]"
          />
        </div>
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat round icon="delete" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
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
      form: {
        type: '',
        detail: ''
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

  components: {
    JournalItem
  },

  computed: {
    journals() {
      return Journal.query().withAll().get()
    }
  },

  created() {
    this.$store.dispatch('GetUserJournal')
  },

  methods: {
    onClickAddJournal() {
      this.form = {}
      this.dialog.show = true
    },

    onClickCancel() {
      this.form = {}
      this.dialog.show = false
    },

    onClickSubmit() {
      this.$store.dispatch('AddJournal', this.form)
        .then(res => {
          this.form = {}
          this.dialog.show = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>