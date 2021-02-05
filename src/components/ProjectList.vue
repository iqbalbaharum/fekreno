<template>
  <q-list bordered>
    <q-item v-if="projects.length <= 0" class="q-pa-md">
      Currently no available projects
    </q-item>
    <div v-else v-for="(project, index) in projects" :key="project.id">
      <q-item
        clickable
        v-ripple
        class="q-pa-md"
        :class="{ 'bg-grey-2': index % 2 == 0 }"
        :to="`/project/${project.id}`"
      >
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" square>
            <img src="~assets/ms-icon-310x310.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">{{
            project.title
          }}</q-item-label>
          <q-item-label caption
            ><span v-html="project.description"
          /></q-item-label>
          <q-item-label caption>Featured</q-item-label>
        </q-item-section>
        
        <q-item-section side>
          <q-item-section class="text-center">
            <span class="text-h6 text-weight-bold">{{project.repository.length}}</span>
            <span class="text-caption">repositories</span>
          </q-item-section>
        </q-item-section>
      </q-item>

      <q-separator inset="item" v-if="index < projects.length - 1" />
    </div>
  </q-list>
</template>

<script>
import Project from './../models/Project';

export default {
  data() {
    return {};
  },
  computed: {
    projects() {
      return Project.query().withAll().get();
    },
  },
  created(){
    this.$store.dispatch('GetAllRepositories');
  },
};
</script>
