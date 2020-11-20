<template>
  <div>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn no-caps label="New Project" color="black" icon="add" @click="onClickAddProject" />
          </div>
        </div>

        <project-list />
      </div>
    </div>

    <q-dialog v-model="dialog.isShow" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Project</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">
          <div class="col-12">
            <q-input filled v-model="form.title" label="Title" />
          </div>

          <div class="col-12">
            <q-input type="textarea" filled v-model="form.description" placeholder="Description" />
          </div>

          <div class="col-12">
            <q-editor v-model="form.requirements" min-height="10rem" :toolbar="[]" placeholder="Requirements" />
          </div>

          <div class="col-12">
            <q-input filled v-model="form.icon" label="Icon URL" />
          </div>
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProjectList from "./../../components/ProjectList";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        requirements: "",
        active: false,
        icon: "",
      },
      dialog: {
        isShow: false,
      },
    };
  },

  components: {
    ProjectList,
  },

  created() {
    this.$store.dispatch("GetAllProjects");
  },

  methods: {
    onClickAddProject() {
      this.dialog.isShow = true;
    },
    async onClickSubmit() {
      try {
        await this.$store.dispatch("AddProject", this.form);
        this.dialog.isShow = false;
      } catch (e) {
        console.log(e);
      }
    },
    onClickCancel() {
      this.dialog.isShow = false;
    },
  },
};
</script>
