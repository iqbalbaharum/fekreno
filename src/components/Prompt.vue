<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card style="width: 350px; max-width: 80vw">
        <q-card-section
          class="text-center text-white"
          :class="{
            'bg-positive': boxtype === 'success',
            'bg-negative': boxtype === 'alert',
            'bg-warning': boxtype === 'warning',
          }"
        >
          <q-icon :name="icon" color="white" style="font-size: 6.4em" />
        </q-card-section>

        <q-card-section class="text-center q-gutter-sm q-mt-sm q-mb-sm">
          <div class="text-h5 q-mb-sm">{{ title }}</div>
          <span class="text-caption">{{ body }}</span>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="bg-white text-dark q-pa-sm">
          <q-btn
            v-if="buttons.includes('ok')"
            flat
            label="OK"
            @click="onClickOK"
          />
          <q-btn
            v-if="buttons.includes('delete')"
            flat
            text-color="negative"
            label="Delete"
            color="negative"
            @click="onClickDelete"
          />
          <q-btn
            v-if="buttons.includes('cancel')"
            flat
            label="Cancel"
            @click="onClickCancel"
          />
          <q-btn
            v-if="buttons.includes('continue')"
            flat
            text-color="positive"
            label="Continue"
            @click="onClickContinue"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    boxtype: {
      type: String,
      default: 'success',
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onClickOK() {
      this.$emit('ok');
      this.$emit('update:show', false);
      this.show = false;
    },

    onClickCancel() {
      this.$emit('update:show', false);
      this.show = false;
    },

    onClickDelete() {
      this.$emit('delete');
      this.$emit('update:show', false);
      this.show = false;
    },

    onClickContinue() {
      this.$emit('continue');
      this.$emit('update:show', false);
      this.show = false;
    },
  },
};
</script>