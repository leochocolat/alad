<template>
  <div class="loader">
      <div class="loader__progress js-progress">{{ progress }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Emitter from '~/assets/javascript/events/Emitter';

export default {
  data: () => {
      return {
        progress: 0
      }
  },
  computed: {
    ...mapGetters({
        viewport: ['device/viewportSize'],
        photos: ['gallery/photos'],
    }),
  },
  methods: {
    setupEventListener() {
      Emitter.on('LOADING:PROGRESS', this.loadingHandler, { passive: true });
      Emitter.on('LOADING:DONE', this.loadingDoneHandler, { passive: true });
    },
    loadingHandler(e) {
      this.progress = e.progress;
    },
    loadingDoneHandler(e) {
      document.querySelector('.js-progress').style.display = 'none';
    }
  },
  mounted() {
    this.setupEventListener();
  }
}
</script>

<style>
</style>

