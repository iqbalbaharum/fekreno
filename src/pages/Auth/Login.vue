<template>
  <div>
    <div class="fullscreen column bg-blue text-white">
      <div class="col-2 q-pa-lg flex flex-center">
        BALJS
      </div>
      <div class="col item-centers text-center q-pa-md flex flex-center">
        <div>
          <form class="q-col-gutter-y-md">
           <q-input
            dark
            outlined
            standout
            label="Email"
            color="text-white"
            v-model.trim="form.email"
            ref="email"
            :error="$v.form.email.$error"
            error-message="Need a valid email"
          />

          <q-input
            dark
            outlined
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

          <div class="q-gutter-sm">
            <q-btn
              color="white"
              text-color="blue"
              label="Sign In"
              no-caps
              @click="login"
            />
            <q-btn
              color="white"
              text-color="white"
              outline
              unelevated
              to="/register"
              label="Create Account"
              no-caps
            />
          </div>
          <div class="q-mt-sm">
            <q-btn
              color="white"
              text-color="white"
              flat
              to="/forget"
              label="I forgot my password"
              no-caps />
          </div>

          </form>
        </div>
      </div>

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
