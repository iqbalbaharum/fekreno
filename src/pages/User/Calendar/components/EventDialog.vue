<template>
  <q-dialog v-model="isOpen">
    <q-card class="my-card" flat bordered style="width: 45%">
      <q-item class="text-white bg-primary" :class="{ 
        'bg-blue': event.type === 'onetoone',
        'bg-black': event.type === 'info',
      }">
        <q-item-section>
          <q-item-label class="text-body1">{{ getTitle }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-list class="full-width">
          <q-item>
            <q-item-section avatar><q-icon name="event" /></q-item-section>
            <q-item-section>
              <div class="text-h6">{{ event.title }}</div>
              <div>{{ date.formatDate(event.start, 'dddd, D MMMM') }}</div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar><q-icon name="note" /></q-item-section>
            <q-item-section>{{ event.description }}</q-item-section>
          </q-item>
          <q-item class="justify-end full-width">
            <div class="q-gutter-x-md" v-if="event.type === 'onetoone'">
              <q-btn flat label="Cancel" color="negative" v-close-popup />
              <q-btn label="Reject" color="negative" @click="onHandleRejectClick" />
              <q-btn label="Approve" color="primary" @click="onHandleApproveClick" />
            </div>
          </q-item>
        </q-list>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      date: date
    }
  },

  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    getTitle() {
      let title = ''
      
      switch(this.event.type) {
        case 'onetoone':
          title = 'Private Discussion'
          break
        case 'info':
          title = 'Information'
          break
        default:
          title = 'Event'
          break
      }

      return title
    }
  },

  methods: {
    onHandleApproveClick() {

    },
    onHandleRejectClick() {

    }
  },
}
</script>