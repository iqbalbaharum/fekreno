<template>
  <div>
    <q-list>
      <q-item class="q-py-lg">
        <q-img src="~assets/krenovator.png" width="240px" height="40px" />
      </q-item>

      <EssentialLink
        v-for="link in menus['sidebar']"
        :key="link.meta.title"
        :title="link.meta.title"
        :caption="link.meta.subtitle"
        :link="link.path"
        :icon="link.meta.icon"
        :color="link.meta.color"
        :expanded="false"
      />

      <q-list>
        <q-expansion-item switch-toggle-side expand-separator label="Admin">
          <template v-slot:header>
            <q-item-section>
              <span class="text-body1 text-weight-medium">Admin</span>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in menus['admin']"
                :key="link.meta.title"
                :title="link.meta.title"
                :link="link.path"
                :expanded="true"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

      <q-list>
        <q-expansion-item switch-toggle-side expand-separator label="Other">
          <template v-slot:header>
            <q-item-section>
              <span class="text-body1 text-weight-medium">Others</span>
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in menus['footer']"
                :key="link.meta.title"
                :title="link.meta.title"
                :link="link.path"
                :expanded="true"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-list>
  </div>
</template>

<script>
import EssentialLink from "../components/EssentialLink";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["menus"]),
  },

  created() {
    console.log(this.menus["footer"]);
  },

  components: {
    EssentialLink,
  },
};
</script>
