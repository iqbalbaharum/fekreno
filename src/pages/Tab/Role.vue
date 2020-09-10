<template>
  <div>
    <databox 
			title="Role" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="roles" 
			:columns="columns"
			@onAdd="onAdd"
			@delete="onDelete"
		>
			<template v-slot:create-dialog-body>
				<div class="row q-gutter-sm">
					<div class="col">
						<q-input outlined v-model="form.name" label="Name" />
					</div>
				</div>
			</template>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Role from './../../models/Role'

export default {
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ],
      form: {
        name: ''
      }
    }
  },

  computed: {
    roles() {
      return Role.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllRoles')
  },

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteRole', id)
    },
    onAdd() {
	    this.$store.dispatch('AddRole', this.form)
    },

  }
}
</script>
