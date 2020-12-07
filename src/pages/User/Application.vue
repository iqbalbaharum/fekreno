<template>
  <q-page v-if="application">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Applications" to="/applications" />
        <q-breadcrumbs-el :label="`${application.title} (${application.type})`" />
      </q-breadcrumbs>
    </div>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card class="bg-primary text-white full-width">
          <q-card-section>
            <div class="text-caption text-right">
              Application &#8226; <span class="text-capitalize">{{ application.type }}</span>
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
          <q-tabs v-model="tabs" class="bg-white text-black" active-color="primary" indicator-color="primary" align="left" flat>
            <q-tab name="about" label="About" />
            <q-tab name="requirement" label="Requirements" />
            <q-tab name="question" label="Questions" v-if="userapplication && application.getQuestionsJsonObject.length > 0" />
            <q-tab name="status" label="Application Status" v-if="userapplication" />
            <div class="row justify-end full-width q-pr-md">
              <div class="text-weight-bold text-accent" v-if="userapplication && userapplication.status === 'submitted'">Submitted</div>
              <q-btn label="Submit Application" color="accent" @click="onClickApply" v-if="userapplication && userapplication.status === 'joined'" />
              <q-btn label="Participate" color="black" @click="onClickParticipate" v-if="!userapplication" />
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
                Submit your application under <span class="text-weight-bold text-primary">@{{ name }}</span>
              </q-item>

              <q-item class="bg-grey-4 text-grey-14 q-py-md" v-if="application.maxApplied === 1">
                <div>You can submit this application once. Make sure you got all the details correct before proceed on the application.</div>
              </q-item>

              <q-item class="q-py-md">
                <q-item-section>
                  <div class="text-grey-6">Minimum project completed</div>
                  <div>{{ application.minProject }} {{ application.minProject === 1 ? "repository" : "repositories" }}</div>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="fas fa-check-circle" class="text-teal" />
                </q-item-section>
              </q-item>

              <q-separator inset v-if="application.getQuestionsJsonObject.length > 0" />

              <q-item class="q-pa-md" v-if="application.getQuestionsJsonObject.length > 0">
                <q-item-section>
                  <div class="text-grey-6">Answer required questions</div>
                  <div>Required</div>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="fas fa-times-circle" class="text-red" v-if="application.getQuestionsJsonObject.length <= 0" />
                  <q-icon name="fas fa-check-circle" class="text-teal" v-else />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="question">
            <q-list bordered class="q-py-md">
              <q-item class="column q-gutter-y-md" v-for="(question, index) in application.getQuestionsJsonObject" :key="index">
                <div class="col q-gutter-y-md">
                  <div class="text-h6"><span v-html="question.text" /></div>
                  <q-input filled v-model="form[index]" :disable="userapplication.status === 'joined'" />
                </div>

                <q-separator />
              </q-item>

              <q-item class="q-pa-md row justify-center">
                <q-btn label="Save Answer" color="primary" @click="onClickSaveAnswer" v-if="userapplication.status !== 'joined'" />
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="status" v-if="userapplication">
            <q-list bordered class="q-py-md">
              <q-item>
                <q-timeline color="primary">
                  <q-timeline-entry title="Applied" :subtitle="date.formatDate(userapplication.createdAt, 'DD-MM-YYYY HH:mm')">
                    <div>
                      Application submitted under <span class="text-weight-bold text-primary">@{{ name }}</span>
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
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { date } from "quasar";
import Application from "./../../models/Application";
import UserApplication from "./../../models/UserApplication";

export default {
  data() {
    return {
      date: date,
      tabs: "about",
      form: [],
    };
  },

  computed: {
    ...mapGetters(["name", "userId"]),
    application() {
      return Application.find(this.$route.params.id);
    },
    userapplication() {
      let uapp = UserApplication.query().where("userId", this.userId).where("applicationId", this.$route.params.id).first();
      return uapp;
    },
  },

  mounted() {
    this.form = this.userapplication.getAnswersJsonObject;
  },

  methods: {
    async onClickSaveAnswer() {
      try {
        await this.$store.dispatch("UpdateUserApplication", {
          id: this.userapplication.id,
          answers: this.form,
        });

        this.tabs = "requirement";
      } catch (e) {
        console.log(e);
      }
    },
    onClickParticipate() {
      this.$store.dispatch("ApplyUserApplication", {
        applicationId: this.$route.params.id,
      });
    },
    onClickApply() {
      this.$store.dispatch("SubmitUserApplication", {
        id: this.userapplication.id,
      });
      this.$router.go(-1);
    },
  },
};
</script>
