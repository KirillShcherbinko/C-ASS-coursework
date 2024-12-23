<template>
    <b-container class="mt-4">
      <b-row>
        <!-- Левая колонка: фото и кнопка редактирования -->
        <b-col cols="3" class="text-center">
          <b-img
            :src="imageUrl"
            alt="User Photo"
            rounded
            fluid
            class="mb-3 profile-photo"
          ></b-img>
        </b-col>
  
        <!-- Правая колонка: данные профиля -->
        <b-col>
          <h3>{{ profile.roleData.firstname }} {{ profile.roleData.surname }}</h3>
          <p><strong>Роль:</strong> {{ profile.role }}</p>
  
          <template v-if="profile.role === 'athlete'">
            <p><strong>Фамилия:</strong> {{ profile.roleData.surname }}</p>
            <p><strong>Имя:</strong> {{ profile.roleData.firstname }}</p>
            <p v-if="profile.roleData.patronymic"><strong>Отчество:</strong> {{ profile.roleData.patronymic }}</p>
            <p><strong>Возраст:</strong> {{ profile.roleData.age }}</p>
            <p><strong>Пол:</strong> {{ profile.roleData.gender }}</p>
            <p><strong>Спорт:</strong> {{ profile.roleData.sport }}</p>
            <p v-if="profile.roleData.sportclub"><strong>Клуб:</strong> {{ profile.roleData.sportclub }}</p>
            <p v-if="profile.roleData.achievements"><strong>Достижения:</strong> {{ profile.roleData.achievements }}</p>
            <p v-if="profile.roleData.category"><strong>Категория:</strong> {{ profile.roleData.category }}</p>
            <p v-if="profile.roleData.coach"><strong>Тренер:</strong> {{ profile.roleData.coach }}</p>
            <p v-if="profile.roleData.weight"><strong>Вес:</strong> {{ profile.roleData.weight }} кг</p>
            <p v-if="profile.roleData.height"><strong>Рост:</strong> {{ profile.roleData.height }} см</p>
            <p v-if="profile.roleData.contacts"><strong>Контакты:</strong> {{ profile.roleData.contacts }}</p>
          </template>
  
          <template v-if="profile.role === 'organization'">
            <p><strong>Название организации:</strong> {{ profile.roleData.organizationName }}</p>
            <p><strong>Адрес:</strong> {{ profile.roleData.address }}</p>
            <p v-if="profile.roleData.description"><strong>Описание:</strong> {{ profile.roleData.description }}</p>
            <p v-if="profile.roleData.contacts"><strong>Контакты:</strong> {{ profile.roleData.contacts }}</p>
          </template>

          <div class="d-flex gap-3">
            <b-button variant="success" @click="editProfile">Редактировать</b-button>
            <b-button variant="danger" @click="logout">Выйти</b-button>
          </div>
  
          <template v-if="profile.role === 'organization'">
            <b-button variant="info" @click="createEvent" class="ml-2">Добавить событие</b-button>
          </template>
        </b-col>
      </b-row>
  
      <!-- Секция заявок -->
      <b-row class="mt-4">
        <b-col>
          <h4>Заявки</h4>
          <b-list-group>
            <template v-for="application in applications.applicationData" :key="application._id">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-1"><strong>Событие:</strong> {{ application.eventId }}</p>
                  <p class="mb-0"><strong>Статус:</strong> {{ application.status }}</p>
                </div>
                <div v-if="profile.role === 'organization' && application.status === 'в обработке'">
                  <b-button variant="success" @click="approveApplication(application._id)">Подтвердить</b-button>
                  <b-button variant="danger" class="ml-2" @click="rejectApplication(application._id)">Отклонить</b-button>
                </div>
              </b-list-group-item>
            </template>
          </b-list-group>
        </b-col>
      </b-row>
      <b-link href="/">Вернуться на главную</b-link>
    </b-container>
    <error-block v-if="errMessage" :message="errMessage" @clearMessage="clearMessage" />
  </template>
  
  <script>
  import {
    BContainer,
    BRow,
    BCol,
    BImg,
    BButton,
    BListGroup,
    BListGroupItem,
    BLink,
  } from "bootstrap-vue-3";

  import { fetchUserProfile } from "../handlers/profile-handlers.js";
  import { fetchUserApplications } from "../handlers/profile-handlers.js";
  import ErrorBlock from "../components/ErrorBlock.vue";


  export default {
    name: "Profile",
    components: {
      BContainer,
      BRow,
      BCol,
      BImg,
      BButton,
      BListGroup,
      BListGroupItem,
      BLink,
      "error-block": ErrorBlock,
    },
    data() {
      return {
        profile: null,
        applications: [],
        errMessage: "",
      };
    },
    computed: {
      imageUrl() {
        return `/api/${this.profile.roleData.photo}`;
      },
    },
    async mounted() {
      try {
        this.profile = await fetchUserProfile();
        this.applications = await fetchUserApplications();
      } catch(err) {
        this.errMessage = "Не удалось загрузить данные пользователя";
      }
    },
    methods: {
      logout() {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        this.$router.push('/');
      },
      editProfile() {
        console.log("Редактирование профиля");
      },
      editPhoto() {
        console.log("Редактирование фото");
      },
      createEvent() {
        console.log("Добавление нового события");
      },
      approveApplication(applicationId) {
        console.log("Подтвердить заявку", applicationId);
      },
      rejectApplication(applicationId) {
        console.log("Отклонить заявку", applicationId);
      },
      handleError(message) {
      this.errMessage = message; // Записываем сообщение об ошибке
      },
      clearMessage() {
        this.errMessage = ""; // Очистка сообщения об ошибке
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  .mt-4 {
    margin-top: 1.5rem;
  }
  
  .ml-2 {
    margin-left: 0.5rem;
  }
  </style>
  