<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Applications" :to="`/admin/application`" />
        <q-breadcrumbs-el label="Participants" />
      </q-breadcrumbs>
    </div>
    <div class="row">
      <div class="col-8 q-pa-lg q-gutter-y-md">
        <div class="row q-gutter-x-md">
          <q-card class="col-3 text-center">
            <q-card-section>
              <div class="text-h2 text-primary text-center">
                {{ userapplications.length }}
              </div>
              <div caption>Applications</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 text-center">
            <q-card-section>
              <div class="text-h2 text-primary text-center">
                {{
                  userapplications.filter((x) => x.state === 'submit').length
                }}
              </div>
              <div caption>Submitted</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 text-center">
            <q-card-section>
              <div class="text-h2 text-primary text-center">
                {{ userapplications.filter((x) => x.state === 'draft').length }}
              </div>
              <div caption>Incomplete Form</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="row q-gutter-x-md" v-if="application.status === 'closed'">
          <q-card class="col-3 text-center bg-primary text-white">
            <q-card-section>
              <div class="text-h2 text-white text-center">
                {{
                  userapplications.filter(
                    (x) => x.state === 'submit' && x.status === 'accepted'
                  ).length
                }}
              </div>
              <div caption>Accepted</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 text-center bg-negative text-white">
            <q-card-section>
              <div class="text-h2 text-center">
                {{
                  userapplications.filter(
                    (x) => x.state === 'submit' && x.status === 'rejected'
                  ).length
                }}
              </div>
              <div caption>Rejected</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="text-grey">Participants</div>
        <q-list bordered>
          <div v-for="(uapp, index) in userapplications" :key="uapp.id">
            <q-item
              class="q-pa-md"
              to=""
              clickable
              v-ripple
              @click="onClickApplicationDialog(uapp.userId, uapp)"
            >
              <q-item-section avatar>
                <span
                  class="text-weight-bold q-pa-sm text-white text-h6"
                  :class="{
                    'bg-teal': uapp.status === 'submitted',
                    'bg-warning': uapp.status !== 'submitted',
                  }"
                  >0</span
                >
              </q-item-section>
              <q-item-section v-if="uapp.user">
                <q-item-label caption> APPID: {{ uapp.id }} </q-item-label>
                <q-item-label class="text-weight-bold">
                  {{ uapp.user.name }}
                </q-item-label>
                <q-item-label>{{ uapp.user.email }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div
                  class="text-weight-bold text-capitalize"
                  :class="{ 'text-teal': uapp.status === 'submitted' }"
                >
                  {{ uapp.status }}
                </div>
                <div caption>
                  {{ date.formatDate(uapp.updatedAt, 'DD/MM/YYYY HH:mm') }}
                </div>
              </q-item-section>
            </q-item>

            <q-separator insert v-if="index < userapplications.length" />
          </div>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="dialog.show" full-height @hide="resetDialog">
      <q-card style="width: 600px">
        <q-tabs v-model="dialog.tabs" class="bg-teal text-white">
          <q-tab name="checklist" label="Checklist" />
          <q-tab name="profile" label="Profile" />
          <q-tab name="repository" label="Repository" />
          <q-tab name="questions" label="Questions" />
        </q-tabs>

        <q-tab-panels v-model="dialog.tabs">
          <q-tab-panel name="checklist" class="q-pa-none">
            <q-list>
              <q-item v-if="application.getQuestionsJsonObject.length > 0">
                <q-item-section>
                  <div class="text-grey-6">Answer required questions</div>
                  <div>Required</div>
                </q-item-section>

                <q-item-section side>
                  <q-icon
                    name="fas fa-times-circle"
                    class="text-red"
                    v-if="application.getQuestionsJsonObject.length <= 0"
                  />
                  <q-icon name="fas fa-check-circle" class="text-teal" v-else />
                </q-item-section>
              </q-item>

              <q-separator inset />

              <q-item v-if="application.projects.length > 0">
                <q-item-section>
                  <div class="text-grey-6">
                    Completed at least one of the listed
                    <span
                      class="text-primary cursor-pointer"
                      @click="tabs = 'project'"
                      >projects</span
                    >
                  </div>
                  <div>Required</div>
                </q-item-section>

                <q-item-section side v-if="userrepositories">
                  <q-icon
                    name="fas fa-check-circle"
                    class="text-teal"
                    v-if="userrepositories.length > 0"
                  />
                  <q-icon name="fas fa-times-circle" class="text-red" v-else />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="profile">
            <q-list v-if="userprofile">
              <q-item v-for="(value, name, index) in userprofile" :key="index">
                <q-item-section>
                  <div class="text-caption text-uppercase">{{ name }}</div>
                  <div class="text-grey">{{ value }}</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="repository">
            <q-list bordered>
              <div v-for="(urepo, index) in userrepositories" :key="urepo.id">
                <q-item class="q-pa-md">
                  <q-item-section>
                    <q-item-label class="text-weight-bold">{{
                      urepo.project.title
                    }}</q-item-label>
                    <q-item-label class="text-weight-medium">
                      <a :href="urepo.giturl">{{ urepo.giturl }}</a>
                    </q-item-label>
                    <q-item-label class="text-caption">
                      {{ urepo.position.title }}
                    </q-item-label>
                    <q-item-label class="q-pt-md">
                      <span v-html="urepo.description" />
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator
                  inset="item"
                  v-if="index < userrepositories.length"
                />
              </div>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="questions">
            <q-list bordered class="q-py-md">
              <q-item
                class="column q-gutter-y-md"
                v-for="(question, index) in application.getQuestionsJsonObject"
                :key="index"
              >
                <div class="col q-gutter-y-md">
                  <div>
                    <span v-html="question.text" />
                  </div>
                  <div
                    v-if="
                      dialog.userapplication &&
                      dialog.userapplication.answers &&
                      dialog.userapplication.answers.length > 0 &&
                      dialog.userapplication.getAnswersJsonObject &&
                      dialog.userapplication.getAnswersJsonObject[index]
                    "
                    class="text-weight-bold"
                  >
                    {{ dialog.userapplication.getAnswersJsonObject[index] }}
                  </div>
                </div>

                <q-separator />
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Application from './../../models/Application';
import UserApplication from './../../models/UserApplication';
import UserProfile from './../../models/UserProfile';
import Repository from './../../models/Repository';

import { date } from 'quasar';
import Profile from 'src/models/UserProfile';
import UserRepository from 'src/repositories/UserRepository';

export default {
  data() {
    return {
      date: date,
      dialog: {
        show: false,
        tabs: 'checklist',
        userId: '',
        userapplication: {},
      },
    };
  },

  computed: {
    application() {
      return Application.query()
        .whereId(this.$route.params.id)
        .withAll()
        .first();
    },
    userapplications() {
      return UserApplication.query()
        .where('applicationId', this.$route.params.id)
        .withAll()
        .orderBy('updatedAt')
        .get();
    },
    userprofile() {
      return UserProfile.query().where('userId', this.dialog.userId).first();
    },
    userrepositories() {
      return Repository.query()
        .where('userId', this.dialog.userId)
        .where(
          'projectId',
          this.application.projects.map((val) => val.id)
        )
        .withAll()
        .get();
    },
  },

  created() {
    this.$store.dispatch('GetAllApplications');
    this.$store.dispatch('GetAllProjects');
    this.$store.dispatch('GetAllRepositories');
    this.$store.dispatch('GetAllPositions');
    this.$store.dispatch('GetUserApplications');
    this.$store.dispatch('GetUserRepositories');
    this.$store.dispatch('GetApplicationProject', this.$route.params.id);
    this.$store.dispatch('GetApplicationAllPartipants', this.$route.params.id);
  },

  methods: {
    onClickApplicationDialog(userId, uapp) {
      this.dialog.show = true;
      this.dialog.userId = userId;
      this.dialog.userapplication = uapp;

      this.$store.dispatch('GetUserProfileById', userId);
    },
    resetDialog() {
      this.dialog = {
        show: false,
        tabs: 'checklist',
        userId: '',
      };
    },
    getUserProfile() {},
  },
};
</script>