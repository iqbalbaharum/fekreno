<template>
  <div>
    <databox 
			title="Journal" 
			:crud="['read']" 
			:editablescol="[]"
			:rows="journals"
      :columns="columns"
		>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Journal from './../../models/Journal'

export default {
  data() {
    return {
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'id' },
        { name: 'user', align: 'left', label: 'User', field: 'userId', sortable: true },
        { name: 'project', align: 'left', label: 'Project', field: 'projectId', sortable: true },
        { name: 'details', align: 'left', label: 'Detail', field: 'detail', sortable: true },
        { name: 'createdAt', align: 'left', label: 'Created At', field: 'createdAt', sortable: true },
      ]
    }
  },

  computed: {
    journals() {
      return Journal.query().withAll().get()
    }
  },

  created() {
    this.$store.dispatch('GetAllJournals')
  },

  components: {
    Databox
  },

  methods: {

  }
}
</script>
