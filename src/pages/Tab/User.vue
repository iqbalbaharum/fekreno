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

	<q-dialog v-model="dialog.show">
		<q-card style="min-width: 300px;">
			<q-card-section class="row items-center q-pb-none">
				<div class="text-h6">Assigning Roles</div>
				<q-space />
				<q-btn icon="close" flat round dense @click="onClickCancel" />
			</q-card-section>

			<q-card-section>
				<q-list separator bordered>
					<q-item v-for="(role, index) in roles" :key="role.$id">
						<q-item-section>
							<q-item-label>{{ role.name }}</q-item-label>
						</q-item-section>
						<q-item-section side top>
							<q-checkbox v-if="dialog.roleArr[index]" v-model="dialog.roleArr[index].value" @input="assignRole(index)" />
						</q-item-section>
					</q-item>
				</q-list>
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
				show: false,
				userId: '',
				roleArr: []
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
			this.dialog.roleArr = []

			const user = User.query().whereId(id).with('roles').first()

			for await(let arole of this.roles) {
				this.dialog.roleArr.push({
					id: arole.uuid,
					value: false
				})
			}

			const userRoles = await this.$store.dispatch('GetUserRoles', id)
			for await(let urole of userRoles) {
				let u = this.dialog.roleArr.find(element => element.id === urole.uuid)
				if(u) {
					console.log(u.id)
					u.value = true
				}
			}

			this.dialog.userId = id
			this.dialog.show = true
			
		},
		
		onClickSave() {
			
		},

		onClickCancel() {
			this.dialog.roleArr = []
			this.dialog.userId = ''
			this.dialog.show = false
		},

		assignRole(index) {
			
			const data = {
				roleId: this.dialog.roleArr[index].id,
				userId: this.dialog.userId
			}

			if(this.dialog.roleArr[index].value) {
				this.$store.dispatch('AssignUserRole', data)
			} else {
				this.$store.dispatch('UnassignUserRole', data)
			}
		}
  }
}
</script>