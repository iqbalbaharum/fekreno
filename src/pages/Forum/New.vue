<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <div class="q-mb-xl">
          <p class="text-h3">Forum</p>
        </div>

        <q-card flat bordered>
          <q-item class="q-pa-md">
            <div class="col">
              <q-input
                filled
                v-model="form.title"
                placeholder="Title"
                hint="Be specific and imagine you’re asking a question to another person"
              />
            </div>
          </q-item>
          <q-item>
            <div class="col" @click="onHandleClickTags">
              <q-select
                v-model="selectedTags"
                multiple
                outlined
                hide-dropdown-icon
                :options="options"
                use-chips
                emit-value
                map-options
                label="Tags"
                hint="Add up to 5 tags to describe what your topic is about"
              >
                <template v-slot:selected-item="scope">
                  <q-chip :tabindex="scope.tabindex" square color="secondary">
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>
            </div>
          </q-item>
          <q-item>
            <div class="col">
              <div class="bg-grey-2 border-3 q-pa-md">
                <div class="q-mt-md full-width">
                  <q-editor filled v-model="form.description" />
                </div>
              </div>
            </div>
          </q-item>
          <q-item class="row justify-end q-py-md">
            <q-btn color="accent" label="Publish Topic" @click="onClickPublish" />
          </q-item>
        </q-card>
      </div>
    </div>

    <k-tag-dialog v-model="isFilterDialogOpened" @selected-tags="onHandleSelectedTags" />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        tagIds: [],
      },
      selectedTags: [],
      options: [],
      isFilterDialogOpened: false,
    };
  },

  methods: {
    onClickPublish() {
      if (this.selectedTags.length) {
        this.form.tagIds = this.selectedTags.map((tag) => tag.value);
      }

      this.$store.dispatch("AddTopic", this.form).then((res) => {
        this.$router.push({ path: "/general" });
      });
    },
    onHandleSelectedTags(tags) {
      this.selectedTags = tags;
    },
    onHandleClickTags() {
      this.isFilterDialogOpened = true;
    },
  },
};
</script>
