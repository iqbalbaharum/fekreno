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
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
    </q-list>

  </div>
</template>

<script>
import EssentialLink from '../components/EssentialLink'

export default {
  data() {
    return {

    }
  },

  components: {
    EssentialLink
  }
}
</script>
