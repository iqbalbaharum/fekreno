<template>
  <q-dialog v-model="open">
    <q-card style="width: 500px;">
      asd
    </q-card>
  </q-dialog>
</template>

<script>
import Tag from 'src/models/Tag'

export default {

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      
    }
  },

  computed: {
    parentTags() {
      return Tag.query().where((tag) => {
        return tag.parentTagsId !== null && tag.parentTagsId.length > 0
      }).get()
    }
  },

  created() {
    if(this.parentTags.length > 0) {
      this.$store.dispatch('GetAllTags')
    }
  },

}
</script>