import { defineStore } from "pinia";
import { csrfCookie, login, register, logout, getUser } from "@/http/auth-api";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({}); // this contains the errors

  // GETTER
  // if null = false (not logged in) ||  current user signed in = true
  const isLoggedIn = computed(() => user.value !== null);

  //   ACTIONS
  const fetchUser = async () => {
    //fetch user from database
    try {
      // data from getUser()
      const { data } = await getUser();
      user.value = data;
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    await csrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      // reset error state
      errors.value = {};
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser) => {
    await csrfCookie();
    try {
      await register(newUser);
      // authenticate new user
      await handleLogin({ email: newUser.email, password: newUser.password });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogin,
    handleLogout,
  };
});
