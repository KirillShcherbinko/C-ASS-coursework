<template>
  <div v-if="message" class="error-block">
    <!-- Блок ошибки с сообщением -->
    <div class="error-content">
      <span>{{ message }}</span>
      <button @click="clearMessage" class="close-btn">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorBlock",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    clearMessage() {
      this.$emit("clearMessage");
    },
  },
};
</script>

<style scoped>
.error-block {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1050;
}

.error-content {
  display: flex;
  align-items: center;
}

.error-content span {
  color: #721c24;
  font-size: 16px;
  margin-right: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #721c24;
  cursor: pointer;
}

.close-btn:hover {
  color: #f5c6cb;
}
</style>
