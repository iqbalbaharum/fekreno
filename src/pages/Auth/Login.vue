<template>
  <div class="fullscreen row">
    <div class="col">
    </div>
    <div class="col bg-primary">
    </div>
    <div class="fullscreen flex flex-center">
      <q-card class="q-pa-md" style="width:400px;">
        <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/krenovator.png"/>
          <div class="text-h4 text-primary">Hello!</div>
          <div class="text-caption">Sign In to your account</div>
        </div>

        <div class="q-gutter-sm">
          <q-input
            filled
            standout
            label="Email"
            color="text-white"
            v-model.trim="form.email"
            ref="email"
            :error="$v.form.email.$error"
            error-message="Need a valid email"
          />

          <q-input
            filled
            standout
            label="Password"
            color="text-white"
            v-model="form.password"
            :type=type
            ref="password"
            @keyup.enter="login"
            :error="$v.form.password.$error"
            error-message="Password is required"
            bottom-slots
          >
            <template v-slot:append>
              <q-btn round flat icon="remove_red_eye" @click="onClickShowPassword" />
            </template>

          </q-input>

          <div class="q-gutter-sm flex flex-center">
            <q-btn
              color="primary"
              text-color="white"
              label="Sign In"
              no-caps
              @click="login"
            />
          </div>
          <div class="q-gutter-sm flex flex-center">
            <q-btn
              color="primary"
              text-color="primary"
              flat
              to="/forget"
              label="I forgot my password"
              no-caps />

            <q-btn
              color="primary"
              text-color="primary"
              flat
              to="/register"
              label="Not register? Create account"
              no-caps />
          </div>
        </div>

      </q-card>
    </div>
  </div>
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      type: 'password',
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) }
    }
  },

  methods: {
    login() {
      this.$v.form.$touch()

      this.$store.dispatch('Login', this.form)
        .then(res => {
          this.$router.push({ path: '/' })       
        })
        .catch(err => {
          console.log(err)
        })
    },

    onClickShowPassword() {
      if(this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>
