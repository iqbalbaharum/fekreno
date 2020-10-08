<template>
  <div>
    <q-list>
      <q-separator spaced inset />

      <q-item>
        <q-item-section side top>
          <q-avatar color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label><span class="text-weight-medium">@iqbalbaharum</span></q-item-label>
          <q-item-label lines="2"><span class="text-primary">Student</span></q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-rippple>
        <q-item-section>New Messages</q-item-section>
        <q-item-section side>
          <q-badge color="warning">0</q-badge>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <EssentialLink
        v-for="link in menus"
        :key="link.meta.title"
        :title="link.meta.title"
        :caption="link.meta.title"
        :link="link.path"
        :icon="link.meta.icon"
      />
    </q-list>

  </div>
</template>

<script>
import EssentialLink from '../components/EssentialLink'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'menus',
      'name'
    ])
  },

  components: {
    EssentialLink
  }
}
</script>
