<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Tags Management" />
      </q-breadcrumbs>
    </div>

    <tags-box />
  </div>
</template>

<script>
import TagsBox from './Tab/Tags';

export default {
  components: {
    TagsBox,
  },
};
</script>
