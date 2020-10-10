<template>
  <q-card style="min-width: 100%">
    <q-item>

      <q-item-section>
        <q-item-label class="text-weight-bold"><user-popup popup :id="material.userId" :username="material.user ? material.user.name : ''" /></q-item-label>
        <q-item-label class="text-capitalize text-caption">{{ material.type }}</q-item-label>
      </q-item-section>

      <q-item-section>
        <div class="row justify-end text-grey">
          {{ date.formatDate(material.createdAt, 'DD MMM YYYY HH:MM A') }}
        </div>
      </q-item-section>

    </q-item>

    <q-separator />

    <q-card-section class="q-mb-lg">
      <div class="text-h6 ellipsis text-capitalize">
        <a target="_blank" :href="material.url">{{ material.title }}</a>
      </div>
      <div class="q-mt-md">
        <div class="text-grey overflow-auto">
          <span v-html="material.description" />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="bg-yellow-1 q-gutter-y-sm" v-if="material.reviewStatus === 'pending'">
      <q-select 
        filled
        v-model="form.reviewStatus" 
        emit-value 
        :options="options"
        label="Review Status" 
      />
        
      <q-editor 
        v-model="form.remark"
        min-height="6rem"
        :toolbar="[]"
      />
      <q-btn :loading="progress" class="flex items-end q-mt-sm" color="primary" text-color="white" label="Update" @click="onClickUpdate">
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
        remark: '',
        reviewStatus: 'pending'
      },
      dialog: {
        show: true
      },
      progress: false,
      options: [
        {
          label: 'Pending',
          value: 'pending'
        },
        {
          label: 'Good',
          value: 'good'
        },
        {
          label: 'Bad',
          value: 'bad'
        }
      ],
    }
  },

  props: {
    material: {
      type: Object
    }
  },

  components: {
    UserPopup
  },

  methods: {
    onClickUpdate() {
      
      if(!this.material) {
        return
      }

      let dt = {}
      dt.materialId = this.material.id
      dt.remark = this.form.remark
      dt.reviewStatus = this.form.reviewStatus

      this.progress = true

      this.$store.dispatch('UpdateMaterial', dt)
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