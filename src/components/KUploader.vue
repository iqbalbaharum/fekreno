<script>
import { QUploaderBase } from 'quasar'

export default {
  mixins: [QUploaderBase],

  props: {
    name: {
      type: String,
      default: 'files'
    },
  },

  data() {
    return {
      uploading: false,
      source: null
    }
  },

  computed: {
    isUploading() {
      return this.uploading
    },

    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    isBusy() {
      return this.uploading
    }
  },

  methods: {
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    abort() {
      if (this.source) {
        this.source.cancel('Operation canceled by the user.')
      }
    },

    // [REQUIRED]
    async upload() {
      const url = await this.$store.dispatch('UploadFile', this.files[0])
      this.$emit('fileUrl', url)
    }
  }

}
</script>
