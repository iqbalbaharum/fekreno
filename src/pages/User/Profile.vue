<template>
  <div class="q-pa-md">
    <q-form
      class="q-gutter-md"
    >
      <div class="text-h6">Personal Information</div>
      <q-input
        filled
        v-model="form.name"
        label="Full Name"
      />

      <q-input
        filled
        v-model="form.about"
        label="About"
        hint="Tell us anything about you"
        type="textarea"
      />

      <q-input
        filled
        v-model="form.birthday"
        type="date"
        hint="Birthday"
      />

      <q-select filled emit-value label="Country" v-model="form.country" :options="countries">
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section avatar>
              <q-img :src="scope.opt.flag" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.name" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-separator class="q-my-md" />
      <div class="text-h6">Contact Detail</div>

      <q-input
        filled
        v-model="form.email"
        label="E-mail"
        disable
      />

      <q-input
        filled
        v-model="form.mobile"
        label="Mobile"
      />

      <q-input
        filled
        v-model="form.github"
        label="Github"
        hint="Register and account https://www.github.com"
      />

      <q-input
        filled
        v-model="form.linkedin"
        label="LinkedIn"
        hint="Register and account https://www.linkedin.com"
      />

      <!-- <q-separator class="q-my-md" />
      <div class="q-gutter-md">
        <div class="text-h6">Working Experience</div>
      </div>

      <div>
        <q-list padding>
          <q-item>
            <q-item-section avatar top>
              <q-avatar icon="folder" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Close Loop Sdn Bhd</q-item-label>
              <q-item-label caption>Programmer (2020 - Current)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div> -->

      <q-separator class="q-my-md" />

      <div>
        <q-btn label="Save" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import Country from './../../models/Country'
export default {
  data() {
    return {
      form: {
        about: '',
        country: ''
      },

      options: {
        countries: this.countries
      }
    }
  },

  computed: {
    countries() {
      let countries = Country.all()
      let countryOptions = countries.map(country => {
        const container = []

        container.label = country.name
        container.value = country.alpha3code

        return container
      })
      return countries
    }
  },

  created() {
    this.$store.dispatch('GetAllCountries')
  },
}
</script>