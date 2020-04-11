<template>
  <div>
    <ThreeScene />
    <nuxt/>
    <Navbar />
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
      viewport: ['device/viewportSize'],
      photos: ['gallery/photos'],
    }),
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<style>
</style>