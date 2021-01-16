<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Applications" />
      </q-breadcrumbs>
    </div>
    <div class="row q-pa-xl">
      <div class="col-8">
        <div class="q-mb-xl">
          <p class="text-h3">Applications</p>
          <div>
            Participate in any programs or apply to work on any job vancancy
            <br />
            from our partners
          </div>
        </div>
        <div class="q-py-md">
          <div class="text-h6">Applications</div>
        </div>
        <application-list />
      </div>
    </div>
  </q-page>
</template>

<script>
import ApplicationList from './../../components/ApplicationList';
import UserApplication from './../../models/UserApplication';

export default {
  data() {
    return {};
  },

  components: {
    ApplicationList,
  },

  computed: {
    userapplications() {
      let uapp = UserApplication.query().withAll().get();
      return uapp;
    },
  },

  created() {
    this.$store.dispatch('GetAllApplications');
  },
};
</script>
