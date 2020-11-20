<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Project Management" />
      </q-breadcrumbs>
    </div>

    <project-box />
  </div>
</template>

<script>
import ProjectBox from "./Tab/Project";

export default {
  components: {
    ProjectBox,
  },
};
</script>
