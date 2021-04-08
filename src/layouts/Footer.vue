<template>
  <q-footer class="bg-primary text-white">
    <div class="row">
    <div class="q-pa-lg q-ma-lg q-px-xl">
      
      <q-toolbar>
        <div class="q-pa-lg q-mr-lg">
      <q-img src="~assets/ms-icon-310x310.png" style="width:100px; height:100px;"></q-img>
      </div>

<div class="col-md-4 q-gutter-sm">
  <div class="col">
      <q-btn stretch flat label="Hire Talents" @click="$router.replace('/Hire')" />
  </div>
  <div class="col">
      <q-btn stretch flat label="Tech Skill Accelerator" @click="$router.replace('/TSA')" />
  </div>
  <div class="col">
      <q-btn stretch flat label="Krenofication" @click="$router.replace('/Krenofication')" />
  </div>
</div>

<div class="col-md-3 q-gutter-sm">
   <div class="col">
      <q-btn stretch flat label="Blog" @click="$router.replace('/Blog')"/>
  </div>
  <div class="col">
      <q-btn stretch flat label="About us" @click="$router.replace('/Homepage')" />
  </div>
  <div class="col">
      <q-btn stretch flat label="Contact us" @click="$router.replace('/Homepage')" />
  </div>
</div>

<div class="col-md-3 q-gutter-sm">
     <div class="col">
      <q-btn stretch flat label="Terms of use" @click="$router.replace('/Terms')"/>
  </div>
  <div class="col">
      <q-btn stretch flat label="Privacy policy" @click="$router.replace('/Privacy')"/>
  </div>
  <div class="col">
      <q-btn stretch flat label="FAQ" @click="$router.replace('/FAQ')"/>
  </div>
</div>

        <div class="col-md-4 q-gutter-sm q-pa-lg">
          <div class="row">
            <div class="col">
              <q-icon src="~public/icons/facebook-icon.png" @click="$router.replace('/FAQ')" />
              <q-icon src="~public/icons/facebook-icon.png" @click="$router.replace('/FAQ')" />
              <q-icon src="~public/icons/facebook-icon.png" @click="$router.replace('/FAQ')" />
        </div>
          </div>
        </div>
      </q-toolbar>
      </div>
      </div>
      
  </q-footer>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

