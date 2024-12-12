<template>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="Регистрация организации">
            <b-form @submit.prevent="registerOrganization" action="/auth/registration/organization" method="post">
              <p v-if="errorMessage"> {{ errorMessage }}</p>
              <b-form-group label="Email" label-for="email">
                <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Пароль" label-for="password">
                <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Название организации" label-for="organizationName">
                <b-form-input id="organizationName" v-model="form.organizationName" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Адрес" label-for="address">
                <b-form-input id="address" v-model="form.address" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Контакты" label-for="contacts">
                <b-form-input id="contacts" v-model="form.contacts"></b-form-input>
              </b-form-group>
  
              <b-button variant="primary" type="submit">Зарегистрировать организацию</b-button>
            </b-form>
            <div class="text-center mt-3">
              <b-link href="/auth/login">Войти в аккаунт</b-link>
              <br />
              <b-link href="/">Вернуться на главную</b-link>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import { BContainer, BRow, BCol, BCard, BForm, BFormGroup, BFormInput, BButton, BLink } from 'bootstrap-vue-3';
  import { registrationHandler } from '../handlers/auth-handlers.js';

  export default {
    name: "OrganizationRegistration",
    components: {
      BContainer,
      BRow,
      BCol,
      BCard,
      BForm,
      BFormGroup,
      BFormInput,
      BButton,
      BLink,
    },
    data() {
      return {
        form: {
          email: "",
          password: "",
          organizationName: "",
          address: "",
          contacts: ""
        },
        errorMessage: "",
      };
    },
    methods: {
      async registerOrganization() {
        try {
          const res = await registrationHandler(this.form, this.$router);
        } catch (error) {
          this.errorMessage = err;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .b-card {
    background-color: #f9f9f9;
    padding: 20px;
  }
  </style>
  