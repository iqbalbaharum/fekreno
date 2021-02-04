<template>
  <q-page v-if="this.form">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Applications" to="admin/applications" />
        <q-breadcrumbs-el :label="`Editing ${form.title} (${form.type})`" />
      </q-breadcrumbs>
    </div>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card class="bg-primary text-white full-width">
          <q-card-section top avatar>
            <q-img contain src="~assets/krenovator.png" />
          </q-card-section>
          <q-card-section>
            <div class="q-py-sm q-gutter-y-md">
              <div class="text-h5">
                <q-input
                  dark
                  color="white"
                  v-model="form.title"
                  autofocus
                  filled
                  label="Title"
                />
              </div>
              <div class="text-caption">
                <q-input
                  dark
                  color="white"
                  v-model="form.description"
                  type="textarea"
                  label="Description"
                  filled
                >
                </q-input>
              </div>

              <q-select
                filled
                :options="opts.method"
                v-model="form.method"
                label="Attending Method"
                emit-value
                map-options
                dark
              />

              <q-select
                filled
                :options="opts.type"
                v-model="form.type"
                label="Type"
                emit-value
                map-options
                dark
              />
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
            <q-tab name="question" label="Questions" />
            <q-tab name="project" label="Project" />
            <div class="row justify-end full-width q-pr-md">
              <q-btn
                label="Save Application"
                color="accent"
                @click="onClickSave"
              />
            </div>
          </q-tabs>
        </q-card>

        <q-tab-panels v-model="tabs" animated class="q-mt-xl q-pa-none">
          <q-tab-panel name="about" class="q-pa-md">
            <div class="col-12 q-py-sm">
              <div class="text-weight-bold">About</div>
              <div class="text-caption">What is this application is about?</div>
            </div>

            <q-editor
              v-model="form.about"
              min-height="50rem"
              placeholder="About"
            />
          </q-tab-panel>
          <q-tab-panel name="question">
            <div class="col-12 q-py-sm">
              <div class="text-weight-bold">Questions</div>
              <div class="text-caption">
                What do you want to ask the applicants?
              </div>
            </div>

            <q-separator class="q-my-md" />

            <div class="col-12 q-gutter-y-md">
              <div
                v-for="(question, index) in questions"
                :key="index"
                class="q-pa-md bg-light-blue-1"
              >
                <div
                  class="row text-weight-bold text-primary q-my-sm justify-between items-center"
                >
                  Question {{ index + 1 }}
                  <q-btn
                    dense
                    flat
                    label="Delete"
                    text-color="red"
                    @click="onClickDeleteQuestion(index)"
                  />
                </div>
                <q-editor filled v-model="questions[index].text" />
              </div>
            </div>

            <div class="col-12 row justify-end q-py-sm">
              <q-btn
                flat
                @click="onAddNewQuestion"
                label="Add Question"
                color="primary"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="project">
            <div class="col-12 q-py-sm">
              <div class="text-weight-bold">Projects</div>
              <div class="text-caption">
                Project applicants need to complete to proceed with this
                application
              </div>
            </div>

            <q-separator class="q-my-md" />

            <q-list>
              <div v-for="(project, index) in projects" :key="project.id">
                <q-item>
                  <q-item-section>
                    <q-select
                      filled
                      label="Project"
                      :options="projectsOpt"
                      v-model="projects[index].id"
                      emit-value
                      map-options
                      stack-label
                    />
                  </q-item-section>

                  <q-item-section side>
                    <q-btn
                      flat
                      icon="delete"
                      @click="onClickDeleteProject(index)"
                    />
                  </q-item-section>
                </q-item>
              </div>
            </q-list>

            <div class="col-12 row justify-end q-py-sm">
              <q-btn
                flat
                @click="onAddProject"
                label="Add Project"
                color="primary"
              />
            </div>
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
import Project from './../../models/Project';

export default {
  data() {
    return {
      date: date,
      tabs: 'about',
      questions: [],
      addDialog: {
        projectId: '',
      },
      form: {},
      projects: [],
      app: {},
      opts: {
        type: [
          {
            label: 'Program',
            value: 'program',
          },
          {
            label: 'Job Vacancy',
            value: 'job',
          },
        ],
        method: [
          {
            label: 'Online',
            value: 'online',
          },
          {
            label: 'Offline',
            value: 'offline',
          },
        ],
      },
    };
  },

  computed: {
    ...mapGetters(['name', 'userId']),
    projectsOpt() {
      let projects = Project.all();
      const opts = projects.map((project) => {
        const container = [];
        container.label =
          project.title.charAt(0).toUpperCase() + project.title.slice(1);
        container.value = project.id;
        return container;
      });
      return opts;
    },
  },

  mounted() {
    this.loadApplication();
    this.$store.dispatch('GetAllProjects');
    this.$store.dispatch('GetApplicationProject', this.$route.params.id);
  },

  methods: {
    async loadApplication() {
      this.app = await Application.query()
        .withAll()
        .where('id', this.$route.params.id)
        .first();

      this.form = {
        id: this.app.id,
        about: this.app.about,
        createdBy: this.app.createdBy,
        description: this.app.description,
        featured: this.app.featured,
        icon: this.app.icon,
        maxApplied: this.app.maxApplied,
        method: this.app.method,
        minProject: this.app.minProject,
        questions: this.app.questions,
        title: this.app.title,
        type: this.app.type,
      };

      if (!this.form) {
        this.$router.go(-1);
      }

      this.projects = this.app.projects;
      this.questions = this.app.getQuestionsJsonObject;
    },

    onClickDeleteQuestion(index) {
      this.questions.splice(index, 1);
    },

    onAddNewQuestion() {
      this.questions.push({
        text: '',
      });
    },

    onAddProject() {
      this.projects.push({
        id: '',
      });
    },
    async onClickDeleteProject(index) {
      this.projects.splice(index, 1);
    },

    async onClickSave() {
      if (this.questions.length > 0) {
        this.form.questions = JSON.stringify(this.questions);
      }

      if (this.projects.length > 0) {
        let unlinkedProjects = this.app.projects.filter(
          (x) => !this.projects.includes(x)
        );

        for (const upro of unlinkedProjects) {
          await this.$store.dispatch('RemoveProjectToApplication', {
            id: this.$route.params.id,
            projectId: upro.id,
          });
        }

        for (const project of this.projects) {
          await this.$store.dispatch('AddProjectToApplication', {
            id: this.$route.params.id,
            projectId: project.id,
          });
        }
      }

      this.$store.dispatch('UpdateApplication', this.form).then((res) => {
        this.$router.push({ path: '/admin/application' });
      });
    },
  },
};
</script>
