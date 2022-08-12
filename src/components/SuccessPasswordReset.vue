<template>
  <div class="pa-8">
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="44" height="44" rx="13" fill="#4CAF50" fill-opacity="0.05" />
      <rect
        x="0.5"
        y="0.5"
        width="43"
        height="43"
        rx="12.5"
        stroke="#4CAF50"
        stroke-opacity="0.14"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.33337 22.1557C9.33337 13.0383 12.508 10 22.0318 10C31.5556 10 34.7302 13.0383 34.7302 22.1557C34.7302 31.2718 31.5556 34.3114 22.0318 34.3114C12.508 34.3114 9.33337 31.2718 9.33337 22.1557Z"
        fill="#4CAF50"
      />
      <path
        d="M29.4571 18.2227C29.4571 18.2227 25.177 23.3595 22.0465 23.3595C18.9174 23.3595 14.5892 18.2227 14.5892 18.2227"
        stroke="#FDFDFD"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <h1 class="my-4">Password Reset Successfully</h1>
    <p>
      Please Login with your new password
    </p>

    <Button
      :block="true"
      label="Login"
      :primary="true"
      size="large"
      @onClick="goToLogin"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/services/eventBus";
import Button from "@/components/Button";

export default {
  name: "SuccessPasswordReset",
  components: {
    Button
  },
  data: () => ({
    acc_name: "",
    acc_no: "",
    acc_resolved: false,
    acc_set: false,
    banks: [],
    bank_code: "",
    bank_name: "",
  }),
  methods: {
    goToLogin() {
      EventBus.$emit("dialog", "close", "");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      settlement: "getSettlement",
      settings: "getSettingsState",
    }),
  },

  
};
</script>

<style scoped>
.v-messages__message {
  color: green !important;
}
</style>
