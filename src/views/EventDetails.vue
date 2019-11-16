<template>
  <div>
    <b-loading :is-full-page="false" :active="isLoading" />

    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <b-tag class="mb-4">{{ event.type }}</b-tag>
          <h1 class="title is-3">
            {{ event.title }}
          </h1>
          <h2 v-if="event.speaker" class="subtitle is-5">
            {{ event.speaker.name }}
          </h2>
          <p v-if="event.startTime" class="mt-5">
            <b-icon
              icon="clock"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ event.startTime.toDate() | time }}
          </p>
          <p class="mt-4">
            <b-icon
              icon="map-marker-alt"
              size="is-small"
              class="vertical-align mr-3"
            ></b-icon>
            {{ event.location }}
          </p>
        </div>
      </div>
    </section>

    <div class="container p-5">
      <div class="columns is-desktop">
        <div class="column is-6-desktop mb-5">
          <p class="title is-5">Detalhes</p>
          <p>{{ event.description }}</p>
        </div>
        <div class="column is-4-desktop is-offset-1-desktop">
          <speaker-preview-card
            v-if="!isLoading"
            :speaker="speaker"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import SpeakerPreviewCard from '../components/SpeakerPreviewCard.vue';

export default {
  name: 'NextEvents',
  components: {
    'speaker-preview-card': SpeakerPreviewCard,
  },
  data: () => ({
    eventId: null,
    isLoading: true,
  }),
  methods: {
    ...mapActions({
      fetchEventById: 'events/fetchEventById',
      fetchSpeakerByEventId: 'speakers/fetchSpeakerByEventId',
    }),
    async fetchAll() {
      const eventId = this.$route.params.id;
      await this.fetchEventById(eventId);
      await this.fetchSpeakerByEventId(eventId);
    },
  },
  computed: {
    ...mapGetters({
      events: 'events/events',
      speakers: 'speakers/speakersByEventId',
    }),
    event() {
      return this.events[this.eventId] || {};
    },
    speaker() {
      return this.speakers[this.eventId] || {};
    },
  },
  watch: {
    event() {
      if (this.event) this.isLoading = false;
      else this.isLoading = true;
    },
  },
  created() {
    window.scrollTo(0, 0);
    this.eventId = this.$route.params.id;
    this.fetchAll();
  },
  filters: {
    time(date) {
      return format(date, 'EEEE, HH:mm (dd \'de\' MMM)', { locale: pt });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.hero-placeholder {
  background-color: $primary;
}
</style>