<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <div class="q-mb-xl">
          <p class="text-h3">Forum</p>
          <div>
            Events and topics specific to our community
          </div>
        </div>

        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn
              no-caps
              label="New Topic"
              color="black"
              icon="add"
              @click="onClickNewTopic"
            />
          </div>
        </div>

        <q-list bordered v-if="topics">
          <q-item class="bg-secondary justify-between items-center">
            <div>
              {{ topics.length }} topics
            </div>
            <q-input filled v-model="form.search" dense shadow-text="Search topic">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item>
          <q-item v-if="topics.length <= 0" class="q-pa-md">
            Currently no available topics
          </q-item>
          <div v-for="(topic, index) in topics" :key="topic.id">

            <q-item
              clickable
              v-ripple
              class="q-pa-md"
              :class="{ 'bg-grey-2': index % 2 == 0 }"
              :to="`/general/${topic.id}`"
            >
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" square>
                  <img src="~assets/ms-icon-310x310.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{
                  topic.title
                }}</q-item-label>
                <q-item-label caption>{{ topic.description }}</q-item-label>
                <q-item-label caption>
                  {{ topic.timeAgo }} &#8226;
                  <span>Posted by <span class="text-primary text-weight-bold cursor-pointer" href="/" v-if="topic.user">@{{ topic.user.name }}</span></span>
                </q-item-label>
              </q-item-section>
              <q-item-section class="text-center">
                <q-item-label caption>Last comment {{ '29m ago' }}</q-item-label>
                <q-item-label caption>by <span class="text-primary text-weight-bold cursor-pointer" href="/" v-if="topic.meta">@{{ topic.meta.by.name }}</span></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-section class="text-center">
                  <span class="text-h6 text-weight-bold">{{ topic.comments }}</span>
                  <span class="text-caption">comments</span>
                </q-item-section>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import Topic from 'src/models/Topic'

export default {
  data() {
    return {
      form: {
        search: ''
      },
    }
  },

  computed: {
    topics() {
      return Topic.query().withAll().orderBy('updatedAt', 'desc').get()
    }
  },

  created() {
    this.$store.dispatch('GetAllTopics')
  },

  methods: {
    onClickNewTopic() {
      this.$router.push({ path: '/general/new'})
    }
  },
}
</script>