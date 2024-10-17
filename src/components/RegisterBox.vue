<script setup lang="ts">
import { ref, onMounted} from 'vue';

import axios from 'axios';
import router from '@/router';

const firstName = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const birthday = ref('');
const successMessage = ref('');

const emailError = ref('');
const passwordError = ref('');
const usernameError = ref('');


const register = () => {
  emailError.value = '';
  passwordError.value = '';
  usernameError.value = '';
  successMessage.value = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Invalid email format';
    return;
  }

  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  if (username.value.length < 5) {
    usernameError.value = 'Username must be at least 6 characters';
    return;
  }
  

  // Handle registration logic here (e.g., send the data to your backend)
  alert(`Registration successful for ${firstName.value}`);
};
// Helper function to clear the form fields
const clearForm = () => {
  firstName.value = '';
  username.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  birthday.value = '';
};

try {
    // Send registration data to backend API
    const response = await axios.post('http://localhost:8080/api/users/register', {
      firstName: firstName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      birthday: birthday.value
    });

    successMessage.value = 'Registration successful!'; 
    clearForm(); 
    router.push('/login');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      usernameError.value = error.response.data.message; 
    } else {
      usernameError.value = 'Registration failed. Please try again later.';
    }
  }
};


</script>

<template>
    <section class="section">
      <div class="container">
        <h1 class="title">Register</h1>
  
        <form @submit.prevent="register">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="First Name"
                v-model="firstName"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>
  
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Username"
                v-model="username"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user-circle"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="usernameError">{{ usernameError }}</p>
          </div>
  
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="email"
                placeholder="Email"
                v-model="email"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
          </div>
  
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="password"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>
  
          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Confirm Password"
                v-model="confirmPassword"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="passwordError">{{ passwordError }}</p>
          </div>
  
          <div class="field">
            <label class="label">Birthday</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="date"
                v-model="birthday"
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div>
  
          <div class="field">
            <div class="control">
              <button class="button is-primary">Register</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </template>
  

  <style scoped>
  .section {
    margin-top: 50px;
  }
  
  .title {
    text-align: center;
  }
  
  .help.is-danger {
    color: #ff3860; 
  }
  </style>