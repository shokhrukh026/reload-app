<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Links
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <q-dialog
          v-model="dialog"
        >
          <q-card style="width: 300px">
            <q-card-section class="bg-warning text-white">
              <div class="text-h6">Update available</div>
            </q-card-section>

            <q-card-section class="q-pt-none bg-warning text-white">
              Do you want to update?
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="No" v-close-popup @click="totallyNotUpdate = true"/>
              <q-btn flat label="Yes" v-close-popup @click="refresh"/>
            </q-card-actions>
          </q-card>
        </q-dialog>

    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false,
      dialog: false,
      polling: null,
      totallyNotUpdate: false,
    }
  },
  beforeDestroy () {
    clearInterval(this.polling);
  },
  created () {
    this.pollData();
  },
  methods: {
    ...mapActions([
        'CHECK_VERSION'
    ]),
    pollData () {
      this.polling = setInterval(async () => {
        await this.getNotifications()
      }, 5000)
    },
    async getNotifications(){
      let data = process.env.VERSION;
      if(sessionStorage.getItem('versionData')){
        data = JSON.parse( sessionStorage.getItem('versionData') );
      }

      if(!this.totallyNotUpdate){
        let response = await this.CHECK_VERSION(data);
        if(response.updateRequired == true){ 
          this.dialog = !this.dialog;
        }
      }
    },
    async refresh(){
      await this.$router.go();
    }
  },
}
</script>
