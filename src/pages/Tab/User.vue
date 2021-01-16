<template>
  <div>
    <q-table :data="users" :columns="columns" :row-key="rowkey">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            {{ props.row['name'] }}
            <q-popup-edit v-model="props.row['name']">
              <q-input v-model="props.row['name']" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td>
            {{ props.row['email'] }}
            <q-popup-edit v-model="props.row['email']">
              <q-input v-model="props.row['email']" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td>
            {{ props.row['mobile'] }}
            <q-popup-edit v-model="props.row['mobile']">
              <q-input v-model="props.row['mobile']" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td>
            <q-btn flat round icon="more_vert">
              <q-menu anchor="center middle" self="center middle">
                <q-list style="min-width: 100px">
                  <q-separator v-if="menus.length" />
                  <q-item
                    clickable
                    v-close-popup
                    v-for="menu in menus"
                    :key="menu.label"
                  >
                    <q-item-section
                      @click="menu.trigger(props.row['$id'], props.rowIndex)"
                      >{{ menu.label }}</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog.show">
      <q-card style="min-width: 300px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Assigning Roles</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="onClickCancel" />
        </q-card-section>

        <q-card-section>
          <q-list separator bordered>
            <q-item v-for="(role, index) in roles" :key="role.$id">
              <q-item-section>
                <q-item-label>{{ role.name }}</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-checkbox
                  v-if="dialog.roleArr[index]"
                  v-model="dialog.roleArr[index].value"
                  @input="assignRole(index)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import User from './../../models/User';
import Role from './../../models/Role';

export default {
  data() {
    return {
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          name: 'email',
          align: 'left',
          label: 'Email',
          field: 'email',
          sortable: true,
        },
        { name: 'mobile', align: 'center', label: 'Mobile', field: 'mobile' },
        { name: 'action', align: 'center', label: 'Action' },
      ],
      menus: [
        {
          label: 'Manage Roles',
          trigger: this.manageRole,
        },
      ],
      options: {
        roles: [],
      },
      dialog: {
        show: false,
        userId: '',
        roleArr: [],
      },
    };
  },

  created() {
    this.$store.dispatch('GetAllUsers');
  },

  mounted() {
    this.loadAllRoles();
  },

  computed: {
    users() {
      return User.query().withAll().get();
    },
    roles() {
      return Role.all();
    },
  },

  components: {},

  methods: {
    async loadAllRoles() {
      let loadRoles = await this.$store.dispatch('GetAllRoles');
      loadRoles.forEach((role) => {
        this.options.roles.push({
          value: role.uuid,
          label: role.name,
        });
      });
    },
    onDelete(id) {
      this.$store.dispatch('DeleteUser', id);
    },
    onAddUser() {
      this.$store.dispatch('RegisterUser', this.form).then((res) => {});
    },

    async manageRole(id) {
      this.dialog.roleArr = [];

      const user = User.query().whereId(id).with('roles').first();

      for await (let arole of this.roles) {
        this.dialog.roleArr.push({
          id: arole.uuid,
          value: false,
        });
      }

      const userRoles = await this.$store.dispatch('GetUserRoles', id);
      for await (let urole of userRoles) {
        let u = this.dialog.roleArr.find(
          (element) => element.id === urole.uuid
        );
        if (u) {
          console.log(u.id);
          u.value = true;
        }
      }

      this.dialog.userId = id;
      this.dialog.show = true;
    },

    onClickSave() {},

    onClickCancel() {
      this.dialog.roleArr = [];
      this.dialog.userId = '';
      this.dialog.show = false;
    },

    assignRole(index) {
      const data = {
        roleId: this.dialog.roleArr[index].id,
        userId: this.dialog.userId,
      };

      if (this.dialog.roleArr[index].value) {
        this.$store.dispatch('AssignUserRole', data);
      } else {
        this.$store.dispatch('UnassignUserRole', data);
      }
    },
  },
};
</script>