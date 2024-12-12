<template>
  <b-col>
    <b-card
      class="mb-2"
      style="max-width: 20rem"
      height="300px"
    >
      <img :src="imageUrl" alt="Event Photo" width="150rem" height="150rem"/>
      <h2>{{ title }}</h2>
      <b-card-text>{{ description }}</b-card-text>
      <b-button variant="primary">Apply</b-button>
    </b-card>
  </b-col>
</template>

<script>
import { BCol, BCard, BCardText, BButton } from "bootstrap-vue-3";

export default {
  name: "EventCard",
  components: {
    BCol,
    BCard,
    BCardText,
    BButton,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return `/api/${this.photo}`;
    }
  }
};
</script>