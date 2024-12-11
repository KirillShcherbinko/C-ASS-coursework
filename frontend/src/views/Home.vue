<template>
    <div>
      <home-header />
      <b-container>
        <b-row align-v="center">
          <event-card></event-card>
          <event-card></event-card>
          <event-card></event-card>
          <event-card></event-card>
        </b-row>
      </b-container>
      <pagination class="d-flex align-items-center justify-content-center"></pagination>
    </div>
</template>
  
  <script>
  import { BContainer, BRow } from "bootstrap-vue-3";
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
        events: []
      };
    },
  };
  </script>