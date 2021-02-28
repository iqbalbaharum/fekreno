<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <q-card flat bordered>
          <q-item>
            <q-item-section avatar class="q-py-sm">
              <q-avatar color="primary" text-color="white" square>
                <img src="~assets/ms-icon-310x310.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-capitalize">{{
                topic.title
              }}</q-item-label>
              <q-item-label caption>
                {{ topic.timeAgo }} &#8226;
                <span
                  >Posted by
                  <span class="text-primary text-weight-bold cursor-pointer" href="/"
                    >@{{ topic.user.name }}</span
                  ></span
                >
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <span v-html="topic.description" />
          </q-item>
        </q-card>

        <div class="row justify-between q-mb-md q-mt-xl">
          <span class="text-body1"
            >Comments <span class="text-grey-6">({{ topic.notes.length }})</span></span
          >
        </div>

        <div class="border-3 q-pa-md row" v-if="userId">
          <div class="col-1 row justify-center">
            <q-avatar>
              <img :src="avatar" />
            </q-avatar>
          </div>
          <div class="col">
            <div class="q-mt-md">
              <q-editor filled v-model="form.text" />
            </div>
            <div class="row justify-end q-py-md">
              <q-btn color="accent" label="Post Comment" @click="onClickComment" />
            </div>
          </div>
        </div>

        <div class="q-px-md q-pt-sm q-gutter-y-md">
          <q-card v-for="comment in topic.notes" :key="comment.id" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-primary text-weight-bold">{{
                  comment.fromUser.name
                }}</q-item-label>
                <q-item-label caption>{{
                  date.formatDate(comment.createdAt, "DD MMM YYYY HH:MM A")
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal class="q-mb-lg">
              <q-card-section v-html="comment.text"> </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import Topic from "src/models/Topic";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      date: date,
      form: {
        id: this.$route.params.id,
        text: "",
        sentiment: "",
      },
    };
  },

  computed: {
    ...mapGetters(["userId", "avatar"]),

    topic() {
      return Topic.query()
        .where("id", this.$route.params.id)
        .withAll()
        .with("notes.*")
        .orderBy("createdAt", "DESC")
        .first();
    },
  },

  created() {
    if (!this.topic) {
      this.$store.dispatch("GetTopicById", this.$route.params.id);
    }

    this.$store.dispatch("GetAllUsers");
    this.$store.dispatch("GetTopicNotes", this.$route.params.id);
  },

  methods: {
    async onClickComment() {
      await this.$store.dispatch("AddNotesToTopic", this.form);

      this.form = {
        id: this.$route.params.id,
        text: "",
        sentiment: "",
      };
    },
  },
};
</script>
