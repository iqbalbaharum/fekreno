<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card class="q-pt-md" v-if="userprofile">
          <q-item>
            <q-card-section horizontal>
              <q-item-section>
                <q-avatar size="100px" color="accent" square>
                <div v-show="addButton" class="absolute-full text-subtitle flex flex-center">
                  <q-btn icon="add" flat size="sm" @click="dialogPhoto=true" />
                </div>
                  <img v-if="this.userprofile.avatar != null"
                    v-bind:src="userprofile.avatar"
                  />
                  <img v-if="this.userprofile.avatar == null"
                    v-bind:src="this.form['avatar']"
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
            <q-tab name="repository" label="Repositories" @click="addButton=false"/>
            <q-tab name="application" label="Applications" @click="addButton=false"/>
            <div class="row justify-end full-width">
              <q-tab
                name="profile"
                label="Edit Profile"
                class="bg-primary text-white"
                @click="addButton=true"
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(['name']),
  },

  created() {
    if(this.name) {
      this.$router.push({ path: `/profile/${this.name}` })
    }
  },
};
</script>
