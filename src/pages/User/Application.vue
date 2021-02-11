<template>
  <q-page v-if="application">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Applications" to="/applications" />
        <q-breadcrumbs-el
          :label="`${application.title} (${application.type})`"
        />
      </q-breadcrumbs>
    </div>
    <div class="row q-pa-xl">
      <div class="col-xl-8 col-md-10">
        <q-card class="bg-primary text-white full-width">
          <q-card-section>
            <div class="text-caption text-right">
              Application &#8226;
              <span class="text-capitalize">{{ application.type }}</span>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-py-sm">
              <div class="text-h5">{{ application.title }}</div>
              <div class="text-caption">{{ application.description }}</div>
            </div>
          </q-card-section>
          <q-tabs
            v-model="tabs"
            class="bg-white text-black"
            active-color="primary"
            indicator-color="primary"
            align="left"
            flat
            inline-label
          >
            <q-tab name="about" label="About" />
            <q-tab
              name="requirement"
              label="Checklist"
              v-if="userapplication && userapplication.status !== 'joined'"
            />
            <q-tab name="requirement" label="Requirements" v-else />
            <q-tab
              name="question"
              label="Questions"
              v-if="
                userapplication && application.getQuestionsJsonObject.length > 0
              "
            />
            <q-tab
              name="project"
              label="Project"
              v-if="userapplication && application.projects.length > 0"
            />
            <div class="row justify-end full-width q-pr-md">
              <div
                class="text-weight-bold text-accent"
                v-if="userapplication && userapplication.state === 'submit'"
              >
                <div class="text-caption">
                  {{
                    date.formatDate(
                      userapplication.updatedAt,
                      'DD MMM YYYY hh:mm A'
                    )
                  }}
                </div>
                {{ userapplication.status.toUpperCase() }}
              </div>
              <q-btn
                label="Submit Application"
                color="accent"
                @click="onClickSubmission"
                v-if="userapplication && userapplication.state === 'draft'"
                :disabled="!isCanSubmit"
              />
              <q-btn
                label="Fill In Form"
                color="black"
                @click="onClickParticipate"
                v-if="!userapplication"
              />
            </div>
          </q-tabs>
        </q-card>

        <q-tab-panels v-model="tabs" animated class="q-mt-xl q-pa-none">
          <q-tab-panel name="about" class="q-pa-md">
            <span v-html="application.about" />
          </q-tab-panel>
          <q-tab-panel name="requirement" class="q-pa-md">
            <q-list bordered class="q-py-md">
              <q-item>
                Submit your application under
                <span class="text-weight-bold text-primary">@{{ name }}</span>
              </q-item>

              <q-item
                class="bg-grey-4 text-grey-14 q-py-md"
                v-if="application.maxApplied === 1"
              >
                <div>
                  You can submit this application once. Make sure you got all
                  the details correct before proceed on the application.
                </div>
              </q-item>

              <q-item class="q-py-md">
                <q-item-section>
                  <div class="text-grey-6">Minimum project completed</div>
                  <div>
                    {{ application.minProject }}
                    {{
                      application.minProject === 1
                        ? 'repository'
                        : 'repositories'
                    }}
                  </div>
                </q-item-section>

                <q-item-section side v-if="userapplication">
                  <q-icon name="fas fa-check-circle" class="text-teal" />
                </q-item-section>
              </q-item>

              <q-separator
                inset
                v-if="application.getQuestionsJsonObject.length > 0"
              />

              <q-item
                class="q-pa-md"
                v-if="application.getQuestionsJsonObject.length > 0"
              >
                <q-item-section>
                  <div class="text-grey-6">Answer required questions</div>
                  <div>Required</div>
                </q-item-section>

                <q-item-section side v-if="userapplication">
                  <q-icon
                    name="fas fa-check-circle"
                    class="text-teal"
                    v-if="
                      userapplication && userapplication.getAnswersJsonObject
                    "
                  />
                  <q-icon name="fas fa-times-circle" class="text-red" v-else />
                </q-item-section>
              </q-item>

              <q-separator inset />

              <q-item class="q-pa-md" v-if="application.projects.length > 0">
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

                <q-item-section side v-if="userapplication">
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
          <q-tab-panel name="question">
            <q-list bordered class="q-py-md">
              <q-item
                class="column q-gutter-y-md"
                v-for="(question, index) in application.getQuestionsJsonObject"
                :key="index"
              >
                <div class="col q-gutter-y-md">
                  <div class="text-h6"><span v-html="question.text" /></div>
                  <q-input
                    filled
                    v-model="form[index]"
                    :disable="
                      userapplication && userapplication.state !== 'draft'
                    "
                  />
                </div>

                <q-separator />
              </q-item>

              <q-item class="q-pa-md row justify-center">
                <q-btn
                  label="Save Answer"
                  color="primary"
                  @click="onClickSaveAnswer"
                  v-if="userapplication && userapplication.state === 'draft'"
                />
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="project">
            <q-list bordered class="q-ma-md">
              <q-item class="bg-grey-4 text-grey-14 q-py-md">
                <div>
                  Any one of the projects listed below must be submitted in
                  order to proceed on your application
                </div>
              </q-item>

              <div
                v-for="(project, index) in application.projects"
                :key="project.id"
              >
                <q-item
                  clickable
                  v-ripple
                  class="q-pa-md"
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
                  </q-item-section>

                  <q-item-section side>
                    <q-icon
                      name="fas fa-check-circle"
                      color="green"
                      v-if="
                        userrepositories.find(
                          (el) => el.projectId === project.id
                        )
                      "
                    />
                  </q-item-section>
                </q-item>

                <q-separator
                  inset="item"
                  v-if="index < application.projects.length - 1"
                />
              </div>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <prompt
      :show.sync="dialog.notification"
      boxtype="warning"
      :buttons="['continue', 'cancel']"
      icon="fas fa-check-circle"
      title="Submit Application"
      body="You are submitting your application. Proceed?"
      @continue="onClickApply"
    />

    <prompt
      :show.sync="dialog.info"
      boxtype="warning"
      :buttons="['ok']"
      icon="fas fa-check-circle"
      :title="`You are applying for ${application.title}`"
      body="Complete your application by following checklist given and click Submit Application. Fail to do so, may result in your application void."
    />

    <prompt
      :show.sync="dialog.warn"
      boxtype="alert"
      :buttons="['cancel','editProfile']"
      icon="fas fa-exclamation"
      :title="`Incomplete profile.`"
      body="You profile is not complete. Please complete your profile in 'EDIT PROFILE' before submitting applications."
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { date } from 'quasar';
import Application from './../../models/Application';
import UserApplication from './../../models/UserApplication';
import Repository from './../../models/Repository';
import UserProfile from './../../models/UserProfile';
import Prompt from './../../components/Prompt';

