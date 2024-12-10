<template>
  <div>
    <!-- Header -->
    <header class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">EventApp</a>

        <div class="d-flex">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Главная</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Новости</a>
            </li>
          </ul>
          <button class="btn btn-primary" @click="signIn">Sign In</button>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="container">
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>

      <div v-else>
        <div v-if="events.length > 0" class="row g-4">
          <div class="col-12 col-md-4" v-for="event in paginatedEvents" :key="event.id">
            <div class="card h-100">
              <img :src="event.image" class="card-img-top" alt="Event Image" />
              <div class="card-body">
                <h5 class="card-title">{{ event.title }}</h5>
                <p class="card-text">{{ event.description }}</p>
                <button>Apply</button>
              </div>
            </div>
          </div>
          <!-- Пустые слоты для заполнения пространства -->
          <div
            class="col-12 col-md-4"
            v-for="i in emptySlots"
            :key="'empty-' + i"
          >
            <div class="card h-100 invisible"></div>
          </div>
        </div>



        <div v-else class="text-center">
          <p>Events not found</p>
        </div>
      </div>

      <!-- Pagination -->
      <nav v-if="events.length > 3" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
              &laquo;
            </button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 3,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.events.length / this.itemsPerPage);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.events.slice(start, start + this.itemsPerPage);
    },
    emptySlots() {
      // Рассчитываем, сколько пустых слотов нужно для заполнения строки
      return this.itemsPerPage - this.paginatedEvents.length;
    },
  },
  methods: {
    fetchEvents() {
      this.loading = true;
      // Симуляция загрузки данных с сервера
      setTimeout(() => {
        this.events = [
          {
            id: 1,
            title: "Event 1",
            description: "Description for event 1",
            image: "https://via.placeholder.com/300",
          },
          {
            id: 2,
            title: "Event 2",
            description: "Description for event 2",
            image: "https://via.placeholder.com/300",
          },
          {
            id: 3,
            title: "Event 3",
            description: "Description for event 3",
            image: "https://via.placeholder.com/300",
          },
          {
            id: 4,
            title: "Event 4",
            description: "Description for event 4",
            image: "https://via.placeholder.com/300",
          },
        ];
        this.loading = false;
      }, 1000);
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    signIn() {
      alert("Sign In clicked!");
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>


<style>
.card {
  height: 100%;
}
</style>
