<template>
  <div class="card has-background-light">
    <b-loading :is-full-page="false" :active="isLoading" />
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure v-if="speaker.photo" class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
          <b-icon
            v-else
            icon="user"
          />
        </div>
        <div class="media-content">
          <p class="title is-4">{{ speaker.name }}</p>
          <p
            v-if="speaker.work"
            class="subtitle is-6"
          >
            <span v-if="speaker.work.title">{{ speaker.work.title }} | </span>
            {{ speaker.work.company }}
          </p>
        </div>
      </div>

      <div v-if="speaker.bio" class="content" v-html="bio"></div>

      <div v-if="speaker.social" class="card-footer pt-4">
        <p class="mr-4">Siga:</p>
        <a v-if="speaker.social.site" :href="speaker.social.site" target="_blank" rel="”noopener”">
          <b-icon icon="globe-americas" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.linkedin"
          :href="speaker.social.linkedin"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="linkedin-in" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.instagram"
          :href="speaker.social.instagram"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="instagram" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.twitter"
          :href="speaker.social.twitter"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="twitter" pack="fab" class="vertical-align mr-4" />
        </a>
        <a
          v-if="speaker.social.facebook"
          :href="speaker.social.facebook"
          target="_blank"
          rel="”noopener”"
        >
          <b-icon icon="facebook-f" pack="fab" class="vertical-align mr-4" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeakerPreviewCard',
  props: {
    speaker: Object,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    checkLoad() {
      if (this.speaker && this.speaker.name) this.isLoading = false;
      else this.isLoading = true;
    },
  },
  computed: {
    bio() {
      if (!this.speaker || !this.speaker.bio) return '';

      let escapedText = this.speaker.bio;
      escapedText = escapedText.replace(/(?:\r\n|\r|\n)/g, '<br>');
      return escapedText;
    },
  },
  watch: {
    speaker() {
      this.checkLoad();
    },
  },
  mounted() {
    this.checkLoad();
  },
};
</script>
