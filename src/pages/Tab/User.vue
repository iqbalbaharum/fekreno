<template>
	<div>
		<databox 
			title="User" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="['mobile', 'email']"
			:rows="users" 
			:columns="columns"
			:menus="menus"
			@delete="onDelete"
			@onAdd="onAddUser"
		>
		<template v-slot:create-dialog-body>
			<div class="row q-gutter-sm">
				<div class="col">
					<q-input outlined v-model="form.name" label="Name" />
				</div>   
				<div class="col">
					<q-input outlined v-model="form.mobile" label="Mobile" />
				</div>
				<div class="col">
					<q-input outlined v-model="form.email" label="Email" />
				</div>   
				<div class="col">
					<q-input outlined type="password" v-model="form.password" label="Password" />
				</div> 
			</div>
		</template>

	</databox>

	<q-dialog v-model="dialog.role.show">
		<q-card style="min-width: 300px;">
			<q-card-section class="row items-center q-pb-none">
				<div class="text-h6">Assigning Roles</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup />
			</q-card-section>

			<q-card-section>
				<q-select
					v-model="dialog.role.user"
					multiple
					emit-value
					map-options
					:options="options.roles"
					use-chips
					stack-label
					label="Role"
				/>
			</q-card-section>

		</q-card>
	</q-dialog>

	</div>
</template>

<script>
import Databox from '../../components/Databox'
import User from './../../models/User'
import Role from './../../models/Role'

export default {
	data() {
		return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'uuid' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile' },
        { name: 'action', align: 'center', label: 'Action' }
      ],
      menus: [
        {
          label: "Manage Roles",
          trigger: this.manageRole
        }
			],
			options: {
				roles: []
			},
			dialog: {
				role: {
					show: false,
					user: []
				}
			},
      form: {
        mobile: '',
				name: '',
				email: '',
				password: ''
      }
		}
	},

	created() {
		this.$store.dispatch('GetAllUsers')
	},

	mounted() {
		this.loadAllRoles()
	},
	
	computed: {
    users() {
      return User.query().withAll().get()
		},
		roles() {
			return Role.all()
		}
	},
	
	components: {
    Databox
	},
	
	methods: {
		async loadAllRoles() {
			let loadRoles = await this.$store.dispatch('GetAllRoles')
			loadRoles.forEach(role => {
				this.options.roles.push({
					value: role.uuid,
					label: role.name
				})
			})
		},
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id)
    },
    onAddUser() {
      this.$store.dispatch('RegisterUser', this.form)
        .then(res => {
        })
		},
		
    async manageRole(id) {
			this.dialog.role.user = []

			const user = User.query().whereId(id).with('roles').first()

			await this.$store.dispatch('GetUserRoles', id)
			for await(let role of user.roles) {
				this.dialog.role.user.push(role.uuid)
			}
			
			this.dialog.role.show = true
			
    }
 
  }
}
</script>