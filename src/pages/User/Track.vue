<template>
  <div class="">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Track" to="/track" />
        <q-breadcrumbs-el :label="track.title" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md q-pt-lg q-pb-lg bg-secondary text-white">
      <div class="text-h4">{{ track.title }}</div>
      <div class="q-mt-sm">{{ track.description }}</div>
      <div class="q-mt-md row justify-end">
        <q-btn color="accent" :loading="joinLoading" @click="onClickJoin">
          Join the {{ track.title }} Track
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>
      </div>
    </div>
    <div class="q-pa-lg">
      {{ track.about }}
    </div>
    <!-- Project -->
    <div class="q-pa-lg">
      <q-stepper
        v-model="stepIndex"
        vertical
        color="primary"
        header-nav
        animated
      >
        <q-step
          :name="1"
          title="Calculator"
          icon="settings"
          :done="true"
          done-color="deep-orange"
        >
          A calculator is one of the most popular beginner projects to learn.  Creating a calculator gives you practice writing a layout, logic that reads numbers or symbols from the layout, and logic that processes the information to get a result. It's simple enough to start and challenging enough to make you think when you test the calculator and realize what goes into it.

          <q-stepper-navigation class="q-gutter-sm">
            <q-btn @click="stepIndex = 2" color="warning" label="Submission" />
            <q-btn @click="createJournal()" color="positive" label="Journal" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Dice Rolling Simulator"
          caption="Optional"
          icon="create_new_folder"
          done-color="deep-orange"
          :done="true"
        >
          Like the title suggests, this project involves writing a program that simulates rolling dice. When the program runs, it will randomly choose a number between 1 and 6. (Or whatever other integer you prefer — the number of sides on the die is up to you.) The program will print what that number is. It should then ask you if you’d like to roll again. For this project, you’ll need to set the min and max number that your dice can produce. For the average die, that means a minimum of 1 and a maximum of 6. You’ll also want a function that randomly grabs a number within that range and prints it.

          <q-stepper-navigation class="q-gutter-sm">
            <q-btn @click="createJournal()" color="positive" label="Journal" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Dice Rolling Simulator"
          caption="Optional"
          icon="create_new_folder"
          :done="false"
        >
          Like the title suggests, this project involves writing a program that simulates rolling dice. When the program runs, it will randomly choose a number between 1 and 6. (Or whatever other integer you prefer — the number of sides on the die is up to you.) The program will print what that number is. It should then ask you if you’d like to roll again. For this project, you’ll need to set the min and max number that your dice can produce. For the average die, that means a minimum of 1 and a maximum of 6. You’ll also want a function that randomly grabs a number within that range and prints it.

          <q-stepper-navigation class="q-gutter-sm">
            <q-btn @click="createJournal()" color="positive" label="Journal" />
          </q-stepper-navigation>
        </q-step>
        
      </q-stepper>
    </div>
  </div>
</template>

<script>
import Track from './../../models/Track'

export default {
  data() {
    return {
      joinLoading: false,
      stepIndex: 1,
    }
  },

  computed: {
    track() {
      return Track.find(this.$route.params.id)
    },
  },

  methods: {
    async onClickJoin() {

      this.joinLoading = true

      await this.$store.dispatch('JoinTrack', this.track.id)
        .then(res => {
          this.joinLoading = false
        })
        .catch(err => {
          this.joinLoading = false
        })
    }
  },

  createJournal() {

  }
}
</script>