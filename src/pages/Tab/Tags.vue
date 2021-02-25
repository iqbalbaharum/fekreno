<template>
  <div>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn color="primary" text-color="white" :label="`New Tags`" @click="isCreateDialogOpened = true" />
          </div>
        </div>

        <q-table :data="tags" :columns="columns" row-key="name" />
      </div>
    </div>

    <q-dialog v-model="isCreateDialogOpened" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Tags</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">
          <div class="col-12">
            <q-input filled v-model="form.title" label="Title" />
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
import Tag from './../../models/Tag';

export default {
  data() {
    return {
      isCreateDialogOpened: false,
      columns: [
        { name: 'id', align: 'left', label: 'ID', field: 'id' },
        {
          name: 'title',
          align: 'left',
          label: 'Title',
          field: 'title',
          sortable: true,
        },
        // { name: 'icon', align: 'left', label: 'Icon', field: 'icon', sortable: true },
        {
          name: 'createdAt',
          align: 'left',
          label: 'Created At',
          field: 'createdAt',
          sortable: true,
        },
      ],
      form: {
        title: '',
      },
    };
  },

  computed: {
    tags() {
      return Tag.all();
    },
  },

  created() {
    this.$store.dispatch('GetAllTags');
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteTags', id);
    },
    async onAdd() {
      try {
        await this.$store.dispatch('AddTags', this.form);
        this.isCreateDialogOpened = false;
        this.resetForm();
      } catch (e) {
        console.log(e);
      }
    },
    onClickCancel() {
      this.isCreateDialogOpened = false;
    },
    resetForm() {
      this.form = {
        title: '',
      };
    },
  },
};
</script>
