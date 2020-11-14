<template>
<q-page>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Material" />
    </q-breadcrumbs>
  </div>
  <div class="row">
    <div class="col-8">
      <q-list>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" square icon="bluetooth" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</q-page>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>
