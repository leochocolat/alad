<template>
  <div class="navbar">
      <nuxt-link to="/" class="navbar__brand">
        Agathe Lavau
      </nuxt-link>
      <nav class="navbar__nav">
        <nuxt-link to="/catalogue" class="navbar__button">Catalogue</nuxt-link>
        <nuxt-link to="/about" class="navbar__button">More</nuxt-link>
      </nav>
  </div>
</template>

<script>
export default {
  props: {
    
  },
}
</script>

<style>
</style>

