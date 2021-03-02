<template>
  <q-dialog v-model="isOpen">
    <q-card class="my-card" flat bordered style="width: 45%">
      <q-item class="bg-primary text-white">
        <q-item-section>
          <q-item-label class="text-body1">Add Tags</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="q-pa-none">
          <q-separator />

          <q-input
            v-model="form.search"
            dense
            borderless
            class="q-pa-sm"
            shadow-text="Search Tag"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-separator />

          <q-list>
            <q-item
              v-for="pTag in parentTags"
              :key="pTag.id"
              clickable
              v-ripple
              @click="onClickParentTag(pTag)"
            >
              <q-item-section class="text-capitalize">{{ pTag.label }}</q-item-section>

              <q-item-section side>
                <q-icon class="text-weight-bold" name="chevron_right" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator />
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col q-pa-none">
          <div v-if="childTags.length <= 0" class="q-pa-md">
            Apply up to 5 tags to help other to find your topic.
          </div>
          <q-list v-else>
            <q-item
              v-for="cTag in childTags"
              :key="cTag.value"
              clickable
              v-ripple
              @click="onClickChildTag(cTag)"
            >
              <q-item-section class="text-capitalize">{{ cTag.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-item>
        <q-chip
          removable
          color="primary"
          text-color="white"
          square
          v-for="(stag, index) in tags"
          :key="stag.id"
          @remove="onHandleRemoveSelectedTag(index)"
        >
          {{ stag.label }}
        </q-chip>
      </q-item>

      <q-separator />

      <q-item class="row justify-end">
        <q-btn label="Apply" color="primary" @click="onHandleClickApply" />
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script>
import Tag from "src/models/Tag";

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 2,
    },
  },

  data() {
    return {
      form: {
        search: "",
      },
      childTags: [],
      tags: [],
    };
  },

  computed: {
    parentTags() {
      let tags = Tag.query().where("parentTagsId", "").get();
      return tags.map((tag) => {
        return {
          label: tag.title,
          value: tag.id,
        };
      });
    },
    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  created() {
    if (this.parentTags.length <= 0) {
      this.$store.dispatch("GetAllTags");
    }
  },

  methods: {
    onClickParentTag(tag) {
      let children = Tag.query().where("parentTagsId", tag.value).get();
      this.childTags = children.map((child) => {
        return {
          label: child.title,
          value: child.id,
        };
      });
    },
    onClickChildTag(tag) {
      if (this.tags.length < this.max) {
        if (this.tags.map((t) => t.value).indexOf(tag.value) <= -1) {
          this.tags.push(tag);
        }
      }
    },
    onHandleRemoveSelectedTag(index) {
      this.tags.splice(index, 1);
    },
    onHandleClickApply() {
      this.$emit("selected-tags", this.tags);
      this.$emit("input", false);
    },
  },
};
</script>
