<template>
  <b-col class="event-card">
    <b-card class="mb-3" style="max-width: 20rem;" align="center">
      <b-card-img
        :src="imageUrl"
        alt="Event Photo"
        class="event-card__photo"
      ></b-card-img>
      <b-card-title class="event-card__title">{{ event.title }}</b-card-title>
      <div class="event-card__actions">
        <b-button
          variant="primary"
          @click="postApplication"
          class="event-card__btn"
        >
          Apply
        </b-button>
        <b-button
          variant="secondary"
          @click="viewEvent"
          class="event-card__btn"
        >
          View
        </b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import {
  BCol,
  BCard,
  BCardImg,
  BCardTitle,
  BButton,
} from "bootstrap-vue-3";
import { sendApplication } from "../handlers/home-handlers.js";

export default {
  name: "EventCard",
  components: {
    BCol,
    BCard,
    BCardImg,
    BCardTitle,
    BButton,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return `/api/${this.event.photo}`;
    },
  },
  methods: {
    viewEvent() {
      const eventString = encodeURIComponent(JSON.stringify(this.event));
      this.$router.push({
        name: "EventDetails",
        params: { id: this.event._id },
        query: { event: eventString },
      });
    },
    async postApplication() {
      try {
        const res = await sendApplication(this.event._id);
        console.log(res);
        console.log("Application sent successfully!");
      } catch (err) {
        this.$emit("error", err.response.data.message); // Передача ошибки в родителя
      }
    },
  },
};
</script>

<style scoped>
.event-card__photo {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
}

.event-card__title {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}

.event-card__actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.event-card__btn {
  flex: 1;
  font-size: 14px;
}
</style>
