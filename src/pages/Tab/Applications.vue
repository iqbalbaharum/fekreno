<template>
  <div>
    <div class="row">
      <div class="col-8 q-pa-lg">
        <div class="q-mb-md">
          <div class="row justify-end q-py-md">
            <q-btn
              no-caps
              label="New Application"
              color="black"
              icon="add"
              @click="onClickAddApplication"
            />
          </div>
        </div>

        <q-list bordered>
          <div
            v-for="(application, index) in applications"
            :key="application.id"
          >
            <q-item class="q-pa-md">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" square>
                  <img src="~assets/ms-icon-310x310.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold ellipsis-2-lines">{{
                  application.title
                }}</q-item-label>
                <q-item-label caption>{{
                  application.description
                }}</q-item-label>
                <q-item-label caption class="text-capitalize"
                  >{{ application.type }} &#8226;
                  <span>{{ application.method }}</span>
                  <span v-if="application.location">
                    &#8226; {{ application.location }}</span
                  >
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  color="primary"
                  label="Edit"
                  icon="edit"
                  class="full-width"
                  align="right"
                  v-if="application.status === 'draft'"
                  :to="`application/${application.id}`"
                />
                <q-btn
                  flat
                  color="positive"
                  label="Go Live"
                  icon="fas fa-check-circle"
                  class="full-width"
                  align="right"
                  v-if="application.status === 'draft'"
                  @click="onClickActivateDialog(application.id)"
                />
                <q-btn
                  flat
                  color="primary"
                  label="Close Application"
                  icon="fas fa-check-circle"
                  class="full-width"
                  align="right"
                  v-if="application.status === 'active'"
                  @click="onClickCloseDialog(application.id)"
                />
                <q-btn
                  flat
                  color="warning"
                  label="Deactivate"
                  icon="warning"
                  class="full-width"
                  align="right"
                  v-if="application.status === 'active'"
                  @click="onClickDeactivate(application.id)"
                />
                <q-btn
                  flat
                  color="black"
                  label="Participants"
                  icon="people"
                  class="full-width"
                  align="right"
                  :to="`participants/${application.id}`"
                />
              </q-item-section>
            </q-item>

            <q-separator inset="item" v-if="index < applications.length - 1" />
          </div>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="dialog.isShow" position="bottom" full-width>
      <q-card>
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Application</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm">
          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Information</div>
            <div class="text-caption">
              Minimum required by participant to join
            </div>
          </div>

          <div class="col-12">
            <q-input filled v-model="form.title" label="Title" />
          </div>

          <div class="col-12">
            <q-input
              type="textarea"
              filled
              v-model="form.description"
              placeholder="Description"
            />
          </div>

          <div class="col-12">
            <q-select
              filled
              :options="opts.type"
              v-model="form.type"
              label="Type"
              emit-value
              map-options
            />
          </div>

          <div class="col-12">
            <q-editor
              v-model="form.about"
              min-height="10rem"
              :toolbar="[]"
              placeholder="About"
            />
          </div>

          <div class="col-12">
            <q-select
              filled
              :options="opts.method"
              v-model="form.method"
              label="Attending Method"
              emit-value
              map-options
            />
          </div>

          <q-separator class="q-my-md" />

          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Requirements</div>
            <div class="text-caption">
              Minimum required by participant to join
            </div>
          </div>

          <div class="col-3">
            <q-input
              filled
              v-model.number="form.minProject"
              type="number"
              label="Min Project Completed"
            />
          </div>

          <div class="col-3">
            <q-input
              filled
              v-model.number="form.maxApplied"
              type="number"
              label="How many application user can send?"
            />
          </div>

          <q-separator class="q-my-md" />

          <div class="col-12 q-py-sm">
            <div class="text-weight-bold">Questions</div>
            <div class="text-caption">
              What do you want to ask the applicants?
            </div>
          </div>

          <div class="col-12 q-gutter-y-md">
            <div v-for="(question, index) in form.questions" :key="index">
              <div class="text-weight-bold text-primary q-my-sm">
                Question {{ index + 1 }}
                <q-btn
                  dense
                  flat
                  label="Delete"
                  text-color="red"
                  @click="onClickDeleteQuestion(index)"
                />
              </div>
              <q-editor filled v-model="form.questions[index].text" />
            </div>
          </div>

          <div class="col-12 row justify-end q-py-sm">
              <q-btn
                flat
                @click="onAddNewQuestion"
                label="Add Question"
                color="primary"
              />
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.activate.show">
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="text-h6">Are you sure?</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <span>Make this application live and accessible by public</span>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-dark">
          <q-btn flat label="Cancel" @click="onClickActivateCancel" />
          <q-btn
            flat
            label="Go Live"
            color="primary"
            @click="onClickConfirmActivate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog.deactivate.show">
      <q-card class="bg-warning text-black">
        <q-card-section>
          <div class="text-h6">Are you sure?</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <span
            >Do you really want to deactivate this application? This process
            cannot be undone</span
          >
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-dark">
          <q-btn flat label="Cancel" @click="onClickDeactivateCancel" />
          <q-btn
            flat
            label="Deactivate"
            color="warning"
            @click="onClickConfirmDeactivate"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog position="bottom" v-model="dialog.close.show" persistent>
      <q-card style="width: 490px">
        <q-card-section class="bg-primary text-white">
          To close application, select successful candidates below.
        </q-card-section>
        <q-list bordered separator class="q-pa-md">
          <div v-for="uapp in userapplications" :key="uapp.id">
            <template v-if="uapp.user">
              <q-item>
                <q-item-section>
                  <q-item-label>{{ uapp.user.name }}</q-item-label>
                  <q-item-label caption>{{ uapp.user.email }}</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-checkbox
                    v-model="dialog.close.acceptedIds"
                    :val="uapp.id"
                  />
                </q-item-section>
              </q-item>
            </template>
          </div>
        </q-list>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="onClickCloseCancel" />
          <q-btn
            flat
            label="Close Application"
            color="positive"
            @click="onClickConfirmClose"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import UserApplication from 'src/models/UserApplication';
