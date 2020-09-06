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
                  <q-btn color="primary" label="Submit" />
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
                        <q-item-section>Delete session</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>

              </template>
              
              <template v-else>
                {{ props.row[col.field] }}
                <q-popup-edit v-if="crud.includes('update') && editablescol.includes(key)" v-model="props.row[key]">
                  <q-input v-model="props.row[key]" dense autofocus />
                </q-popup-edit>
              </template>

            </q-td>
          </q-tr>

        </template>

      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreateDialogOpened: false,
      test: 'test'
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
    }
  }
}
</script>
