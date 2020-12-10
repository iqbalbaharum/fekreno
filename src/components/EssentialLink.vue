<template>
  <q-item clickable tag="a" :to="{ path: link }">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" :class="color" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        ><span class="text-weight-medium">{{ title }}</span></q-item-label
      >
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },

    color: {
      type: String,
      default: '',
    },
  },
};
</script>
