<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row q-py-md justify-end q-gutter-x-md items-center">
        <q-btn label="Today" color="accent" />
        <div class="col text-body2">{{ date.formatDate(selectedDate, 'MMMM YYYY') }}</div>
        <q-btn flat round label="Prev" @click="goToPrevious" />
        <q-btn flat round label="Next" @click="goToNext" />
        <q-space />
        <q-select class="col" filled v-model="view" :options="opts.dayView" label="Calendar View" emit-value map-options/>
      </div>
      <q-calendar
        ref="calendar"
        v-model="selectedDate"
        :view="view"
        animated
        locale="en-us"
        class="full-height"
        :interval-height="100"
        :day-height="110"
        :interval-start="9"
        :interval-count="16"
        @click:date2="onHandleClickDate"
        @click:time2="onHandleClickTime"
      >
        <!-- Current time indicator -->
        <template #day-container="">
          <div class="day-view-current-time-indicator" />
          <div class="day-view-current-time-line" />
        </template>
        <template #day="{ timestamp }">
          <template v-for="(event, index) in getEvents(timestamp)">
            <q-badge
              :key="index"
              class="q-my-xs cursor-pointer block"
              :class="{ 'bg-blue': event.type === 'onetoone', 'bg-black': event.type === 'info' }"
              @click="onHandleEventClick(event)"
            >
              {{ event.title }}
            </q-badge>
          </template>
        </template>
        <template #day-body="{timestamp, timeStartPos, timeDurationHeight}">
          <template v-for="(event, index) in getEvents(timestamp)">
            <div
              :key="index"
              class="absolute justify-center text-white bg-primary items-center"
              :style="getDayClass(event, timeStartPos, timeDurationHeight)"
            >
              <div class="q-pa-md row">
                <div class="col-8">
                  <div class="text-h6">{{ event.title }}</div>
                  <div>{{ event.description }}</div>
                </div>
                <div class="col text-right">
                  <q-chip square v-if="event.user.profile">
                    @{{ event.user.name }}
                  </q-chip>
                </div>
              </div>
            </div>
          </template>
        </template>
      </q-calendar>
    </div>

    <q-dialog v-model="dialog.newShow" position="bottom">
      <q-card style="width: 500px">
        <q-item-section class="q-pa-md bg-primary text-white">
          <q-item-label>New Event</q-item-label>
        </q-item-section>

        <q-card-section class="row q-gutter-sm justify-center">

          <div class="col-12">
            <q-select filled v-model="dialog.form.type" :options="opts.eventTypes" label="Event Type" emit-value map-options/>
          </div>

          <div class="col-12">
            <q-input filled v-model="dialog.form.title" label="Title" />
          </div>

          <div class="col-12">
            <q-input type="textarea" filled v-model="dialog.form.description" placeholder="Description" />
          </div>

          <div class="col-12 row">
            <div class="col q-mr-sm">
              <q-input type="date" filled v-model="dialog.start.date" placeholder="Start Date" />
            </div>
            <div class="col">
              <q-input type="time" filled v-model="dialog.start.time" placeholder="Start Time" />
            </div>
          </div>

          <div class="col-12 row">
            <div class="col q-mr-sm">
              <q-input type="date" filled v-model="dialog.end.date" placeholder="End Date" />
            </div>
            <div class="col">
              <q-input type="time" filled v-model="dialog.end.time" placeholder="End Time" />
            </div>
          </div>

          <div class="col-12" v-if="dialog.form.type === 'onetoone'">
            <q-input filled v-model="dialog.form.requestApprovalUserId" label="User" />
          </div>
        </q-card-section>

        <q-card-section class="row q-gutter-md justify-between">
          <q-btn color="primary" label="Submit" @click="onClickSubmit" />
          <q-btn flat color="negative" label="Cancel" @click="onClickCancel" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <event-dialog v-model="selectedEventDialog.show" :event="selectedEventDialog.selectedEvent"  />
  </q-page>
</template>

<script>
import Calendar from 'src/models/Calendar'
import { date } from 'quasar'
import EventDialog from './components/EventDialog'

