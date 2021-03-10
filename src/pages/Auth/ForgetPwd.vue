<template>
  <div class="fullscreen row">
    <div class="col"></div>
    <div class="col bg-primary"></div>
    <div class="fullscreen flex flex-center">
      <q-card class="q-pa-md" style="width:400px;">
        <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/krenovator.png" />
          <div class="text-h4 text-primary">Forget Password</div>
          <!-- <div class="text-caption">Sign In to your account</div> -->
        </div>

        <div class="q-gutter-sm">
          <q-input
            filled
            v-model="email"
            ref="email"
            :error="$v.email.$error"
            error-message="Need a valid email"
            placeholder="Insert your email here..."
          />
          <p v-if="submitStatus === 'OK'">Email successfully submitted!</p>
          <p v-if="submitStatus === 'ERROR'">Please insert email that you use in creating Krenovator Account.</p>
          <p v-if="submitStatus === 'PENDING'">Sending...</p>


          <div class="q-gutter-sm flex flex-center">
            <q-btn @click="sendEmail()" color="primary" text-color="white" label="Submit" no-caps />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      submitStatus: null
    }
  },

  validations: {
    email: { required, email }
  },

  methods: {
    sendEmail() {
      // validation of data
      this.$v.email.$touch()

      if(this.$v.$invalid){
        this.submitStatus = 'Error'
      } else {
        //state management - actions
        this.$store.dispatch('ForgetPwd', this.email) 
          .then(res => {
            this.submitStatus = 'PENDING', setTimeout(() => { this.submitStatus = 'OK' }, 500)
          }) 
          .catch(err => { 
            console.log(err)

            // if there is an error, it will display error message
            if(err){ 
              this.submitStatus = 'ERROR' 
            }
          })
      }
    }
  }
}
</script>
