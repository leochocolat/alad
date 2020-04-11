<template>
  <div class="page-home">
    <Loader />
  </div>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js';
  import { mapGetters } from 'vuex';

  import TexturesLoader from '~/assets/javascript/modules/TexturesLoader';
  import Loader from '~/components/partials/Loader';

  const client = createClient();

  export default {
    components: {
      Loader
    },
    mounted() {
      let photos = [];

      for (let i = 0; i < this.posts.length; i++) {
        let photo = {};
        photo.title = this.posts[i].fields.title;
        photo.tag = this.posts[i].fields.tag;
        photo.model = this.posts[i].fields.model;
        photo.url = this.posts[i].fields.photo.fields.file.url;
        photo.width = this.posts[i].fields.photo.fields.file.details.image.width;
        photo.height = this.posts[i].fields.photo.fields.file.details.image.height;
        
        photos.push(photo);
      }

      this.$store.dispatch('gallery/setPhotos', photos);

      TexturesLoader(photos)
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
          'content_type': 'photo',
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

