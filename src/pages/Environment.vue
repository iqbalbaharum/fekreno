<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Development Environment Management" />
      </q-breadcrumbs>
    </div>

    <environment-box />
  </div>
</template>

<script>
import EnvironmentBox from "./Tab/DevEnvironment";

export default {
  components: {
    EnvironmentBox,
  },
};
</script>
