<template>
  <q-list bordered>
    <div v-for="(repository, index) in repositories" :key="repository.id">
      <q-item>
        <q-item-section top>
          <q-item-label lines="3" class="text-caption">
            <span class="text-caption text-uppercase">{{ repository.position.title }}</span>
          </q-item-label>
          <q-item-label lines="2" class="text-weight-bold">
            <a target="_blank" :href="repository.giturl">{{ repository.giturl }}</a>
          </q-item-label>
          <q-item-label lines="3" class="text-caption">
            <span class="text-caption">{{ repository.project.title }}</span> &#8226; <span class="text-grey-6">{{ repository.timeAgo }}</span>
          </q-item-label>
          <q-item-label lines="4" class="text-capitalize q-gutter-x-sm">
            <router-link to=""><q-badge color="accent" :label="repository.devEnvironment.language" /></router-link>
            <router-link to=""><q-badge color="info" :label="repository.framework" /></router-link>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator v-if="index !== repositories.length - 1" />
    </div>
  </q-list>
</template>

<script>
import Application from "./../../models/Application";
import { mapGetters } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["userId"]),

    applications() {
      let profile = Application.query().where("userId", this.userId).withAll().get();
      return profile;
    },
  },

  created() {},

  methods: {},
};
</script>
