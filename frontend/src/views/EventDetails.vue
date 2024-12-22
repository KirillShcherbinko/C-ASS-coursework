<template>
    <b-container v-if="event">
      <b-row>
        <!-- Слева: Фото -->
        <b-col md="4" class="d-flex justify-content-center align-items-center">
          <b-card-img :src="imageUrl" alt="Event Photo" img-top class="event-photo" />
        </b-col>
        
        <!-- Справа: Информация -->
        <b-col md="8">
          <b-card :title="event.title" class="mb-3">
            <b-list-group>
              <b-list-group-item v-if="event.description">
                <strong>Описание:</strong> {{ event.description }}
              </b-list-group-item>
              <b-list-group-item v-if="event.sport">
                <strong>Вид спорта:</strong> {{ event.sport }}
              </b-list-group-item>
              <b-list-group-item v-if="event.location">
                <strong>Место проведения:</strong> {{ event.location }}
              </b-list-group-item>
              <b-list-group-item v-if="event.date">
                <strong>Дата:</strong> {{ new Date(event.date).toLocaleString() }}
              </b-list-group-item>
              <b-list-group-item v-if="event.minAge || event.maxAge">
                <strong>Возраст:</strong> {{ event.minAge }} - {{ event.maxAge }}
              </b-list-group-item>
              <b-list-group-item v-if="event.minWeight || event.maxWeight">
                <strong>Вес:</strong> {{ event.minWeight }} - {{ event.maxWeight }}
              </b-list-group-item>
              <b-list-group-item v-if="event.minHeight || event.maxHeight">
                <strong>Рост:</strong> {{ event.minHeight }} - {{ event.maxHeight }}
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
      </b-row>
      
      <!-- Ссылка на главную -->
      <b-container class="d-flex justify-content-center mt-3">
        <b-link href="/">Вернуться на главную</b-link>
      </b-container>
    </b-container>
  
    <b-container v-else>
      <p>Событие не найдено. Вернитесь на <b-link href="/">главную страницу</b-link>.</p>
    </b-container>
</template>
  
  
  <script>
  import { BContainer, BCard, BListGroup, BListGroupItem, BLink } from "bootstrap-vue-3";
  
  export default {
    name: "EventDetails",
    components: {
      BContainer,
      BCard,
      BListGroup,
      BListGroupItem,
      BLink,
    },
    data() {
      return {
        event: null, // Локальное состояние для события
      };
    },
    computed: {
      imageUrl() {
        return `/api/${this.event.photo}`;
      },
    },
    created() {
        const eventString = this.$route.query.event;
        if (eventString) {
            this.event = JSON.parse(decodeURIComponent(eventString));
        } else {
            console.error("Данные события отсутствуют.");
        }
    }
  };
  </script>
  

<style scoped>
.event-photo {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

b-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

b-card {
  margin-top: 20px;
}
</style>