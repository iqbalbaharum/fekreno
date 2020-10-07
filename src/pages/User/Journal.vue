<template>
  <div>
    <div class="q-pa-sm flex justify-end">
      <q-btn color="primary" label="Add Journal" @click="onClickAddJournal" />
    </div>

    <q-separator class="q-mb-sm q-mt-sm" />

    <q-list separator>
      <q-item clickable v-for="(journal) in journals" :key="journal.id">
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ journal.category }}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span>{{ journal.detail }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{ journal.createdAt }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

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
          <q-input
            v-model="form.detail"
            type="textarea"
            label="Details"
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
import Journal from './../../models/Journal'

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