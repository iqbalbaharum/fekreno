<template>
  <q-list bordered>
    <div v-for="(repository, index) in repositories" :key="repository.id">
      <q-item>
        <q-item-section top>
          <q-item-label lines="3" class="text-caption">
            <span class="text-caption text-uppercase">{{
              repository.position.title
            }}</span>
          </q-item-label>
          <q-item-label lines="2" class="text-weight-bold">
            <a target="_blank" :href="repository.giturl">{{
              repository.giturl
            }}</a>
          </q-item-label>
          <q-item-label lines="3" class="text-caption">
            <span class="text-caption">{{ repository.project.title }}</span>
            &#8226; <span class="text-grey-6">{{ repository.timeAgo }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator v-if="index !== repositories.length - 1" />
    </div>
    <div class="flex flex-center q-pa-md" v-if="repositories.length <= 0">
      <span class="">No repositories</span>
    </div>
  </q-list>
</template>

<script>
import Repository from "./../../models/Repository";
import { mapGetters } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["userId"]),

    repositories() {
      let profile = Repository.query()
        .where("userId", this.userId)
        .withAll()
        .get();
      return profile;
    }
  },

  created() {},

  methods: {}
};
</script>
