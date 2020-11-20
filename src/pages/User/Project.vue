<template>
  <q-page v-if="project">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Projects" to="/projects" />
        <q-breadcrumbs-el label="Project" />
      </q-breadcrumbs>
    </div>
    <div class="row">
      <div class="col-8 q-pa-xl">
        <q-card class="bg-black text-white full-width">
          <q-card-section>
            <div class="q-py-sm">
              <div class="text-h5">{{ project.title }}</div>
              <div class="text-caption">{{ project.description }}</div>

              <div class="q-mt-sm">5 repositories &#8226; 2 months ago</div>
            </div>
          </q-card-section>
          <q-tabs v-model="tabs" class="bg-white text-black" active-color="primary" indicator-color="primary" align="left" flat>
            <q-tab name="requirement" label="Requirement" />
            <q-tab name="repository" label="Repositories" />
            <q-tab name="submission" label="Submission" />
          </q-tabs>
        </q-card>

        <q-tab-panels v-model="tabs" animated class="q-mt-xl q-pa-none">
          <q-tab-panel name="requirement" class="q-pa-md">
            <span v-html="project.requirements" />
          </q-tab-panel>

          <q-tab-panel name="repository">
            <q-list bordered>
              <q-item-label header>Repositories</q-item-label>

              <div v-for="repository in repositories" :key="repository.id">
                <q-item>
                  <q-item-section avatar top>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section top>
                    <q-item-label lines="2" class="text-weight-bold">
                      <a target="_blank" :href="repository.giturl">{{ repository.giturl }}</a>
                    </q-item-label>
                    <q-item-label lines="3" class="text-caption">
                      {{ repository.timeAgo }} &#8226;
                      <span class="text-caption">Posted by @{{ repository.user.name }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-btn outline color="grey-5" label="5" icon="chat" />
                  </q-item-section>
                </q-item>

                <q-separator />
              </div>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="submission">
            <q-list bordered class="q-py-md">
              <q-item>
                Make a submission for <span class="text-weight-bold text-primary">@{{ name }}</span>
              </q-item>
              <q-item class="column q-gutter-y-md">
                <div class="col q-gutter-y-md">
                  <div class="text-h6">Step 1: Upload Submission</div>
                  <q-input filled v-model="form.giturl" placeholder="Project URL" />
                </div>
                <div class="col q-gutter-y-md">
                  <div class="text-h6">Step 2: Describe submission</div>
                  <q-select filled v-model="form.devEnvironmentId" :options="environments" label="Development Language" emit-value />
                  <q-input filled v-model="form.framework" placeholder="Framework" />
                  <div class="col-12">
                    <q-editor v-model="form.description" min-height="10rem" placeholder="Briefly describe your submission" />
                  </div>
                </div>
              </q-item>

              <q-item class="q-pa-md row justify-center">
                <q-btn label="Make Submission" color="primary" @click="onClickSubmit" />
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
import Project from "./../../models/Project";
import Environment from "./../../models/DevEnvironment";
import Position from "./../../models/Position";
import Repository from "./../../models/Repository";

export default {
  computed: {
    ...mapGetters(["name"]),
    project() {
      return Project.find(this.$route.params.id);
    },
    repositories() {
      return Repository.query().withAll().get();
    },
    environments() {
      let environments = Environment.all();
      let opts = environments.map((env) => {
        const container = [];
        container.label = `${env.language} (${env.version})`;
        container.value = env.id;
        return container;
      });

      return opts;
    },
    positions() {
      let positions = Position.all();
      let opts = positions.map((pos) => {
        const container = [];
        container.label = pos.title;
        container.value = pos.id;
        return container;
      });

      return opts;
    },
  },

  data() {
    return {
      tabs: "requirement",
      form: {
        giturl: "",
        description: "",
        projectId: this.$route.params.id,
        devEnvironmentId: "",
      },
    };
  },

  created() {
    this.$store.dispatch("GetAllRepositories");
    this.$store.dispatch("GetAllEnvironments");
    this.$store.dispatch("GetAllPositions");
  },

  methods: {
    async onClickSubmit() {
      try {
        await this.$store.dispatch("AddRepository", this.form);
        this.$router.push({ path: "/projects" });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
