<template>
  <b-navbar toggleable="lg" variant="dark" bg="dark" class="fixed-top">
    <b-container fluid>
      <b-row no-gutters class="w-100" style="display: grid; grid-template-columns: 1fr 1fr;">
        <b-col class="d-flex align-items-center" style="gap: 20px">
          <!-- Левая часть: поле поиска -->
          <div>
            <b-form inline>
              <b-form-input
                type="search"
                placeholder="Поиск"
                aria-label="Search"
              ></b-form-input>
            </b-form>
          </div>

          <div>
            <b-button variant="primary" type="button" class="ml-auto">
              Найти
            </b-button>
          </div>
        </b-col>

        <b-col class="d-flex justify-content-end align-items-center">
          <b-button variant="primary" @click="goToLogin">Войти</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-navbar>
</template>

<script>
import { BNavbar, BContainer, BRow, BCol, BForm, BFormInput, BButton, BLink } from "bootstrap-vue-3";
import { isAuthenticated } from "../utils.js";

export default {
  name: "HomeHeader",
  components: {
    BNavbar,
    BContainer,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BLink,
  },
  methods: {
    goToLogin() {
      console.log(this.$router);
      this.$router.push('/auth/login');
    }
  }
};
</script>

<style scoped>
body {
  margin-top: 56px;
}

.b-navbar {
  padding: 0;
}
</style>
