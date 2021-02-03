<template>
  <q-page v-if="repository">
    <div class="q-pa-md q-gutter-sm">
      <div class="row q-pa-md">
        <div class="col-xl-12 col-md-12">
          <q-card flat>
            <q-item class="q-py-md">
              <q-item-section avatar top>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="2" class="text-weight-bold">
                  <a target="_blank" :href="repository.giturl">{{
                    repository.giturl
                  }}</a>
                </q-item-label>
                <q-item-label lines="3" class="text-caption">
                  {{ repository.timeAgo }} &#8226;
                  <span class="text-caption"
                    >Posted by @{{ repository.user.name }}</span
                  >
                </q-item-label>
                <q-item-label lines="4" caption class="q-gutter-x-sm">
                  <q-icon name="fas fa-tag" />
                  <span class="text-caption" v-for="(tag) in repository.tags" :key="tag.id">
                    <q-badge color="blue-4">{{tag.title}}</q-badge>
                  </span>
                </q-item-label>
              </q-item-section>

              <q-item-section side> </q-item-section>
            </q-item>
          </q-card>

          <q-separator inset />

          <q-card class="q-py-md" flat>
            <q-splitter v-model="splitterModel" style="height: 85vh">
              <template v-slot:before>
                <q-tab-panels
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="description">
                    <span v-html="repository.description" />
                  </q-tab-panel>
                  <q-tab-panel name="comment">
                    <div class="bg-grey-2 border-3 q-pa-md q-my-md">
                      <div class="q-mt-md full-width">
                        <q-editor filled v-model="form.comment" />
                      </div>
                      <div class="row justify-end q-py-md">
                        <q-btn
                          color="accent"
                          label="Post Comment"
                          @click="onClickComment"
                        />
                      </div>
                    </div>
                    <div class="q-pa-md q-gutter-y-md">
                      <q-card
                        v-for="comment in repository.notes"
                        :key="comment.id"
                        flat
                        bordered
                      >
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar>
                              <img
                                src="https://cdn.quasar.dev/img/avatar2.jpg"
                              />
                            </q-avatar>
                          </q-item-section>

                          <q-item-section>
                            <q-item-label
                              class="text-primary text-weight-bold"
                              >{{ comment.fromUser.name }}</q-item-label
                            >
                            <q-item-label caption>{{
                              date.formatDate(
                                comment.createdAt,
                                'DD MMM YYYY HH:MM A'
                              )
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-card-section horizontal class="q-mb-lg">
                          <q-card-section v-html="comment.text">
                          </q-card-section>
                        </q-card-section>
                      </q-card>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
              <template v-slot:after>
                <q-tabs
                  v-model="tab"
                  vertical
                  class="text-primary"
                  align="left"
                >
                  <q-tab name="description" label="Description" />
                  <q-tab name="comment" label="Comment" />
                </q-tabs>
              </template>
            </q-splitter>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Repository from 'src/models/Repository';
import RepositoryNote from 'src/models/RepositoryNote';
import Note from '../../models/Note';
import Tag from '../../models/Tag';


import { date } from 'quasar';

export default {
  data() {
    return {
      date: date,
      splitterModel: 80,
      form: {
        comment: '',
      },
      tab: 'comment',
      title:'',
    };
  },

  computed: {
    repository() {
      let app = Repository.query()
        .whereId(this.$route.params.id)
        .withAll()
        .with('notes.*')
        .orderBy('notes.createdAt','DESC')
        .first();

      return app;
    }
  },

  created() {
    this.$store.dispatch('GetAllUsers');
    this.$store.dispatch('GetRepositoryTags', this.$route.params.id);
    this.$store.dispatch('GetRepositoryNote', this.$route.params.id);
  },

  methods: {
    onClickComment() {
      this.$store.dispatch('AddRepositoryNote', {
        id: this.repository.id,
        from: this.repository.user.uuid,
        text: this.form.comment,
      })
      .then((res)=>{
        this.resetForm();
      })
      .catch((e)=>{
        console.log(e);
      });
    },
    resetForm() {
      this.form = {
        comment: '',
      }
    },
  },
};
</script>