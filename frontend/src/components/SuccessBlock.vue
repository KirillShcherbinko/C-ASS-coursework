<template>
    <div v-if="message" class="success-block">
      <!-- Блок успешной операции с сообщением -->
      <div class="success-content">
        <span>{{ message }}</span>
        <button @click="clearMessage" class="close-btn">×</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SuccessBlock",
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
  .success-block {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1050;
  }
  
  .success-content {
    display: flex;
    align-items: center;
  }
  
  .success-content span {
    color: #155724;
    font-size: 16px;
    margin-right: 10px;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 18px;
    color: #155724;
    cursor: pointer;
  }
  
  .close-btn:hover {
    color: #c3e6cb;
  }
  </style>
  