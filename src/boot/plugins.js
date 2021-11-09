// import something here

import Vuelidate from "vuelidate"

import Calendar from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ Vue })  => {
  Vue.use(Vuelidate)
  Vue.use(Calendar)
}

