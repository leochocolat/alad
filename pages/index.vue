<template>
  <section>
    
  </section>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js';

  import SampleComponent from '~/components/SampleComponent.vue';

  const client = createClient();

  export default {
    components: {
      SampleComponent
    },
    asyncData () {
      return Promise.all([
        client.getEntries({
          'content_type': 'project',
          order: '-sys.createdAt'
        })
      ]).then(([posts]) => {
        return {
          posts: posts.items
        }
      }).catch(console.error);
    }
  }
</script>

<style>
</style>

