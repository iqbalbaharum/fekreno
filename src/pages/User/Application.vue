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
          <q-card-section top avatar>
            <q-img contain src="~assets/krenovator.png" />
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
            <q-tab name="requirement" label="Requirements" />
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
            <q-tab
              name="status"
              label="Application Status"
              v-if="userapplication"
            />
            <div class="row justify-end full-width q-pr-md">
              <div
                class="text-weight-bold text-accent"
                v-if="
                  userapplication !== null &&
                  userapplication.status === 'submitted'
                "
              >
                Submitted
              </div>
              <q-btn
                label="Submit Application"
                color="accent"
                @click="onClickApply"
                v-if="
                  userapplication !== null &&
                  userapplication.status === 'joined'
                "
              />
              <q-btn
                label="Participate"
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

                <q-item-section side>
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

              <q-item class="q-pa-md" v-if="application.projects.length > 0">
                <q-item-section>
                  <div class="text-grey-6">
                    Completed at least one of the listed projects
                  </div>
                  <div>Required</div>
                </q-item-section>

                <q-item-section side>
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
                      userapplication && userapplication.status !== 'joined'
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
                  v-if="userapplication && userapplication.status !== 'joined'"
                />
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="status" v-if="userapplication">
            <q-list bordered class="q-py-md">
              <q-item>
                <q-timeline color="primary">
                  <q-timeline-entry
                    title="Applied"
                    :subtitle="
                      date.formatDate(
                        userapplication.createdAt,
                        'DD-MM-YYYY HH:mm'
                      )
                    "
                  >
                    <div>
                      Application submitted under
                      <span class="text-weight-bold text-primary"
                        >@{{ name }}</span
                      >
                    </div>
                  </q-timeline-entry>
                  <!-- <q-timeline-entry title="In Review" :subtitle="userapplication.createdAt" icon="eyes"> </q-timeline-entry>
                  <q-timeline-entry title="Shortlisted" :subtitle="userapplication.createdAt" icon="edit">
                    <div>Your application has been shortlisted</div>
                  </q-timeline-entry>
                  <q-timeline-entry :title="userapplication.status" :subtitle="userapplication.createdAt" icon="close" color="red">
                    <div>{{ userapplication.reason }}</div>
                  </q-timeline-entry> -->
                </q-timeline>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="project">
            <q-list bordered class="q-py-md">
              <q-item>
                Any one of the projects listed below must be submitted in order
                to proceed on your application
              </q-item>

              <div
                v-for="(project, index) in application.projects"
                :key="project.id"
              >
                <q-item
                  clickable
                  v-ripple
                  class="q-pa-md"
                  :class="{ 'bg-grey-2': index % 2 == 0 }"
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
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { date } from 'quasar';
import Application from './../../models/Application';
import UserApplication from './../../models/UserApplication';
import Repository from './../../models/Repository';

export default {
  data() {
    return {
      date: date,
      tabs: 'about',
      form: [],
    };
  },

  computed: {
    ...mapGetters(['name', 'userId']),
    application() {
      return Application.query()
        .whereId(this.$route.params.id)
        .withAll()
        .first();
    },
    userapplication() {
      let uapp = UserApplication.query()
        .where('userId', this.userId)
        .where('applicationId', this.$route.params.id)
        .first();
      return uapp;
    },
    userrepositories() {
      return (
        Repository.query()
          .where('userId', this.userId)
          // .whereIdIn(this.application.projects.map((val) => val.id))
          .where('projectId', '117c85c5-71dc-4c07-ad9b-ea1a88c23582')
          .get()
      );
    },
  },

  mounted() {
    this.$store.dispatch('GetAllApplications');
    this.$store.dispatch('GetAllProjects');
    this.$store.dispatch('GetAllRepositories');
    this.$store.dispatch('GetUserApplications');
    this.$store.dispatch('GetApplicationProject', this.$route.params.id);

    if (this.userapplication && this.userapplication.getAnswersJsonObject) {
      this.form = this.userapplication.getAnswersJsonObject;
    } else {
      this.form = [];
    }
  },

  methods: {
    async onClickSaveAnswer() {
      try {
        await this.$store.dispatch('UpdateUserApplication', {
          id: this.userapplication.id,
          answers: this.form,
        });

        this.tabs = 'requirement';
      } catch (e) {
        console.log(e);
      }
    },
    onClickParticipate() {
      this.$store.dispatch('ApplyUserApplication', {
        applicationId: this.$route.params.id,
      });
    },
    onClickApply() {
      this.$store.dispatch('SubmitUserApplication', {
        id: this.userapplication.id,
      });
      this.$router.go(-1);
    },
  },
};
</script>
