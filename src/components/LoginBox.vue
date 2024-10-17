<template>
    <section class="section">
      <div class="container">
        <h1 class="title">Login</h1>
  
        <form @submit.prevent="loginUser">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" v-model="email" placeholder="Email" required />
            </div>
          </div>
  
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" v-model="password" placeholder="Password" required />
            </div>
          </div>
  
          <div class="control">
            <button class="button is-primary" type="submit">Login</button>
          </div>
  
          <p v-if="errorMessage" class="has-text-danger">{{ errorMessage }}</p>
        </form>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const successmessage = ref('');
  const loginUser = async () => {
    const loginData = {
      email: email.value,
      password: password.value,
    };
    const router = useRouter();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', loginData);
      if (response.status === 200){
        localStorage.setItem('token', response.data.token);
        successmessage.value = 'Logged in successfully';
        console.log('Logged in user data:', response.data.token);
        errorMessage.value = '';
        alert('Logged in successfully');
        router.push('/profilepage');}
      else {
        errorMessage.value = 'Invalid email or password';
      }
      
    } catch (error) {
      if (error.response) {
        errorMessage.value = error.response.data.message;
      } else if (error.request) {
        errorMessage.value = 'A problem occured. Try again.';
      }
      else {
        errorMessage.value = 'Login request error. Please try again later.';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>