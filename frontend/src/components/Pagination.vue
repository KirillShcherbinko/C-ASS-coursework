<template>
  <b-pagination
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    first-text="First"
    prev-text="Prev"
    next-text="Next"
    last-text="Last"
    @input="onPageChange"
  ></b-pagination>
</template>

<script>
import { BPagination } from "bootstrap-vue-3";

export default {
  name: "Pagination",
  components: {
    BPagination,
  },
  props: {
    rows: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 3,
    },
    currentPage: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    onPageChange(value) {
      this.currentPage = value;
    },
  },
} 
</script>
