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
          <div class="text-caption">
            Page will coming soon... Psst be part of us by click the register button.
          </div>
        </div>

        <div class="flex flex-center">
          <q-btn to="/login" color="primary" label="Login" />          
        </div>

        <div class="q-gutter-sm flex flex-center">
          <q-btn
            color="primary"
            text-color="primary"
            flat
            to="/register"
            label="Not register? Create account"
            no-caps />
        </div>
      </q-card>
    </div>
  </div>
</template>