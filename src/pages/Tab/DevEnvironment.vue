<template>
  <div>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn color="primary" text-color="white" :label="`New Environment`" @click="isCreateDialogOpened = true" />
          </div>
        </div>

        <q-table :data="environments" :columns="columns" row-key="name" />
      </div>
    </div>

    <q-dialog v-model="isCreateDialogOpened" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Project</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">
          <div class="col-12">
            <q-input filled v-model="form.language" label="Language" />
          </div>
          <div class="col-12">
            <q-input filled v-model="form.version" label="Version" />
          </div>
          <div class="col-12">
            <q-toggle v-model="form.active" color="primary" label="Active" checked-icon="check" unchecked-icon="clear" left-label />
          </div>
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onAdd" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import DevEnvironment from "./../../models/DevEnvironment";

export default {
  data() {
    return {
      isCreateDialogOpened: false,
      columns: [
        { name: "id", align: "left", label: "ID", field: "id" },
        {
          name: "language",
          align: "left",
          label: "Language",
          field: "language",
          sortable: true,
        },
        {
          name: "version",
          align: "left",
          label: "Version",
          field: "version",
        },
        {
          name: "active",
          align: "center",
          label: "Active?",
          field: "active",
        },
        // { name: 'icon', align: 'left', label: 'Icon', field: 'icon', sortable: true },
        {
          name: "createdAt",
          align: "left",
          label: "Created At",
          field: "createdAt",
          sortable: true,
        },
      ],
      form: {
        language: "",
        version: "",
        active: true,
      },
    };
  },

  computed: {
    environments() {
      return DevEnvironment.all();
    },
  },

  created() {
    this.$store.dispatch("GetAllEnvironments");
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch("DeleteEnvironment", id);
    },
    async onAdd() {
      await this.$store.dispatch("AddEnvironment", this.form);
      this.isCreateDialogOpened = false;
      this.resetForm();
    },
    onClickCancel() {
      this.isCreateDialogOpened = false;
    },
    resetForm() {
      this.form = {
        language: "",
        version: "",
        active: true,
      };
    },
  },
};
</script>
