<template>
  <q-list bordered v-ripple>
    <div
      v-for="(uapplication, index) in userapplications"
      :key="uapplication.id"
    >
      <q-item
        class="q-pa-md"
        :to="`application/${uapplication.application.id}`"
      >
        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-uppercase text-weight-bold">{{
              uapplication.application.title
            }}</span>
          </q-item-label>
          <q-item-label lines="2" class="text-caption">
            <span class="text-caption text-capitalize">{{
              uapplication.application.type
            }}</span>
            &#8226;
            <span class="text-grey-6">{{
              uapplication.application.timeAgo
            }}</span>
            &#8226;<span
              class="text-weight-medium text-red"
              v-if="
                userapplications.find(
                  el => el.applicationId === uapplication.application.id
                ).state === 'draft'
              "
            >
              Incomplete form
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side class="text-center">
          <div
            class="text-capitalize text-weight-bold text-black"
            v-if="uapplication.state === 'submit'"
          >
            {{ uapplication.status }}
          </div>
          <div class="text-capitalize text-weight-bold text-black" v-else>
            {{ uapplication.state }}
          </div>
        </q-item-section>
      </q-item>

      <q-separator v-if="index !== userapplications.length - 1" />
    </div>
    <q-item
      class="flex flex-center q-gutter-sm"
      v-if="userapplications.length <= 0"
    >
      <span class="">Haven't made any applications</span>
    </q-item>
  </q-list>
</template>

<script>
import User from "./../../models/User";
import UserApplication from "./../../models/UserApplication";
import { mapGetters } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["userId"]),

    userapplications() {
      return UserApplication.query()
        .where("userId", this.userId)
        .withAll()
        .get();
    }
  },

  methods: {}
};
</script>
