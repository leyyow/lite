<template>
  <div class="pa-5" style="min-height: 100vh">
    <topNav>Manage</topNav>

    <div
      :style="
        `margin: 4rem 0; ${
          email_verified ? 'marginTop:4rem' : 'marginTop:8rem'
        }`
      "
    ></div>
    <v-card
      class="elevation-0  pa-3 rounded-xl"
      style="border: 1px solid #F3F3F3; text-align: left; min-height: 80vh"
    >
      <p class="text-left text-caption b">Your Profile</p>

      <div style="overflow-y: scroll">
        <div>
          <h5 class="text-color-primaryDark text-subtitle-1 font-weight-bold ">
            Change Profile Picture
          </h5>
          <p class="text-caption">
            Choose a new avatar to be used across cowrywise
          </p>
        </div>
        <div>
          <h5
            class="text-color-primaryDark text-subtitle-2 font-weight-medium "
          >
            Full name
          </h5>
          <p class="text-caption">Customize your account name</p>

          <v-card-text class="text-left text-body-2 text-color-primaryDark pa-0"
            >First Name
          </v-card-text>
          <v-text-field outlined class="mt-2"></v-text-field>
          <v-card-text class="text-left text-body-2 text-color-primaryDark pa-0"
            >Last Name
          </v-card-text>
          <v-text-field outlined class="mt-2"></v-text-field>
        </div>

        <div>
          <h5
            class="text-color-primaryDark text-subtitle-2 font-weight-medium "
          >
           Phone number
          </h5>
          <p class="text-caption">Customize your account name</p>

          <v-card-text class="text-left text-body-2 text-color-primaryDark pa-0"
            >Update Password
          </v-card-text>
          <v-text-field outlined class="mt-2"></v-text-field>
        </div>

        <div class="mb-3">
          <h5
            class="text-color-primaryDark text-subtitle-2 font-weight-medium "
          >
           Update Password
          </h5>
          <p class="text-caption">Change your old password to a new one</p>

          
          <Button :primaryLight="true" label="Change Password"  :containerStyle="{ marginTop: '2rem' }" size="default"/>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import topNav from "@/components/TopNav";
import { mapGetters } from "vuex";
import Button from "../components/Button/Button.vue";

export default {
  components: { topNav, Button },
  computed: {
    ...mapGetters({
      email_verified: "getEmailStatus",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
