<template>
  <q-list bordered class="q-py-md" v-if="userprofile">
    <q-item class="text-grey-5"> Account ID #{{ userId }} </q-item>
    <q-separator />
    <q-form class="q-pa-md q-gutter-md">
      <q-input filled v-model="form.fullname" label="Full Name" />

      <q-input filled v-model="form.about" label="About" hint="Tell us anything about you" type="textarea" />

      <q-input filled v-model="form.birthday" type="date" hint="Birthday" />

      <q-select filled emit-value label="Country" v-model="form.country" :options="countries">
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
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
    </q-form>

    <q-separator spaced />

    <q-item> Contact Detail </q-item>

    <q-separator />

    <q-form class="q-pa-md q-gutter-md">
      <q-input filled v-model="fixed.email" label="E-mail" disable />

      <q-input filled v-model="fixed.mobile" label="Mobile" disable />

      <q-input filled v-model="form.github" label="Github" hint="Register an account https://www.github.com" />

      <q-input filled v-model="form.linkedin" label="LinkedIn" hint="Register an account https://www.linkedin.com" />

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
        <q-btn label="Save" type="submit" color="primary" @click="onClickSubmit" />
      </div>
    </q-form>
  </q-list>
</template>

<script>
import Country from "./../../models/Country";
import UserProfile from "./../../models/UserProfile";
import { mapGetters } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {
      form: {
        birthday: "",
      },
      fixed: {
        mobile: "",
        email: "",
      },
      options: {
        countries: this.countries,
      },
    };
  },

  computed: {
    ...mapGetters(["userId", "name", "mobile", "email"]),

    userprofile() {
      let profile = UserProfile.query().where("userId", this.userId).first();
      return profile;
    },
    countries() {
      let countries = Country.all();
      let countryOptions = countries.map((country) => {
        const container = [];

        container.label = country.name;
        container.value = country.alpha3Code;
        container.flag = country.flag;
        return container;
      });

      return countryOptions;
    },
  },

  created() {
    this.$store.dispatch("GetAllCountries");
    this.$store.dispatch("GetUserProfile").then((res) => {
      this.form = Object.create(this.userprofile);
      this.form = {
        fullname: this.userprofile.fullname,
        about: this.userprofile.about,
        birthday: date.formatDate(this.userprofile.birthday, "DD/MM/YYYY"),
        country: this.userprofile.country,
        github: this.userprofile.github ? this.userprofile.github : "",
        linkedin: this.userprofile.linkedin ? this.userprofile.linkedin : "",
      };
    });

    this.fixed.email = this.email;
    this.fixed.mobile = this.mobile;
  },

  methods: {
    onClickSubmit() {
      this.form.birthday = date.formatDate(this.form.birthday, "YYYY-MM-DDTHH:mm:ss.SSSZ");
      this.$store
        .dispatch("UpdateUserProfile", this.form)
        .then((res) => {
          this.form = {};
          this.dialog.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
