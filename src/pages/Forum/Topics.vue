<template>
  <q-page>
    <div class="row q-pa-xl">
      <div class="col-8">
        <div class="q-mb-xl">
          <p class="text-h3">Krenovator Forum</p>
          <div>
            Events and topics specific to our community
          </div>
        </div>

        <q-list bordered>
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
                  {{ '3 hours ago' }} &#8226;
                  <span>Posted by <span class="text-primary text-weight-bold cursor-pointer" href="/">@{{ topic.user.name }}</span></span>
                </q-item-label>
              </q-item-section>
              <q-item-section class="text-center">
                <q-item-label caption>Last comment {{ '29m ago' }}</q-item-label>
                <q-item-label caption>by <span class="text-primary text-weight-bold cursor-pointer" href="/">@{{ topic.meta.by.name }}</span></q-item-label>
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
export default {
  data() {
    return {
      form: {
        search: ''
      },
      topics: [
        {
          id: 1,
          title: 'Welcome to Forum',
          description: 'Welcoming message for everyone',
          user: {
            name: 'iqbalbaharum'
          },
          meta: {
            lastCommentAt: '2021-02-25T10:08:22+0000',
            by: {
              name: 'iqbalbaharum'
            }
          },
          comments: 30
        },
        {
          id: 1,
          title: 'How to use the forum',
          description: 'use this with care',
          user: {
            name: 'iqbalbaharum'
          },
          meta: {
            lastCommentAt: '2021-02-25T10:08:22+0000',
            by: {
              name: 'iqbalbaharum'
            }
          },
          comments: 30
        }
      ],
    }
  },
}
</script>