export default {
  data() {
    return {
      date: date,
      tabs: 'about',
      form: [],
      isCanSubmit: false,
      dialog: {
        notification: false,
        info: false,
        warn: false
      },
      profile: {},
    };
  },

  components: {
    Prompt,
  },

  computed: {
    ...mapGetters(['name', 'userId']),
    application() {
      let app = Application.query()
        .whereId(this.$route.params.id)
        .withAll()
        .first();

      return app;
    },
    userapplication() {
      let uapp = UserApplication.query()
        .where('userId', this.userId)
        .where('applicationId', this.$route.params.id)
        .first();
      return uapp;
    },
    userrepositories() {
      return Repository.query()
        .where('userId', this.userId)
        .where(
          'projectId',
          this.application.projects.map((val) => val.id)
        )
        .get();
    },
    userprofile() {
        let profile = UserProfile.query().where('userId', this.userId).first();
        return profile ? profile.isCompleted : false
      },
  },

  mounted() {
    this.$store.dispatch('GetAllApplications');
    this.$store.dispatch('GetAllProjects');
    this.$store.dispatch('GetAllRepositories');
    this.$store.dispatch('GetUserApplications');
    this.$store.dispatch('GetUserRepositories');
    this.$store.dispatch('GetApplicationProject', this.$route.params.id);

    if (this.userapplication && this.userapplication.getAnswersJsonObject) {
      this.form = this.userapplication.getAnswersJsonObject;
    } else {
      this.form = [];
    }

    this.checkCanSubmit();
  },

  methods: {
    async onClickSaveAnswer() {
      try {
        await this.$store.dispatch('UpdateUserApplication', {
          id: this.userapplication.id,
          answers: this.form,
        });

        this.tabs = 'requirement';
        this.checkCanSubmit();
      } catch (e) {
        console.log(e);
      }
    },
    onClickParticipate() {
      if (!this.userprofile) {
        this.dialog.warn = true;
        return
      }
      
        this.$store.dispatch('ApplyUserApplication', {
          applicationId: this.$route.params.id,
        })
        .then((res) => {
          this.dialog.info = true;
          this.$store.dispatch('GetUserApplications');
        });
    },
    onClickSubmission() {
      this.dialog.notification = true;
    },
    onClickApply() {     
        this.$store.dispatch('SubmitUserApplication', {
        id: this.userapplication.id,
      });
      this.$router.go(-1);
      
    },
    checkCanSubmit() {
      let submit = true;

      if (this.userapplication && this.userapplication.state !== 'draft') {
        submit = false;
      }

      if (submit && this.application.projects.length > 0) {
        if (this.userrepositories.length <= 0) {
          submit = false;
        }
      }

      if (
        submit &&
        this.application.questions &&
        JSON.parse(this.application.questions).length > 0
      ) {
        if (
          this.userapplication.getAnswersJsonObject &&
          this.userapplication.getAnswersJsonObject.length < 0
        ) {
          submit = false;
        }
      }

      this.isCanSubmit = submit;
    },
  },
};
</script>
