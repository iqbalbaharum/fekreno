<template>
  <div class="fullscreen row">
    <div class="col"></div>
    <div class="col bg-primary"></div>
    <div class="fullscreen flex flex-center">
      <q-card class="q-pa-md" style="width:400px;">
        <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/krenovator.png" />
          <div class="text-h4 text-primary">Create New Password</div>
        </div>

        <div class="q-gutter-sm">
          <q-input
            filled
            v-model="form.password"
            ref="password"
            :type="type"
            label="New Password"
						:error="$v.form.password.$error"
						error-message="Password can't be empty"
          >
						<template v-slot:append>
							<q-btn round flat icon="remove_red_eye" @click="onClickShowPassword" />
						</template>

					</q-input>

          <div class="q-gutter-sm flex flex-center">
            <q-btn
							@click="submitPwd()"
              color="primary"
              text-color="white"
              label="Submit"
              no-caps
            />
          </div>
        </div>
      </q-card>

			<prompt
				:show="dialog.success"
				boxtype="success"
				:buttons="['continue']"
				icon="fas fa-check-circle"
				title="Password Successfully Changed"
				body="Congratulations, your password has been succesfully created"
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
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Prompt from './../../components/Prompt';

export default {
  data() {
    return {
      form: {
				// get token from url
				token: this.$route.params.token,
				password: ''
			},
			type: 'password',
			dialog: {
				success: false,
				alert: false
			}
    };
  },

	components: { Prompt },

  validations: {
    form: {
			password: { required }
		}
  },

  methods: {
		submitPwd() {
			this.$v.form.$touch();

			if(this.$v.form.$invalid) {
				return this.dialog.alert = true
			} else {
				this.$store.dispatch('CreateNewPassword', this.form)
					.then(res => {
						this.dialog.success = true;
					})
					.catch(err => {
						console.log(err)
					})
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
