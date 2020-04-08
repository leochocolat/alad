<template>
  <div class="sample-component">
    <h1 v-for="(post, key) in posts" :key="key">
      {{ post.fields.title }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
        type: Array,
        required: true
    },
  },
}
</script>

<style>
</style>

