<template>
  <q-list bordered class="q-pa-md" v-if="user.profile">
    <div
      class="text-weight-bold text-uppercase text-grey-4 items-center q-py-md"
    >
      Account ID #{{ userId }}
    </div>

    <div class="q-gutter-y-md">
      <q-input filled v-model="form.fullname" label="Full Name" />

      <q-input
        filled
        v-model="form.about"
        label="About"
        hint="Tell us anything about you"
        type="textarea"
      />

      <q-input filled v-model="form.birthday" type="date" hint="Birthday" />

      <q-select
        filled
        emit-value
        label="Country"
        v-model="form.country"
        :options="countries"
        map-options
        stack-label
      />
    </div>

    <div
      class="text-weight-bold text-uppercase text-grey-4 items-center q-py-md"
    >
      Contact Detail
    </div>

    <q-separator />

    <div class="q-gutter-y-md">
      <q-input filled v-model="fixed.email" label="E-mail" disable />

      <q-input filled v-model="fixed.mobile" label="Mobile" disable />

      <q-input
        filled
        v-model="form.github"
        label="Github"
        hint="Register an account https://www.github.com"
      />

      <q-input
        filled
        v-model="form.linkedin"
        label="LinkedIn"
        hint="Register an account https://www.linkedin.com"
      />

      <q-input
        filled
        v-model="form.telegram"
        label="Telegram ID"
        hint="Optional. But it will help a lot in communication"
      />
    </div>
    <q-separator class="q-my-md" />

    <div class="row justify-center">
      <q-btn
        label="Save"
        type="submit"
        color="primary"
        @click="onClickSubmit"
      />
    </div>
  </q-list>
</template>

<script>
import Country from './../../models/Country';
import User from './../../models/User';
import UserProfile from './../../models/UserProfile';
import { mapGetters } from 'vuex';
import { date } from 'quasar';

export default {
  data() {
    return {
      form: {
        birthday: '',
      },
      fixed: {
        mobile: '',
        email: '',
      },
      options: {
        countries: this.countries,
      },
    };
  },

  computed: {
    ...mapGetters(['userId', 'name', 'mobile', 'email']),

    user() {
      return User.query().with('profile').where('uuid', this.userId).first();
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
    this.$store.dispatch('GetAllCountries');
    this.loadUserProfile();

    this.fixed.email = this.email;
    this.fixed.mobile = this.mobile;
  },

  methods: {
    loadUserProfile() {
      this.$store.dispatch('GetUserProfile').then((res) => {
        this.form = Object.create(this.user.profile);
        this.form = {
          fullname: this.user.profile.fullname,
          about: this.user.profile.about,
          birthday: date.formatDate(this.user.profile.birthday, 'YYYY-MM-DD'),
          country: this.user.profile.country,
          github: this.user.profile.github ? this.user.profile.github : '',
          linkedin: this.user.profile.linkedin
            ? this.user.profile.linkedin
            : '',
          telegram: this.user.profile.telegram
            ? this.user.profile.telegram
            : '',
        };
      });
    },
    onClickSubmit() {
      this.form.birthday = date.formatDate(
        this.form.birthday,
        'YYYY-MM-DDTHH:mm:ss.SSSZ'
      );

      this.$store
        .dispatch('UpdateUserProfile', this.form)
        .then((res) => {
          this.loadUserProfile();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
