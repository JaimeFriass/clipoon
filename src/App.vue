<template>
  <div id="app">
    <div class="back">
    <Navbar/>
    <Notifications/>
      <b-row align-h="center">
        <b-col sm="12" md="12" lg="12" xl="10">
          <router-view/>
        </b-col>
      </b-row>
    <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Notifications from './components/Notifications.vue'


export default {
  name: 'app',
  components: {
    Navbar, Footer, Notifications
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  @import 'main.scss';

  div.back {
    background-color: rgba(241, 241, 241, 0.822);
    padding-top: 60px;
  }
</style>
