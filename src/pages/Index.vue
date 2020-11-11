<template>
  <q-page class="flex q-pa-md">
    <div class="full-width row wrap justify-center items-start content-start q-gutter-md">
      <div class="col-10">
        <q-card class="q-pt-md">
          <q-item>
            <q-item-section>
              <q-avatar size="100px" color="primary">
                <img >
              </q-avatar>
            </q-item-section>

            <q-card-actions>
              <q-btn label="Edit Profile" outline color="primary" @click="onClickEditButton" />
            </q-card-actions>
          </q-item>

          <q-card-section>
            <div class="text-weight-semi">{{ userprofile.fullname }}</div>
            <div class="text-weight-bold">@{{ name }}</div>
            <div>
              <a :href="`mailto:${fixed.email}`" target="_blank"><q-btn icon="fas fa-envelope" flat round size="sm"/></a>
              <a :href="userprofile.github" target="_blank"><q-btn icon="fab fa-github" flat round size="sm" /></a>
              <a :href="userprofile.linkedin" target="_blank"><q-btn icon="fab fa-linkedin" flat round size="sm" :to="userprofile.linkedin"/></a>
            </div>
            <span class="text-caption">{{ userprofile.about }}</span>
          </q-card-section>

          <q-tabs
            v-model="tab"
            class="bg-blue-grey-1"
            active-color="black"
            indicator-color="black"
            align="left"
          >
            <q-tab name="overview" label="Overview" />
            <q-tab name="progress" label="Progress" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            
            <q-tab-panel name="overview">
              <overview-tab />
            </q-tab-panel>

            <q-tab-panel name="progress">
              <track-tab />
            </q-tab-panel>

          </q-tab-panels>

        </q-card>
      </div>
    </div>

    <!-- DIALOG -->
    <q-dialog v-model="dialog.show" position="bottom">
      <q-card style="width: 800px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>Update <strong>{{ name }}</strong> Profile</q-item-label>
        </q-item-section>
        
        <q-card-section class="row q-gutter-sm justify-center">  
          <div class="col-12">
            <span class="text-h6">Information</span>
            <div class="text-caption">For us to know you</div>
          </div>

          <q-space />

          <q-input
            filled
            v-model="form.fullname"
            label="Full Name"
            class="col-12"
          />

          <q-input
            filled
            v-model="form.about"
            label="About"
            hint="Tell us anything about you"
            type="textarea"
            class="col-12"
            :rules="[ val => val.length <= 200 || 'Please use maximum 200 characters']"
          />

          <q-input filled v-model="form.birthday" class="col-12">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.birthday" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select filled label="Country" emit-value v-model="form.country" :options="countries" class="col-12">
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section avatar>
                  <q-img :src="scope.opt.flag" />
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-separator class="q-mt-md" />

          <div class="col-12">
            <span class="text-h6">Contact Detail</span>
            <div class="text-caption">For potential employee to contact you</div>
          </div>
          
          <q-space />

          <q-input
            filled
            v-model="fixed.email"
            label="E-mail"
            disable
            class="col-12"
          />

          <q-input
            filled
            v-model="fixed.mobile"
            disable
            label="Mobile"
            class="col-12"
            hint="To change mobile number, please emailed mailing@krenovator.cc"
          />

          <q-input
            filled
            v-model="form.github"
            label="Github"
            hint="Register and account https://www.github.com"
            class="col-12"
          />

          <q-input
            filled
            v-model="form.linkedin"
            label="LinkedIn"
            hint="Register and account https://www.linkedin.com"
            class="col-12"
          />
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Country from './../models/Country'
import OverviewTab from './User/Overview'
import TrackTab from './User/UserTrack'
import UserProfile from './../models/UserProfile'
import { mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'PageIndex',
  data() {
    return {
      tab: 'overview',
      dialog: {
        show: false
      },
      form: {
        birthday: ''
      },
      fixed: {
        mobile: '',
        email: ''
      },
      options: {
        countries: this.countries
      }
    }
  },

  computed: {
    ...mapGetters([
      'name',
      'email',
      'mobile',
      'userId'
    ]),

    userprofile() {
      let profile = UserProfile.query().where('userId', this.$store.getters.userId).first()
      return profile
    },
    countries() {
      let countries = Country.all()
      let countryOptions = countries.map(country => {
        const container = []

        container.label = country.name
        container.value = country.alpha3Code
        container.flag = country.flag
        return container
      })

      return countryOptions
    }
  },

  created() {
    this.$store.dispatch('GetAllCountries')
    this.$store.dispatch('GetUserProfile')
      .then(res => {
        this.form = Object.create(this.userprofile)
        this.form = {
          fullname: this.userprofile.fullname,
          about: this.userprofile.about,
          birthday: date.formatDate(this.userprofile.birthday, 'DD/MM/YYYY'),
          country: this.userprofile.country,
          github: this.userprofile.github ? this.userprofile.github : '',
          linkedin: this.userprofile.linkedin ? this.userprofile.linkedin : ''
        }
      })

    this.fixed.email = this.email
    this.fixed.mobile = this.mobile
  },

  components: {
    OverviewTab,
    TrackTab
  },

  methods: {
    onClickSubmit() {
      this.form.birthday = date.formatDate(this.form.birthday, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      this.$store.dispatch('UpdateUserProfile', this.form)
        .then(res => {
          this.form = {}
          this.dialog.show = false
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClickCancel() {
      this.form = {}
      this.dialog.show = false
    },

    onClickEditButton() {
      this.dialog.show = true
    },

    onDialogOpened(e) {
      this.dialog.show = e
    },
  },
}
</script>
