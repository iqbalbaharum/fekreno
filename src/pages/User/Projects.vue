<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Projects" />
      </q-breadcrumbs>
    </div>
    <div class="row q-pa-xl">
      <div class="col-8">
        <div class="q-mb-xl">
          <p class="text-h3">Projects</p>
          <div>
            Grow your software development skills. Choose your positions <br />
            from system design, UI/UX, programming or testing
          </div>
        </div>
        <project-list />
      </div>
    </div>
  </q-page>
</template>

<script>
import ProjectList from "./../../components/ProjectList";

export default {
  data() {
    return {};
  },

  components: {
    ProjectList,
  },

  created() {
    this.$store.dispatch("GetAllProjects");
  },
};
</script>
