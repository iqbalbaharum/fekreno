<template>
  <div>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn no-caps label="New Application" color="black" icon="add" @click="onClickAddApplication" />
          </div>
        </div>

        <application-list />
      </div>
    </div>

    <q-dialog v-model="dialog.isShow" position="bottom" full-width>
      <q-card>
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Application</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm">
          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Information</div>
            <div class="text-caption">Minimum required by participant to join</div>
          </div>

          <div class="col-12">
            <q-input filled v-model="form.title" label="Title" />
          </div>

          <div class="col-12">
            <q-input type="textarea" filled v-model="form.description" placeholder="Description" />
          </div>

          <div class="col-12">
            <q-select filled :options="opts.type" v-model="form.type" label="Type" emit-value map-options />
          </div>

          <div class="col-12">
            <q-editor v-model="form.about" min-height="10rem" :toolbar="[]" placeholder="About" />
          </div>

          <div class="col-12">
            <q-select filled :options="opts.method" v-model="form.method" label="Attending Method" emit-value map-options />
          </div>

          <q-separator class="q-my-md" />

          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Requirements</div>
            <div class="text-caption">Minimum required by participant to join</div>
          </div>

          <div class="col-3">
            <q-input filled v-model.number="form.minProject" type="number" label="Min Project Completed" />
          </div>

          <div class="col-3">
            <q-input filled v-model.number="form.maxApplied" type="number" label="How many application user can send?" />
          </div>

          <q-separator class="q-my-md" />

          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Questions</div>
            <div class="text-caption">What do you want to ask the applicants?</div>
          </div>

          <div class="col-12 q-gutter-y-md">
            <div v-for="(question, index) in form.questions" :key="index">
              <div class="text-weight-bold text-primary q-my-sm">Question {{ index + 1 }} <q-btn dense flat label="Delete" text-color="red" @click="onClickDeleteQuestion(index)" /></div>
              <q-editor filled v-model="form.questions[index].text" />
            </div>
          </div>

          <div class="col-12 row justify-end q-py-sm">
            <q-btn flat @click="onAddNewQuestion" label="Add Question" color="primary" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ApplicationList from "./../../components/ApplicationList";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        about: "",
        minProject: 0,
        maxApplied: 1,
        icon: "",
        // questions: [
        //   {
        //     text: 'Complete the problem-solving test at <a href="">https://www.mindtools.com/pages/article/newTMC_72.htm</a>. And enter your score below',
        //   },
        //   {
        //     text: "Complete the simple algebra test at https://www.tests.com/practice/algebra-practice-test. And enter your score below.",
        //   },
        // ],
        questions: [],
      },
      dialog: {
        isShow: false,
      },
      opts: {
        type: [
          {
            label: "Program",
            value: "program",
          },
          {
            label: "Job Vacancy",
            value: "job",
          },
        ],
        method: [
          {
            label: "Online",
            value: "online",
          },
          {
            label: "Offline",
            value: "offline",
          },
        ],
      },
    };
  },

  components: {
    ApplicationList,
  },

  created() {
    this.$store.dispatch("GetAllApplications");
  },

  methods: {
    onClickAddApplication() {
      this.dialog.isShow = true;
    },
    async onClickSubmit() {
      try {
        await this.$store.dispatch("AddApplication", this.form);
        this.dialog.isShow = false;
      } catch (e) {
        console.log(e);
      }
    },
    onClickDeleteQuestion(index) {
      this.form.questions.splice(index, 1);
    },
    onAddNewQuestion() {
      this.form.questions.push({
        text: "",
      });
    },
    onClickCancel() {
      this.dialog.isShow = false;
    },
  },
};
</script>
