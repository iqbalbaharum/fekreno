<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Application" />
      </q-breadcrumbs>
    </div>

    <application-box />
  </div>
</template>

<script>
import ApplicationBox from "./Tab/Applications";

export default {
  components: {
    ApplicationBox,
  },
};
</script>
