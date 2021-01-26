<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Tag Management" />
      </q-breadcrumbs>
    </div>

    <tag-box />
  </div>
</template>

<script>
import TagBox from "./Tab/Tags";

export default {
  components: {
    TagBox,
  },
};
</script>
