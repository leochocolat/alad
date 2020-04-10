<template>
  <div>
    <Navbar />
    <ThreeScene />
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import App from '@/assets/javascript/App';

import Navbar from '@/components/partials/Navbar';
import ThreeScene from '@/components/partials/ThreeScene';

export default {
  components: {
    Navbar,
    ThreeScene
  },
  computed: {
    ...mapGetters({
      viewport: ['device/viewportSize']
    })
  },
  mounted() {
    console.log(this.viewport);
  }
}
</script>

<style>
</style>