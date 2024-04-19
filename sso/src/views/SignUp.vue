<template>
  <div class="flex h-screen">
    <div class="w-1/2 flex items-center justify-center bg-[#010b13] text-white">
      <div>
        <h1 class="text-4xl font-bold">Titan Project</h1>
        <p class="mt-4">
          Don't have an account?
          <router-link to="/" class="text-blue-300 hover:underline"
            >Sign In</router-link
          >
        </p>
      </div>
    </div>
    <div
      class="w-1/2 flex flex-col items-center justify-center bg-[#010203] text-white rounded-lg shadow-lg"
    >
      <form
        class="w-[400px] bg-[#010b13] border border-[#010b13] rounded-lg p-6 drop-shadow-[0_35px_35px_rgba(255,255,255,0.18)]"
        @submit.prevent="login"
      >
        <h1 class="mb-2 text-lg text-center">Sign Up</h1>
        <div class="mb-4">
          <label class="block font-medium mb-1" for="email">Email</label>
          <input
            class="w-full border p-2 rounded-lg bg-[#99999] text-black"
            type="email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1" for="password">Password</label>
          <input
            class="w-full border p-2 rounded-lg bg-[#99999] text-black"
            type="password"
            v-model="password"
            required
          />
        </div>
        <button
          class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { LOGIN_MUTATION } from "../graphql/login-user-query";
import Cookies from "js-cookie";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const { mutate, onDone } = useMutation(LOGIN_MUTATION);

    const login = async () => {
      const res = await mutate({
        email: email.value,
        password: password.value,
      });
    };

    onDone((data) => {
      Cookies.set("accessToken", data.data.login.accessToken, {
        domain: "localhost",
      });

      Cookies.set("refreshToken", data.data.login.accessToken, {
        domain: "localhost",
      });
    });

    return {
      email,
      password,
      login,
    };
  },
};
</script>
