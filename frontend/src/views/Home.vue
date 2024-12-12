<template>
    <div>
      <home-header />
      <b-container>
        <b-row 
          class="d-flex flex-row flex-wrap align-items-center" 
          align-v="center">
          <b-col 
            v-for="event in events" 
            :key="event._id" 
            cols="auto" 
            class="mb-3">
            <event-card 
              :title="event.title"
              :description="event.description"
              :photo="event.photo">
            </event-card>
          </b-col>
        </b-row>
      </b-container>
      <pagination class="d-flex align-items-center justify-content-center"></pagination>
    </div>
</template>
  
  <script>
  import { BContainer, BRow } from "bootstrap-vue-3";
  import { fetchAllEvents } from "../handlers/home-handlers.js";
  import EventCard from "../components/EventCard.vue";
  import HomeHeader from "../components/HomeHeader.vue";
  import Pagination from "../components/Pagination.vue";
  import Error from "../components/Error.vue";
  
  export default {
    name: "Home",
    components: {
      BContainer,
      BRow,
      "event-card": EventCard,
      "home-header": HomeHeader,
      "pagination": Pagination,
      "error-block": Error,
    },
    data() {
      return {
        events: [],
        errMessage: ""
      };
    },
    async mounted() {
      this.events = await fetchAllEvents();
    },
  };
  </script>