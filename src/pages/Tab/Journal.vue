<template>
  <div>
    <databox 
			title="Journal" 
			:crud="['read']" 
			:editablescol="[]"
			:rows="journals"
      :columns="columns"
      rowkey="uuid"
		>

		</databox>

  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Journal from './../../models/Journal'
import { date } from 'quasar'

export default {
  data() {
    return {
      columns: [
        { name: 'user', align: 'left', label: 'User', field: row => row.user ? row.user.name : '', sortable: true },
        { name: 'project', align: 'left', label: 'Project', field: 'projectId', sortable: true },
        { name: 'detail', required: true, label: 'Detail', align: 'left', field: 'detail', sortable: true },
        { name: 'createdAt', 
          required: true, 
          align: 'left', 
          label: 'Created At', 
          field: 'createdAt', 
          sortable: true, format: (val) => date.formatDate(val, 'DD MMM YYYY HH:MM A'),
          style: 'width: 100px', },
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
