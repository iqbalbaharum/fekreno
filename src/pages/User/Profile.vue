<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card class="q-pt-md" v-if="user.profile">
          <q-item>
            <q-card-section horizontal>
              <q-item-section>
                <q-avatar size="100px" color="accent" square>
                <div v-show="addButton" class="absolute-full text-subtitle flex flex-center">
                  <q-btn icon="add" flat size="sm" @click="dialogPhoto=true" />
                </div>
                  <img v-if="this.user.profile.avatar != null"
                    v-bind:src="user.profile.avatar"
                  />
                  <img v-if="this.user.profile.avatar == null"
                    v-bind:src="this.form['avatar']"
                  />
                </q-avatar>
              </q-item-section>
              <q-card-section>
                <div class="text-weight-semi">{{ user.profile.fullname }}</div>
                <div class="text-weight-bold">@{{ user.name }}</div>
                <div>
                  <a :href="`mailto:${user.email}`" target="_blank"
                    ><q-btn icon="fas fa-envelope" flat round size="sm"
                  /></a>
                  <a :href="user.profile.github" target="_blank"
                    ><q-btn icon="fab fa-github" flat round size="sm"
                  /></a>
                  <a :href="user.profile.linkedin" target="_blank"
                    ><q-btn
                      icon="fab fa-linkedin"
                      flat
                      round
                      size="sm"
                      :to="user.profile.linkedin"
                  /></a>
                </div>
              </q-card-section>
            </q-card-section>
          </q-item>

          <q-item class="q-py-md">
            <span>{{ user.profile.about }}</span>
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
            <q-tab name="repository" label="Repositories" @click="addButton=false"/>
            <q-tab name="application" label="Applications" @click="addButton=false"/>
            <div class="row justify-end full-width">
              <q-tab
                name="profile"
                label="Edit Profile"
                class="bg-primary text-white"
                @click="addButton=true"
                v-if="name === $route.params.userName"
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
          <q-tab-panel name="profile" class="q-pa-none" v-if="name === $route.params.userName">
            <profile-tab />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <q-dialog v-model="dialogPhoto" >
      <k-uploader
      label="Avatar"
      accept=".jpg, image/*"
      @fileUrl="getUploadedFileUrl"
      max-file-size="500000"
      @rejected="onRejected"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import OverviewTab from 'src/pages/Dashboard/Overview';
import ProfileTab from 'src/pages//Dashboard/Profile';
import RepositoryTab from 'src/pages//Dashboard/Repository';
import ApplicationTab from 'src/pages/Dashboard/Application';
import User from 'src/models/User';
import { mapGetters } from 'vuex';
import { date } from 'quasar';
import KUploader from 'src/components/KUploader.vue';

export default {
  name: 'PageIndex',
  data() {
    return {
      dialogPhoto: false,
      addButton: false,
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
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGo8XzszXwJThST5wxfqGFehUkRrVS6Njdw&usqp=CAU',
      },
    };
  },

  computed: {
    ...mapGetters(['name']),

    user() {
      return User.query().where('name', this.$route.params.userName).with('profile').first();
    },
  },

  created() {
    this.$store.dispatch('GetUserProfileByName', this.$route.params.userName);
    this.$store.dispatch('GetAllCountries');
    // this.$store.dispatch('GetAllApplications');
    // this.$store.dispatch('GetUserByID', this.userId);
    // this.$store.dispatch('GetUserRepositories');
    // this.$store.dispatch('GetUserApplications');
  },

  components: {
    OverviewTab,
    ProfileTab,
    RepositoryTab,
    ApplicationTab,
    KUploader,
  },

  methods: {
    getUploadedFileUrl(url) {
     this.form.avatar = url
     this.form['avatar'] === this.form.avatar
     this.dialogPhoto = false
     const payload = {
       avatar: url
     }
     this.$store.dispatch('UpdateUserProfile', payload)
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: 'image size is more than 500 kb'
      })
    },
  },
};
</script>
