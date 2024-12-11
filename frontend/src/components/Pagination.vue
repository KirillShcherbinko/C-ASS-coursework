<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-text="First"
    prev-text="Prev"
    next-text="Next"
    last-text="Last"
  ></b-pagination>
</template>

<script>
import { BPagination } from "bootstrap-vue-3"

export default {
    name: "Pagination",
    components: {
        BPagination,
    },
    data() {
        return {
            currentPage: 1,
            rows: 1,
            perPage: 3
        };
    },
} 
</script>
