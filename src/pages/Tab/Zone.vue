<template>
  <div>
    <databox 
			title="Zone" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="zones" 
			:columns="columns"
			@onAdd="onAdd"
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
import Zone from './../../models/Zone'

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
    zones() {
      return Zone.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllZones')
  },

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteZone', id)
    },
    onAdd() {
			this.$store.dispatch('AddZone', this.form)
    },

  }
}
</script>
