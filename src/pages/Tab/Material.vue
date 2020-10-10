<template>
  <div class="q-pa-md">
    <q-list class="q-gutter-sm">
      <q-item v-for="(material) in materials" :key="material.id">
        <material-item :material="material" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Material from './../../models/Material'
import MaterialItem from './../../components/MaterialItem'

export default {
  computed: {
    materials() {
      return Material.query().withAll().get()
    }
  },

  created() {
    this.$store.dispatch('GetAllMaterials')
  },

  components: {
    MaterialItem
  }
}
</script>