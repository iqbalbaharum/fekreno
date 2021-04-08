<template>
  <div class="fullscreen row">
    <div class="col-md-3">

    <div class="fullscreen flex flex-center q-pa-xl ">
      <div class="col-xs-12 col-md-3">

      <q-card class="bg-primary q-pa-md text-center text-white">
        <q-card-section class="q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/FrameKreno.png" style="width:200px" />
          <div class="text-h5 text-weight-bold">Create Your Account</div>
     
        <div class="q-gutter-sm q-px-xl">

          <q-input
          dark
            outlined
            dense
            v-model.trim="form.name"
            label="Username"
            ref="name"
            error-message="Username can't be empty"
            :error="$v.form.name.$error"
            @keydown.space.prevent
          />

          <q-input
            dark
            dense
            outlined
            v-model.trim="form.email"
            label="Email Address"
            ref="email"
            :error="$v.form.email.$error"
            error-message="Enter a valid email"
          />

          <q-input
          dark
          dense
            outlined
            v-model.trim="form.mobile"
            label="Mobile"
            ref="mobile"
            :error="$v.form.mobile.$error"
            error-message="Enter a valid mobile"
          />

          <q-input
          dark
          dense
            outlined
            v-model="form.password"
            :type="type"
            ref="password"
            label="Password"
            :error="$v.form.password.$error"
            error-message="Password can't be empty"
          >
            <template v-slot:append>
              <q-btn
                round
                flat
                icon="remove_red_eye"
                @click="onClickShowPassword"
              />
            </template>

          </q-input>
        
        
            <div class="text-caption text-weight-light">
            By clicking the Sign Up button, you have agreed with our Terms & <br>Conditions and the usage of cookies.  
            </div>
        </div>
         

          <div class="q-pa-md">
            <q-btn
              color="cyan"
              text-color="white"
              label="SIGN UP"
              no-caps
              @click="onClickRegister">
              <img src="~assets/Group 274.png" class="q-pl-md"/>
            </q-btn>
          </div>
        
            <div>
              <span class="text-center">Already a member?</span>        
           </div>
            </q-card-section>

      </q-card>

      <prompt
        :show="dialog.success"
        boxtype="success"
        :buttons="['continue']"
        icon="fas fa-check-circle"
        title="Registration Successful"
        body="Congratulations, your account has been succesfully created"
        @continue="onClickContinue"
      />
      
      <prompt
        :show="dialog.alert"
        boxtype="alert"
        :buttons="['ok']"
        icon="fas fa-bomb"
        title="Registration Error"
        body="Oh no, please contact customer service"
        @ok="onClickOk"
      />

    </div>
  </div>
    </div>
  </div>
  
  
</template>

<script>
import { minLength, required, email } from 'vuelidate/lib/validators';
import Prompt from './../../components/Prompt';

export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
      type: 'password',
      dialog: {
        success: false,
        alert: false,
      }
    };
  },

  components: {
    Prompt
  },

  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required },
      mobile: { required }
    }
  },

  methods: {
    async onClickRegister() {
      this.$v.form.$touch();

      if (this.$v.form.$invalid) {
        return this.dialog.alert = true
      }

      try {
        let res = await this.$store.dispatch('RegisterIndividual', this.form);
        this.dialog.success = true;
      } catch (err) {
        if (err) {
          this.dialog.alert = true;
        }
      }
    },

    onClickShowPassword() {
      if (this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    },

    onClickOk() {
      this.dialog.alert = false;
    },

    onClickContinue() {
      this.$router.push('/login');
    }
  }
};
</script>
