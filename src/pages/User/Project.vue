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
            <div class="text-caption text-right">Project</div>
          </q-card-section>
          <q-card-section>
            <div class="q-py-sm">
              <div class="text-h5">{{ project.title }}</div>
              <div class="text-caption">{{ project.description }}</div>

              <div class="q-mt-sm">{{ repositories.length }} repositories</div>
            </div>
          </q-card-section>
          <q-tabs
            v-model="tabs"
            class="bg-white text-black"
            active-color="primary"
            indicator-color="primary"
            align="left"
            flat
          >
            <q-tab name="requirement" label="Requirements" />
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
              <div
                v-for="(repository, index) in repositories"
                :key="repository.id"
              >
                <q-item v-ripple :to="`/repository/${repository.id}`">
                  <!-- <q-item-section avatar top>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
                  </q-item-section> -->

                  <q-item-section top>
                    <q-item-label lines="2" class="text-weight-bold">
                      <a target="_blank" :href="repository.giturl">{{
                        repository.giturl
                      }}</a>
                    </q-item-label>
                    <q-item-label lines="3" class="text-caption">
                      {{ repository.timeAgo }} &#8226;
                      <span class="text-caption"
                        >Posted by @{{ repository.user.name }}</span
                      >
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="text-capitalize" side>
                    {{ repository.position.title }}
                  </q-item-section>
                </q-item>

                <q-separator v-if="index !== repositories.length - 1" />
              </div>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="submission">
            <q-list bordered class="q-py-md">
              <q-item>
                Make a submission for
                <span class="text-weight-bold text-primary">@{{ name }}</span>
              </q-item>
              <q-item class="column q-gutter-y-md">
                <div class="col q-gutter-y-sm">
                  <div class="text-h6">
                    Step 1: Whats role do you take for this submission?
                  </div>
                  <div class="text-grey-5">
                    For this submission, what role do you take.
                  </div>
                  <q-select
                    filled
                    v-model="form.positionId"
                    :options="positions"
                    label="Development Role"
                    emit-value
                    map-options
                    stack-label
                  />
                </div>
                <div class="col q-gutter-y-sm">
                  <div class="text-h6">Step 2: Submission Link</div>
                  <div class="text-grey-5">
                    Paste your git repository link below
                  </div>
                  <q-input
                    filled
                    v-model="form.giturl"
                    placeholder="Project URL"
                  />
                </div>
                <div class="col q-gutter-y-sm">
                  <div class="text-h6">Step 3: Describe submission</div>
                  <div class="text-grey-5">
                    Put in what tools you use to complete this submission. Or
                    your any of reference links in assisting this solution.
                  </div>
                  <div class="col-12">
                    <q-editor
                      v-model="form.description"
                      min-height="10rem"
                      placeholder="Briefly describe your submission"
                    />
                  </div>
                </div>
                <div class="col q-gutter-y-sm">
                  <div class="text-h6">
                    Step 4: Add tagings
                  </div>
                  <div class="text-grey-5">
                    Add your tagings for the project you want to submit.
                  </div>
                  <q-select
                    filled
                    v-model="form.tagIds"
                    :options="tags"
                    label="Tagings"
                    emit-value
                    map-options
                    use-chips
                    multiple
                    stack-label
                  />
                </div>
              </q-item>

              <q-item class="q-pa-md row justify-center">
                <q-btn
                  label="Make Submission"
                  color="primary"
                  @click="onClickSubmit"
                />
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import Project from './../../models/Project';
import Environment from './../../models/DevEnvironment';
import Position from './../../models/Position';
import Repository from './../../models/Repository';
import Tag from './../../models/Tag';

export default {
  computed: {
    ...mapGetters(['name']),
    project() {
      return Project.find(this.$route.params.id);
    },
    repositories() {
      return Repository.query()
        .where('projectId', this.$route.params.id)
        .withAll()
        .get();
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
    tags() {
      let tags = Tag.all();
      let opts = tags.map((tag) => {
        const container = [];
        container.label = tag.title;
        container.value = tag.id;
        return container;
      });

      return opts;
    },
  },

  data() {
    return {
      tabs: 'requirement',
      form: {
        giturl: '',
        description: '',
        projectId: this.$route.params.id,
        devEnvironmentId: '',
      },
    };
  },

  created() {
    this.$store.dispatch('GetAllRepositories');
    this.$store.dispatch('GetAllEnvironments');
    this.$store.dispatch('GetAllPositions');
    this.$store.dispatch('GetAllTags');
  },

  methods: {
    async onClickSubmit() {
      try {
        await this.$store.dispatch('AddRepository', this.form);
        this.$router.push({ path: '/projects' });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
