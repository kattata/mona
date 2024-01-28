<script lang="ts" setup>
import { Form } from 'vee-validate';

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const user = reactive({
  email: '',
  password: ''
});

function handleSubmit() {
  // eslint-disable-next-line no-console
  console.log(user);
  isLoggedIn.value = true;

  navigateTo('/daily');
}

</script>

<template>
  <div class="page login-page">
    <h1>Log in</h1>
    <p>Get access to your daily dose of art!</p>
    <Form @submit="handleSubmit">
      <div class="form-element">
        <BaseInput v-model="user.email" name="email" label="Email" rules="required|email" />
      </div>
      <div class="form-element">
        <BaseInput v-model="user.password" name="password" label="Password" rules="required" type="password" />
      </div>
      <BaseButton type="submit">
        Submit
      </BaseButton>
    </Form>
  </div>
</template>

<style lang="postcss" scoped>
.login-page {
  form {
    margin-top: 16px;
    max-width: 400px;
  }

  button {
    margin-top: 12px;
  }
}
</style>
