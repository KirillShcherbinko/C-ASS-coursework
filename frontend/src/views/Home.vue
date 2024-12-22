<template>
  <div>
    <!-- Заголовок -->
    <home-header />

    <!-- Контейнер с карточками -->
    <b-container>
      <b-row class="d-flex flex-row flex-wrap align-items-center" align-v="center">
        <b-col v-for="event in paginationEvents" :key="event._id" cols="auto" class="mb-3">
          <event-card :event="event" />
        </b-col>
      </b-row>
    </b-container>

    <!-- Пагинация -->
    <pagination
      class="d-flex align-items-center justify-content-center"
      :rows="events.length"
      :per-page="perPage"
      v-model:modelValue="currentPage"
    ></pagination>

    <!-- Блок ошибки -->
    <error-block v-if="errMessage" :message="errMessage" @clearMessage="clearMessage" />
  </div>
</template>

<script>
import { BContainer, BRow } from "bootstrap-vue-3";
import { fetchAllEvents } from "../handlers/home-handlers.js";
import EventCard from "../components/EventCard.vue";
import HomeHeader from "../components/HomeHeader.vue";
import Pagination from "../components/Pagination.vue";
import ErrorBlock from "../components/ErrorBlock.vue";

export default {
  name: "Home",
  components: {
    BContainer,
    BRow,
    "event-card": EventCard,
    "home-header": HomeHeader,
    "pagination": Pagination,
    "error-block": ErrorBlock,
  },
  data() {
    return {
      events: [], // Массив событий
      errMessage: "", // Сообщение об ошибке
      currentPage: 1, // Текущая страница
      perPage: 3, // Количество карточек на странице
    };
  },
  async mounted() {
    try {
      this.events = await fetchAllEvents();
    } catch (err) {
      console.error("[Home] Ошибка:", err.message);
      this.errMessage = "Не удалось загрузить события. Попробуйте позже.";
    }
  },
  computed: {
    paginationEvents() {
      const reversedEvents = [...this.events].reverse();
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return reversedEvents.slice(start, end);
    },
  },
  methods: {
    clearMessage() {
      this.errMessage = ""; 
    },
  },
};
</script>
