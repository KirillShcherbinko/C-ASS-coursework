<template>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card title="Регистрация спортсмена">
            <b-form @submit.prevent="registerAthlete" action="/auth/registration/athlete" method="post">
              <p v-if="errorMessage"> {{ errorMessage }}</p>
              <!-- Email -->
              <b-form-group label="Email" label-for="email" style="text-align:left">
                <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
              </b-form-group>
  
              <!-- Password -->
              <b-form-group label="Пароль" label-for="password" style="text-align:left">
                <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
              </b-form-group>
  
              <!-- Основные данные -->
              <b-form-group label="Фамилия" label-for="surname" style="text-align:left">
                <b-form-input id="surname" v-model="form.surname" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Имя" label-for="firstname" style="text-align:left">
                <b-form-input id="firstname" v-model="form.firstname" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Отчество" label-for="patronymic" style="text-align:left">
                <b-form-input id="patronymic" v-model="form.patronymic"></b-form-input>
              </b-form-group>
  
              <b-form-group label="Фото" label-for="photo" style="text-align:left">
                <div class="mb-3">
                  <label for="photo" class="form-label">Выберите файл</label>
                  <input
                    id="photo"
                    type="file"
                    class="form-control"
                    accept="image/jpeg"
                    @change="handleFileChange"
                  />
                </div>
              </b-form-group>

  
              <b-form-group label="Контакты" label-for="contacts" style="text-align:left">
                <b-form-input id="contacts" v-model="form.contacts"></b-form-input>
              </b-form-group>
  
              <!-- Данные о спорте -->
              <b-form-group label="Вид спорта" label-for="sport" style="text-align:left">
                <b-form-input id="sport" v-model="form.sport" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Спортклуб" label-for="sportclub" style="text-align:left">
                <b-form-input id="sportclub" v-model="form.sportclub"></b-form-input>
              </b-form-group>
  
              <b-form-group label="Достижения" label-for="achievements" style="text-align:left">
                <b-form-textarea id="achievements" v-model="form.achievements" maxlength="300"></b-form-textarea>
              </b-form-group>
  
              <b-form-group label="Категория" label-for="category" style="text-align:left">
                <b-form-input id="category" v-model="form.category"></b-form-input>
              </b-form-group>
  
              <b-form-group label="Тренер" label-for="coach" style="text-align:left">
                <b-form-input id="coach" v-model="form.coach"></b-form-input>
              </b-form-group>
  
              <!-- Характеристики -->
              <b-form-group label="Возраст" label-for="age" style="text-align:left" min="6" max="100">
                <b-form-input id="age" v-model="form.age" type="number" required></b-form-input>
              </b-form-group>
  
              <b-form-group label="Пол" label-for="gender" style="text-align:left">
                <b-form-select id="gender" v-model="form.gender" :options="genderOptions" required></b-form-select>
              </b-form-group>
  
              <b-form-group label="Вес (кг)" label-for="weight" style="text-align:left" min="10">
                <b-form-input id="weight" v-model="form.weight" type="number"></b-form-input>
              </b-form-group>
  
              <b-form-group label="Рост (см)" label-for="height" style="text-align:left" min="50">
                <b-form-input id="height" v-model="form.height" type="number"></b-form-input>
              </b-form-group>
  
              <b-button variant="primary" type="submit">Зарегистрироваться</b-button>
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
  import { registrationHandler } from "../handlers/auth-handlers.js";
  import {
    BContainer,
    BRow,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormSelect,
    BButton,
  } from "bootstrap-vue-3";
  
  export default {
    name: "AthleteRegistration",
    components: {
      BContainer,
      BRow,
      BCol,
      BCard,
      BForm,
      BFormGroup,
      BFormInput,
      BFormTextarea,
      BFormSelect,
      BButton,
    },
    data() {
      return {
        form: {
          email: "",
          password: "",
          role: "athlete",
          surname: "",
          firstname: "",
          patronymic: "",
          photo: null,
          contacts: "",
          sport: "",
          sportclub: "",
          achievements: "",
          category: "",
          coach: "",
          age: null,
          gender: "",
          weight: null,
          height: null,
        },
        genderOptions: [
          { value: "male", text: "Мужской" },
          { value: "female", text: "Женский" },
        ],
        errorMessage: "",
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];  // Получаем первый выбранный файл
        if (file) {
          this.form.photo = file;  // Сохраняем файл в модель
        }
      },
      async registerAthlete() {
        try {
          const res = await registrationHandler(this.form, this.$router);
        } catch (err) {
          this.errorMessage = err;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .b-card {
    background-color: #f9f9f9;
    padding: 20px;
  }
  </style>
  