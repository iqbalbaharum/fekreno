<template>
  <q-page>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Material" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md row justify-end">
      <q-btn
        @click="onClickAddMaterial"
        color="primary"
        icon="fas fa-plus"
        label="Material"
      />
    </div>

    <div class="row">
      <div class="col">
        <q-list separator flat>
          <q-scroll-area style="height: 100vh">
            <q-item
              v-for="material in materials"
              :key="material.id"
              class="q-pa-md"
            >
              <q-item-section avatar top>
                <q-avatar color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-bold">{{ material.user.name }}</span>
                  shared
                  <span class="text-weight-bold text-capitalize">{{
                    material.type
                  }}</span>
                  <span class="text-caption q-ml-md">{{
                    timeDifference(material.createdAt)
                  }}</span>
                </q-item-label>
                <q-item-label caption lines="2">
                  <q-card bordered class="rounded-borders">
                    <q-card-section>
                      <div class="text-h6 ellipsis text-capitalize">
                        <a target="_blank" :href="material.url">{{
                          material.title
                        }}</a>
                        <q-btn
                          flat
                          label="Edit"
                          v-if="userId === material.userId"
                          @click="onClickEdit(material)"
                        />
                      </div>
                      <div class="q-mt-md">
                        <div class="text-grey overflow-auto">
                          <span v-html="material.description" />
                        </div>
                      </div>
                    </q-card-section>

                    <q-card-section bottom class="text-caption q-gutter-x-sm">
                      <q-icon
                        name="fas fa-circle"
                        :class="{
                          'text-primary': material.reviewStatus === 'pending',
                          'text-positive': material.reviewStatus === 'good',
                          'text-negative': material.reviewStatus === 'bad',
                        }"
                      />
                      <span class="text-capitalize">{{
                        material.reviewStatus
                      }}</span>
                    </q-card-section>

                    <q-card-section v-if="material.remark">
                      <q-card flat class="q-pa-md bg-teal-1 overflow-auto">
                        <span v-html="material.remark" />
                      </q-card>
                    </q-card-section>
                  </q-card>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>
      </div>
      <div class="col-4 q-pa-md q-gutter-y-sm text-">
        <!-- <div class="q-gutter-x-sm">
          <span class="text-h5">My Materials</span>
          <q-btn dense@click="onClickAddMaterial" color="primary" icon="fas fa-plus" label="Material" />
        </div>
        <div v-for="(material) in materials" :key="material.id" class="q-gutter-x-sm">
          <q-icon name="fas fa-tag" />
          <a :href="material.url" target="_blank" class="text-weight-bold text-blue" style="text-decoration: none">
            {{ `${material.title}` }}
          </a>
        </div> -->
      </div>
    </div>

    <q-dialog v-model="dialog.show" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Material</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">
          <div class="col-12">
            <q-input filled v-model="form.title" label="Title" />
          </div>

          <div class="col-12">
            <q-select
              filled
              v-model="form.type"
              emit-value
              :options="options"
              label="Type"
            />
          </div>

          <div class="col-12">
            <q-input filled v-model="form.url" label="URL" />
          </div>

          <div class="col-12">
            <q-editor
              v-model="form.description"
              min-height="5rem"
              :toolbar="[]"
              label="Description"
            />
          </div>
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat round icon="delete" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Material from "./../../models/Material";
import { date } from "quasar";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      date: date,
      form: {
        description: "",
      },
      dialog: {
        show: false,
        update: false,
      },
      options: [
        {
          label: "Book",
          value: "book",
        },
        {
          label: "Tutorial",
          value: "tutorial",
        },
        {
          label: "Video",
          value: "video",
        },
        {
          label: "Document",
          value: "document",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
    };
  },

  computed: {
    materials() {
      return Material.query().withAll().get();
    },
    ...mapGetters(["userId"]),
  },

  created() {
    this.$store.dispatch("GetAllMaterials");
  },

  components: {},

  methods: {
    onClickAddMaterial() {
      this.form = {
        description: "",
      };
      this.dialog.show = true;
      this.dialog.update = false;
    },

    onClickSubmit() {
      let func;

      if (this.dialog.update) {
        func = "UpdateMaterial";
      } else {
        func = "AddMaterial";
      }

      this.$store
        .dispatch(func, this.form)
        .then((res) => {
          this.form = {};
          this.dialog.show = false;
          this.dialog.update = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onClickCancel() {
      this.dialog.show = false;
    },

    onClickEdit(material) {
      this.form = {
        materialId: material.id,
        title: material.title,
        type: material.type,
        url: material.url,
        description: material.description,
        reviewStatus: "pending",
        remark: "",
      };

      this.dialog.show = true;
      this.dialog.update = true;
    },

    timeDifference(previous) {
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = new Date() - new Date(previous);

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return (
          "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
        );
      } else {
        return (
          "approximately " + Math.round(elapsed / msPerYear) + " years ago"
        );
      }
    },
  },
};
</script>
