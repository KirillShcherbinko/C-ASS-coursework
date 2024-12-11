<template>
    <b-container class="d-flex justify-content-center align-items-center">
      <b-row class="text-center">
        <b-col>
          <h2>Выберите вашу роль для регистрации</h2>
          <b-button variant="primary" class="mx-2" @click="goToRegistration('athlete')">Спортсмен</b-button>
          <b-button variant="secondary" class="mx-2" @click="goToRegistration('organization')">Организация</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="text-center mt-3">
      <b-link href="/auth/login">Войти в аккаунт</b-link>
      <br />
      <b-link href="/">Вернуться на главную</b-link>
    </div>
  </template>
  
  <script>
  import { BRow, BCol, BButton, BContainer, BLink } from "bootstrap-vue-3";

  export default {
    name: "Registration",
    components: {
        BRow,
        BCol, 
        BButton, 
        BContainer,
        BLink,
    },
    methods: {
      goToRegistration(role) {
        if (role === 'athlete') {
          this.$router.push("/auth/registration/athlete");
        } else {
          this.$router.push("/auth/registration/organization");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    width: 200px;
    margin: 10px;
  }
  </style>
  