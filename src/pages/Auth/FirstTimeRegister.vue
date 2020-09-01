<template>
  <div>
    <div class="q-pa-lg">
      <div class="text-h4 text-weight-bold text-primary">Create Account</div>
    </div>
    <div class="fullscreen q-pa-lg flex flex-center">
      <div>

        <q-input
          outlined
          v-model.trim="form.username"
          label="username"
          ref="username"
          error-message="Username can't be empty"
          :error="$v.form.username.$error"
        />

        <q-input
          outlined
          v-model.trim="form.email"
          label="Email Address"
          ref="email"
          :error="$v.form.email.$error"
          error-message="Enter a valid email"
        />

        <q-input
          outlined
          v-model="form.password"
          :type=type
          ref="password"
          label="Create Your Own Password"
          :error="$v.form.password.$error"
          error-message="Password can't be empty"
        >
          <template v-slot:append>
            <q-btn round flat icon="remove_red_eye" @click="onClickShowPassword" />
          </template>
        </q-input>


        <div class="q-mt-md q-gutter-sm text-center">
          <q-btn
            color="blue"
            text-color="white"
            to="/"
            label="Register"
            no-caps
            @click="register"
          />

        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form : {
        username: '',
        password: '',
        email: '',
      }
    }
  },

  validations: {
    form: {
      username: { required },
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    register() {

    },

    onClickShowPassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>
