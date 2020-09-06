<template>
  <div>
    <q-list>
      <q-item-label
        header
        class="text-grey-8"
      >
        Essential Links
      </q-item-label>
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
      'menus'
    ])
  },

  components: {
    EssentialLink
  }
}
</script>