export default {
  components: { EventDialog },
  data() {
    return {
      date: date,
      view: 'month',
      selectedDate: date.formatDate(new Date(), 'YYYY-MM-DD'),
      opts: {
        dayView: [
          // { label: 'Day', value: 'day' },
          { label: 'Month', value: 'month' },
        ],
        eventTypes: [
          { label: 'One to One', value: 'onetoone' },
          { label: 'Class', value: 'class' },
          { label: 'Talk', value: 'talk' },
          { label: 'Information', value: 'info' },
        ],
      },

      selectedEventDialog: {
        show: false,
        selectedEvent: {}
      },
      dialog: {
        newShow: false,
        start: {
          date: '',
          time: '',
        },
        end: {
          date: '',
          time: ''
        },
        form: {
          type: '',
          title: '',
          start: '',
          description: '',
          end: '',
          requestApprovalUserId: '',
        }
        
      }
    }
  },

  computed: {
    calendars() {
      return Calendar.query().withAllRecursive().get()
    }
  },

  created() {
    this.$store.dispatch('GetAllCalendars')
  },

  methods: {
    getEvents (dt) {
      if(this.calendars) {
        return this.calendars.filter(event => dt.date === date.formatDate(event.start, 'YYYY-MM-DD'))
      }
    },
    goToNext() {
      this.$refs.calendar.next()
    },
    goToPrevious() {
      this.$refs.calendar.prev()
    },
    onHandleClickDate(data) {

      this.dialog.start.date = data.scope.timestamp.date
      this.dialog.start.time = '00:00'

      this.dialog.end.date = data.scope.timestamp.date
      this.dialog.end.time = '01:00'

      this.dialog.newShow = true
    },
    onHandleClickTime(data) {

      this.dialog.start.date = date.formatDate(`${data.scope.timestamp.date} ${data.scope.timestamp.time}`, 'YYYY-MM-DD')
      this.dialog.start.time = date.formatDate(`${data.scope.timestamp.date} ${data.scope.timestamp.time}`, 'HH:00')

      this.dialog.end.date = date.formatDate(`${data.scope.timestamp.date} ${data.scope.timestamp.time}`, 'YYYY-MM-DD')

      let startTime = new Date(`${data.scope.timestamp.date} ${data.scope.timestamp.time}`)
      let addOneHourTime = date.addToDate(startTime, { hours: 1 })
      this.dialog.end.time = date.formatDate(addOneHourTime, 'HH:00')

      this.dialog.newShow = true
    },
    onClickCancel() {
      this.dialog.date = ''
      this.dialog.time = ''
      this.dialog.newShow = false
    },
    async onClickSubmit() {
      this.dialog.form.start = date.formatDate(`${this.dialog.start.date} ${this.dialog.start.time}`, 'YYYY-MM-DDTHH:mm:ssZ')
      this.dialog.form.end = date.formatDate(`${this.dialog.end.date} ${this.dialog.end.time}`, 'YYYY-MM-DDTHH:mm:ssZ')

      await this.$store.dispatch('AddCalendar', this.dialog.form)

      this.dialog.form = {
        type: '',
        title: '',
        start: '',
        description: '',
        end: '',
        requestApprovalUserId: '',
      }
      this.dialog.newShow = false
    },
    onHandleEventClick(event) {
      console.log(event)
      this.selectedEventDialog.selectedEvent = event
      this.selectedEventDialog.show = true
    },
    getDayClass (event, timeStartPos, timeDurationHeight) {
      const s = {}
      
      s['background-color'] = 'bg-primary'

      let startTime = date.formatDate(event.start, 'HH:mm')
      
      if (timeStartPos) {
        s.top = timeStartPos(startTime) + 'px'
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(60) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
  },
}
</script>

<style lang="sass" scoped>
.day-view-current-time-indicator
  position: absolute
  left: 45px
  height: 10px
  width: 10px
  margin-top: -4px
  background-color: rgba(0, 0, 255, .5)
  border-radius: 50%

.day-view-current-time-line
  position: absolute
  left: 55px
  border-top: rgba(0, 0, 255, .5) 2px solid
  width: calc(100% - 50px - 5px)

</style>