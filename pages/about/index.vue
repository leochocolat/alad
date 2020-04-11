<template>
  <div class="page-about">
    <div class="container page-about__container">
        <h1 class="page-about__heading">
            {{ data.fields.introduction }}
        </h1>
        <div class="page-about__infos">
            <p class="page-about__infos-title">Contact</p>
            <a :href="`mailto:${data.fields.email}`" class="page-about__email">{{ data.fields.email }}</a>
            <p class="page-about__tel">
                tel. {{ data.fields.tel }}
            </p>
            <p class="page-about__message">
                {{ data.fields.message }}
            </p>
            <br>
            <p class="page-about__social-title">
                Social
            </p>
            <p class="page-about__instagram">
                ig. <a target="_blank" :href="`https://www.instagram.com/${data.fields.instagram}`" class="page-about__instagram-link">@{{ data.fields.instagram }}</a>
            </p>
        </div>
    </div>  
  </div>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js';
  import { mapGetters } from 'vuex';

  const client = createClient();

  export default {
    components: {
      
    },
    mounted() {
      
    },
    computed: {
      ...mapGetters({
        viewport: ['device/viewportSize'],
        photos: ['gallery/photos'],
      }),
    },
    asyncData () {
      return Promise.all([
        client.getEntries({
          'content_type': 'aboutPage',
        })
      ]).then(([pages]) => {
        return {
          data: pages.items[0]
        }
      }).catch(console.error);
    }
  }
</script>

<style>
</style>

