<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal class="transparent">
      <div class="q-pa-lg q-px-xl">
      <q-toolbar>
      <q-img src="~assets/krenovator.png" style="width:300px; height:50px;"></q-img>

      <q-btn-dropdown stretch flat label="School" class="text-black">
      </q-btn-dropdown>

      <q-btn-dropdown stretch flat label="Business" class="text-black">
      </q-btn-dropdown>

      <q-btn flat label ="Blog" class="text-black">
      </q-btn>
<q-space />
        <div>
          <q-btn flat class="text-black" @click="onClickLogout">Logout</q-btn>
        </div>
      </q-toolbar>
      </div>
    </q-header>

    <q-page-container style="background-color: #fafafa;">
      <router-view />
    </q-page-container>
  
    <k-footer />
  </q-layout>
</template>

<script>
import KFooter from './Footer'

export default {
  name: 'WebLayout',
  components: {
      KFooter
  },
  data () {
  },

  methods: {
    onClickLogout() {
      this.$store.dispatch('Logout')
      this.$router.push('/login')
    }
  },
}
</script>
