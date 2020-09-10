<template>
  <div style="min-width: 800px">
    <div class="text-3" v-if="title">{{ title }}</div>

    <div class="q-pa-md">
      <q-table
        :data="rows"
        :columns="columns"
      >

        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:top-right>
          <div class="flex flex-center" v-if="crud.includes('create')">
            <q-btn
              color="primary"
              text-color="white"
              :label="`New ${title}`"
              @click="isCreateDialogOpened = true"
            />
          </div>
        </template>

        <template v-slot:top-row>
          <q-tr>
            <q-td class="rounded-borders shadow-3" v-if="isCreateDialogOpened" colspan="100%">
              <slot name="create-dialog-header">
                <div class="text-h6 q-mb-md q-pa-sm">
                  Create New {{ title }}
                </div>
              </slot>

              <div class="q-pa-md q-gutter-sm">
                <slot name="create-dialog-body"></slot>
              </div>

              <div class="flex justify-end q-mt-md q-pa-sm q-gutter-sm">
                <slot name="create-dialog-footer">
                  <q-btn flat color="primary" label="Cancel" @click="isCreateDialogOpened = false" />
                  <q-btn color="primary" label="Submit" @click="onClickSubmit" />
                </slot>
              </div>
            </q-td>
          </q-tr>

        </template>
        
        <template v-slot:body="props">
          
          <q-tr :props="props">
            <q-td v-for="(col, index) in props.cols" :key="col.field">
              <template v-if="index == (props.cols.length - 1) && crud.includes('delete')">
                <q-btn flat round icon="more_vert">
                  <q-menu
                    anchor="center middle"
                    self="center middle"
                  >
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup v-if="crud.includes('delete')">
                        <q-item-section @click="onClickConfirmation(props.row['$id'])">Delete</q-item-section>
                      </q-item>
                      <q-separator v-if="menus.length" />
                      <q-item clickable v-close-popup v-for="menu in menus" :key="menu.label">
                        <q-item-section @click="menu.trigger(props.row['$id'])">{{ menu.label }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

              </template>
              
              <template v-else>
                {{ props.row[col.field] }}
                <q-popup-edit v-if="crud.includes('update') && editablescol.includes(col.field)" v-model="props.row[col.field]">
                  <q-input v-model="props.row[col.field]" dense autofocus />
                </q-popup-edit>
              </template>

            </q-td>
          </q-tr>

        </template>

      </q-table>
    </div>

    <q-dialog v-if="crud.includes('delete')" v-model="dialog.confirm" persistent>
      <q-card class="bg-negative text-white">
        <q-card-section>
          <div class="text-h6">Are you sure?</div>
        </q-card-section>

        <q-card-section class="row items-center">          
          <span class="q-ml-sm">Do you really want to delete these record? This process cannot be undone</span>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-dark">
          <q-btn flat label="Cancel" @click="onClickCancel" />
          <q-btn flat label="Delete" color="negative" @click="onClickDelete"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreateDialogOpened: false,
      dialog: {
        id: '',
        confirm: false
      },
      filter: ''
    }
  },

  props: {
    title: {
      type: String
    },
    crud: {
      type: Array,
      default: () => ['read']
    },
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    editablescol: {
      type: Array,
      default: () => []
    },
    menus: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    onClickDelete() {
      this.$emit('delete', this.dialog.id)
      this.dialog.id = ''
      this.dialog.confirm = false
    },
    onClickCancel() {
      this.dialog.id = ''
      this.dialog.confirm = false
    },
    onClickSubmit() {
      this.isCreateDialogOpened = false
      this.$emit('onAdd')
    },
    onClickConfirmation(id) {
      this.dialog.id = id
      this.dialog.confirm = true
    }
  }
}
</script>
