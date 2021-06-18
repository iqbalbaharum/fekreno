<template>
   <div class="window-height window-width row wrap justify-center items-center">

     <div class="column">
      <div class="row">
        
      <q-card >
        <q-card-section horizontal>
          <q-card-section class="col-7 q-pa-xl">
        <div class="text-center q-pa-lg q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/krenovator.png" style="width:200px"/>
          <div class="text-h4 text-weight-bold text-primary">Welcome Back!</div>
          <div class="text-subtitle">Sign In to your account</div>
        </div>

        <div class="q-gutter-sm">
          <q-input
            outlined
            standout
            dense
            label="Email"
            color="text-white"
            v-model.trim="form.email"
            ref="email"
            :error="$v.form.email.$error"
            error-message="Need a valid email"
          />

          <q-input
            outlined
            standout
            dense
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
              color="cyan"
              text-color="white"
              label="SIGN IN"
              no-caps
              @click="login">
              <img src="~assets/Group 274.png" class="q-pl-md"/>
            </q-btn>
          </div>
         
        </div>
          </q-card-section>
 
  
<div class="col-5 q-pa-xl bg-primary content-center">
<q-card-section class="text-white text-center q-pt-xl" >
   <div class="text-weight-medium q-pt-xl text-h5">Hello!</div>
  <div class="text-caption">Be part of our tech talents and have fun with us!</div>

  <div class="q-gutter-sm q-pa-lg">
            <q-btn
              color="cyan"
              text-color="white"
              label="SIGN UP"
              no-caps
              @click="login">
              <img src="~assets/Group 274.png" class="q-pl-md"/>
            </q-btn>
          </div>

        </q-card-section>
</div>
        </q-card-section>
      </q-card>

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
