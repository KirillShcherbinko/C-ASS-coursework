<template>
  <b-col>
    <b-card
      title="Card"
      img-src="https://via.placeholder.com/300"
      class="mb-2"
      alt="Event Image"
      style="max-width: 20rem"
    >
      <b-card-text>text</b-card-text>
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
};
</script>