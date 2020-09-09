<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="User Management" />
        <q-breadcrumbs-el label="List" v-if="data.tabs === 'list'" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-tabs
          narrow-indicator
          dense
          align="left"
          v-model="data.tabs"
          class="text-primary"
        >
          <q-tab name="list" label="Users" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'list'" class="flex flex-center">
      <databox 
        title="User" 
        :crud="['create', 'update', 'delete', 'read']" 
        :editablescol="['mobile', 'email']"
        :rows="users" 
        :columns="columns"
        @delete="onDelete"
        @onAdd="onAddUser"
      >
        <template v-slot:create-dialog-body>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input outlined v-model="form.user.name" label="Name" />
            </div>   
            <div class="col">
              <q-input outlined v-model="form.user.mobile" label="Mobile" />
            </div>
            <div class="col">
              <q-input outlined v-model="form.user.email" label="Email" />
            </div>   
            <div class="col">
              <q-input outlined type="password" v-model="form.user.password" label="Password" />
            </div> 
          </div>
        </template>

      </databox>
    </div>

  </div>
</template>

<script>
import Databox from '../components/Databox'
import User from './../models/User'

export default {
  data() {
    return {
      data: {
        tabs: 'list'
      },
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile' },
        { name: 'action', align: 'center', label: 'Action' }
      ],
      form: {
        user: {
          mobile: '',
          name: '',
          email: '',
          password: ''
        }
      }
    }
  },

  computed: {
    users() {
      return User.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllUsers')
  },

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    onAddUser() {
      this.$store.dispatch('RegisterUser', this.form.user)
        .then(res => {
        })
    },

  }
}
</script>
