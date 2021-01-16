<template>
  <q-list bordered>
    <q-item v-if="applications.length <= 0" class="q-pa-md">
      Currently no available applications
    </q-item>
    <div
      v-else
      v-for="(application, index) in applications"
      :key="application.id"
    >
      <q-item
        clickable
        v-ripple
        class="q-pa-md"
        :class="{ 'bg-grey-2': index % 2 == 0 }"
        :to="`/application/${application.id}`"
      >
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" square>
            <img src="~assets/ms-icon-310x310.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            ><q-badge color="teal" v-if="application.featured"
              >Featured</q-badge
            ></q-item-label
          >
          <q-item-label class="text-weight-bold">{{
            application.title
          }}</q-item-label>
          <q-item-label caption>{{ application.description }}</q-item-label>
          <q-item-label caption class="text-capitalize"
            >{{ application.type }} &#8226;
            <span>{{ application.method }}</span>
            <span v-if="application.location">
              &#8226; {{ application.location }}</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-capitalize text-weight-bold text-black">
            {{ application.type }}
          </div>
        </q-item-section>
      </q-item>

      <q-separator inset="item" v-if="index < applications.length - 1" />
    </div>
  </q-list>
</template>

<script>
import Application from './../models/Application';

export default {
  data() {
    return {};
  },

  computed: {
    applications() {
      return Application.query().where('status', 'active').withAll().get();
    },
  },
};
</script>
