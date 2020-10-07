<template>
  <div>
    <databox 
			title="Project" 
			:crud="['create', 'update', 'delete', 'read']" 
			:editablescol="[]"
			:rows="projects" 
			:columns="columns"
			@onAdd="onAdd"
		>
			<template v-slot:create-dialog-body>
				<div class="q-gutter-sm">
          <div class="row">
            <div class="col-12">
              <q-input outlined v-model="form.title" label="Title" />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input type="textarea" outlined v-model="form.description" label="Description" />
            </div>
          </div>

          <div class="row">
            <div class="col-8">
              <q-input outlined v-model="form.icon" label="Icon URL" />
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <q-toggle
                v-model="form.active"
                color="primary"
                label="Active"
                checked-icon="check"
                unchecked-icon="clear"
                left-label
              />
            </div>
          </div>
          
				</div>
			</template>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Project from './../../models/Project'

export default {
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'id' },
        { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
        { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
        { name: 'active', align: 'left', label: 'Active', field: 'active', sortable: true },
        { name: 'icon', align: 'left', label: 'Icon', field: 'icon', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ],
      form: {
        title: '',
        description: '',
        active: false,
        icon: '',
      }
    }
  },

  computed: {
    projects() {
      return Project.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllProjects')
  },

  components: {
    Databox
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteProject', id)
    },
    onAdd() {
			this.$store.dispatch('AddProject', this.form)
    },

  }
}
</script>
