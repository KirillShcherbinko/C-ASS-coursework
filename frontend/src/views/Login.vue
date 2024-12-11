<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
      <b-card class="card">
        <h3 class="text-center mb-3">Вход</h3>
        <b-form @submit.prevent="handleLogin" action="/auth/login" method="post">
          <!-- Электронная почта -->
          <p v-if="errorMessage"> {{ errorMessage }}</p>
          <b-form-group label="Электронная почта" label-for="email-input" label-rows-sm="4" style="text-align:left">
            <b-form-input
              id="email-input"
              v-model="email"
              type="email"
              placeholder="Введите ваш email"
              required
            ></b-form-input>
          </b-form-group>
  
          <!-- Пароль -->
          <b-form-group label="Пароль" label-for="password-input" label-rows-sm="4" style="text-align:left">
            <b-form-input
              id="password-input"
              v-model="password"
              type="password"
              placeholder="Введите ваш пароль"
              required
            ></b-form-input>
          </b-form-group>
  
          <!-- Кнопка войти -->
          <b-button type="submit" variant="primary" block>Войти</b-button>
        </b-form>
  
        <!-- Дополнительные ссылки -->
        <div class="text-center mt-3">
          <b-link href="/auth/registration">Нет аккаунта? Зарегистрируйтесь</b-link>
          <br />
          <b-link href="/">Вернуться на главную</b-link>
        </div>
      </b-card>
    </div>
  </template>
  
  <script>
  import { BCard, BForm, BFormGroup, BFormInput, BButton, BLink } from "bootstrap-vue-3";
  import { loginHandler } from "../handlers/auth-handlers.js";
  
  export default {
    name: "Login",
    components: {
      BCard,
      BForm,
      BFormGroup,
      BFormInput,
      BButton,
      BLink,
    },
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
        async handleLogin() {
            try {
                await loginHandler(this.email, this.password, this.$router);
            } catch (err) {
                this.errorMessage = err;
            }
        }
    },
  };
  </script>
  
  <style>
  .vh-100 {
    min-height: 100vh;
  }

  .card {
    width: 37.5vw;
  }

  @media screen and (max-width: 1024px) {
    .card {
        width: 50vw;
    }
  }

  @media screen and (max-width: 720px) {
    .card {
        width: 70vw;
    }
  }

  @media screen and (max-width: 480px) {
    .card {
        width: 65vw;
    }
  }
  </style>
  