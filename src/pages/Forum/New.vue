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
            <div class="col">
              <q-select
                v-model="form.tags"
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
                  <q-chip
                    removable
                    :tabindex="scope.tabindex"
                    @remove="scope.removeAtIndex(scope.index)"
                    square
                    color="secondary"
                  >
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
                  <q-editor filled v-model="form.descripton" />
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

    <k-tag-dialog :open.sync="isFilterDialogOpened" />
  </q-page>
</template>

<script>

export default {
  data() {
    return {
      form: {
        title: '',
        descripton: '',
        tags: []
      },
      options: [],
      isFilterDialogOpened: true
    }
  },

  methods: {
    onClickPublish() {
      this.$store.dispatch('AddTopic', this.form)
        .then(res => {
          this.$router.push({ path: '/general' })
        })
    }
  },
}
</script>