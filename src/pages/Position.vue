<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Position Management" />
      </q-breadcrumbs>
    </div>

    <position-box />
  </div>
</template>

<script>
import PositionBox from "./Tab/Position";

export default {
  components: {
    PositionBox,
  },
};
</script>
