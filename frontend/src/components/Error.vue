<template>
    <b-alert
      v-if="errors.length"
      variant="danger"
      show
      class="text-dark"
      :style="{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }"
    >
      {{ formattedErrors }}
    </b-alert>
</template>
  
<script>
  import { BAlert } from "bootstrap-vue-3";

  export default {
    name: "ErrorBlock",
    components : {
        BAlert,
    },
    props: {
      errors: {
        type: Array,
        required: true
      }
    },
    computed: {
      formattedErrors() {
        return this.errors.join(' ');
      }
    }
  };
</script>
  