import Application from './../../models/Application';

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        about: '',
        minProject: 0,
        maxApplied: 1,
        icon: '',
        questions: [],
      },
      dialog: {
        isShow: false,
        activate: {
          show: false,
          id: '',
        },
        deactivate: {
          show: false,
          id: '',
        },
        close: {
          show: false,
          id: '',
          acceptedIds: [],
        },
      },
      opts: {
        type: [
          {
            label: 'Program',
            value: 'program',
          },
          {
            label: 'Job Vacancy',
            value: 'job',
          },
        ],
        method: [
          {
            label: 'Online',
            value: 'online',
          },
          {
            label: 'Offline',
            value: 'offline',
          },
        ],
      },
    };
  },

  components: {},

  created() {
    this.$store.dispatch('GetAllApplications');
    this.$store.dispatch('GetAllUserApplications');
  },

  computed: {
    applications() {
      return Application.query().withAll().get();
    },
    userapplications() {
      if (!this.dialog.close.id) {
        return [];
      }

      return UserApplication.query()
        .where('applicationId', this.dialog.close.id)
        .where('status', 'submitted')
        .withAll()
        .get();
    },
  },

  methods: {
    onClickAddApplication() {
      this.dialog.isShow = true;
    },
    async onClickSubmit() {
      try {
        await this.$store.dispatch('AddApplication', this.form);
        this.dialog.isShow = false;
      } catch (e) {
        console.log(e);
      }
    },
    onClickCancel() {
      this.dialog.isShow = false;
    },

    onClickActivateCancel() {
      this.dialog.activate = {
        id: '',
        show: false,
      };
    },

    onClickDeactivateCancel() {
      this.dialog.deactivate = {
        id: '',
        show: false,
      };
    },

    onClickActivateDialog(id) {
      this.dialog.activate.id = id;
      this.dialog.activate.show = true;
    },

    onClickDeactivate(id) {
      this.dialog.deactivate.id = id;
      this.dialog.deactivate.show = true;
    },

    onClickCloseDialog(id) {
      this.dialog.close.id = id;
      this.dialog.close.show = true;
    },

    onClickCloseCancel() {
      this.dialog.close = {
        id: '',
        show: false,
        acceptedIds: [],
      };
    },

    onClickDeleteQuestion(index) {
      this.form.questions.splice(index, 1);
    },

    onAddNewQuestion() {
      this.form.questions.push({
        text: '',
      });
    },

    async onClickConfirmActivate() {
      let res = await this.$store.dispatch('ActivateApplication', {
        id: this.dialog.activate.id,
      });

      if (res) {
        this.dialog.activate = {
          id: '',
          show: false,
        };
      }
    },

    async onClickConfirmDeactivate() {
      let res = await this.$store.dispatch('DeactivateApplication', {
        id: this.dialog.deactivate.id,
      });

      if (res) {
        this.dialog.deactivate = {
          show: false,
        };
      }
    },

    async onClickConfirmClose() {
      let res = await this.$store.dispatch('CloseApplication', {
        id: this.dialog.close.id,
        acceptedIds: this.dialog.close.acceptedIds,
      });

      if (res) {
        this.onClickCloseCancel();
      }
    },
  },
};
</script>
