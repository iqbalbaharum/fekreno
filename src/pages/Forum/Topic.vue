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
                {{ "3 hours ago" }} &#8226;
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

        <div class="bg-grey-2 border-3 q-pa-md q-my-md">
          <div class="q-mt-md full-width">
            <q-editor filled v-model="form.comment" />
          </div>
          <div class="row justify-end q-py-md">
            <q-btn color="accent" label="Post Comment" @click="onClickComment" />
          </div>
        </div>

        <div class="q-pa-md q-gutter-y-md">
          <q-card v-for="comment in topic.comments" :key="comment.id" flat bordered>
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
import { date } from 'quasar'

export default {
  data() {
    return {
      date: date,
      form: {
        comment: '',
      },
      topic: {
        id: 1,
        title: 'Welcome to Forum',
        description: `
        <blockquote style="margin: 20px 0px; padding: 16px; border: 1px solid rgb(236, 236, 237); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: Inter, sans-serif; vertical-align: baseline; quotes: none; overflow-x: auto; background: rgb(248, 248, 248); border-radius: 4px; color: rgba(0, 0, 0, 0.7); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">
    <p style="margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: baseline;">Note: These community guidelines are replaced by revised guidelines available here: <a href="https://www.kaggle.com/community-guidelines" style="margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: baseline; color: rgb(0, 138, 188); text-decoration: none;">https://www.kaggle.com/community-guidelines</a></p>
</blockquote>
<p style="margin: 20px 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 14px; line-height: inherit; font-family: Inter, sans-serif; vertical-align: baseline; color: rgba(0, 0, 0, 0.7); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">The Kaggle community has a lot of diversity, with members from over 100 countries and skill levels ranging from those learning Python through to the researchers who created deep neural networks. We have had competition winners with backgrounds ranging from computer science to English literature. However, all our users share a common thread: you love working with data.</p>
        `,
        user: {
          name: 'iqbalbaharum',
        },
        meta: {
          lastCommentAt: '2021-02-25T10:08:22+0000',
          by: {
            name: 'iqbalbaharum',
          },
        },
        comments: [
          {
            text: 'hello',
            fromUser: {
              name: 'iqbalbaharum',
            },
            createdAt: '2021-02-25T10:08:22+0000',
          },
        ],
      },
    }
  },

  methods: {
    onClickComment() {
      return
    },
  },
}
</script>
