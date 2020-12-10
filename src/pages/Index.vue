<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card class="q-pt-md" v-if="userprofile">
          <q-item>
            <q-card-section horizontal>
              <q-item-section>
                <q-avatar size="100px" color="accent" square>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGo8XzszXwJThST5wxfqGFehUkRrVS6Njdw&usqp=CAU"
                  />
                </q-avatar>
              </q-item-section>
              <q-card-section>
                <div class="text-weight-semi">{{ userprofile.fullname }}</div>
                <div class="text-weight-bold">@{{ name }}</div>
                <div>
                  <a :href="`mailto:${fixed.email}`" target="_blank"
                    ><q-btn icon="fas fa-envelope" flat round size="sm"
                  /></a>
                  <a :href="userprofile.github" target="_blank"
                    ><q-btn icon="fab fa-github" flat round size="sm"
                  /></a>
                  <a :href="userprofile.linkedin" target="_blank"
                    ><q-btn
                      icon="fab fa-linkedin"
                      flat
                      round
                      size="sm"
                      :to="userprofile.linkedin"
                  /></a>
                </div>
              </q-card-section>
            </q-card-section>
          </q-item>

          <q-item class="q-py-md">
            <span>{{ userprofile.about }}</span>
          </q-item>

          <q-tabs
            v-model="tab"
            class="bg-blue-grey-1"
            active-color="primary"
            indicator-color="primary"
            align="left"
            flat
          >
            <!-- <q-tab name="overview" label="Overview" /> -->
            <q-tab name="repository" label="Repositories" />
            <q-tab name="application" label="Applications" />
            <div class="row justify-end full-width">
              <q-tab
                name="profile"
                label="Edit Profile"
                class="bg-primary text-white"
              />
            </div>
          </q-tabs>
        </q-card>

        <q-tab-panels v-model="tab" animated class="q-mt-lg">
          <q-tab-panel name="overview" class="q-pa-none">
            <overview-tab />
          </q-tab-panel>
          <q-tab-panel name="repository" class="q-pa-none">
            <repository-tab />
          </q-tab-panel>
          <q-tab-panel name="application" class="q-pa-none">
            <application-tab />
          </q-tab-panel>
          <q-tab-panel name="profile" class="q-pa-none">
            <profile-tab />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import OverviewTab from './Dashboard/Overview';
import ProfileTab from './Dashboard/Profile';
import RepositoryTab from './Dashboard/Repository';
import ApplicationTab from './Dashboard/Application';
import UserProfile from './../models/UserProfile';
import { mapGetters } from 'vuex';
import { date } from 'quasar';

export default {
  name: 'PageIndex',
  data() {
    return {
      tab: 'overview',
      dialog: {
        show: false,
      },
      fixed: {
        mobile: '',
        email: '',
      },
      form: {
        fullname: '',
        about: '',
        birthday: '',
        country: '',
        github: '',
        linkedin: '',
      },
    };
  },

  computed: {
    ...mapGetters(['name', 'email', 'mobile', 'userId']),

    userprofile() {
      let profile = UserProfile.query()
        .withAll()
        .where('userId', this.userId)
        .first();
      return profile;
    },
  },

  created() {
    this.$store.dispatch('GetAllCountries');
    this.$store.dispatch('GetAllApplications');
    this.$store.dispatch('GetUserRepositories');
    this.$store.dispatch('GetUserApplications');
    this.$store.dispatch('GetUserProfile').then((res) => {
      this.form = Object.create(this.userprofile);
      this.form = {
        fullname: this.userprofile.fullname,
        about: this.userprofile.about,
        birthday: date.formatDate(this.userprofile.birthday, 'DD/MM/YYYY'),
        country: this.userprofile.country,
        github: this.userprofile.github ? this.userprofile.github : '',
        linkedin: this.userprofile.linkedin ? this.userprofile.linkedin : '',
      };
    });

    this.fixed.email = this.email;
    this.fixed.mobile = this.mobile;
  },

  components: {
    OverviewTab,
    ProfileTab,
    RepositoryTab,
    ApplicationTab,
  },

  methods: {},
};
</script>
