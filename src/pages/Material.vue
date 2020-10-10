<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Material Management" />
      </q-breadcrumbs>
    </div>

    <material-box />

  </div>
</template>

<script>
import MaterialBox from './Tab/Material'

export default {
  components: {
    MaterialBox
  }
}
</script>