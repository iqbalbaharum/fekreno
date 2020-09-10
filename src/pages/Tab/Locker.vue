<template>
  <div>
    <databox 
			title="Locker" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="lockers" 
			:columns="columns"
			@onAdd="onAdd"
		>
			<template v-slot:create-dialog-body>
				<div class="row q-gutter-sm">
					<div class="col">
						<q-input outlined v-model="form.name" label="Name" />
					</div>
					<div class="col">
						<q-select 
							outlined 
							v-model="form.zoneId" 
							:options="options.zones" 
							label="Zone"
							emit-value
							map-options />
					</div>
				</div>
			</template>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Locker from './../../models/Locker'
import Zone from './../../models/Zone'

export default {
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'zone', align: 'left', label: 'Zone', field: 'zoneId', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
			],
			options: {
				zones: []
			},
      form: {
        name: '',
				zoneId: '',
				area: '.'
      }
    }
  },

  computed: {
    lockers() {
      return Locker.all()
		},
		zones() {
			return Zone.all()
		}
  },

  created() {
		this.$store.dispatch('GetAllLockers')
	},
	
	mounted() {
		this.createSelection()
	},

  components: {
    Databox
  },

  methods: {
		createSelection() {
			this.zones.forEach(zone => {
				this.options.zones.push({
					label: zone.name.charAt(0).toUpperCase() + zone.name.slice(1),
					value: zone.uuid
				})
			})
		},
    onDelete(id) {
      this.$store.dispatch('DeleteLocker', id)
    },
    onAdd() {
			this.$store.dispatch('AddLocker', this.form)
    },

  }
}
</script>
