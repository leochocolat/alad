<template>
  <div>
    <Navbar />
    <ThreeScene />
    <nuxt/>
  </div>
</template>

<script>
import App from '@/assets/javascript/App';

import Navbar from '@/components/partials/Navbar';
import ThreeScene from '@/components/partials/ThreeScene';

export default {
  components: {
    Navbar,
    ThreeScene
  }
}
</script>

<style>
</style>