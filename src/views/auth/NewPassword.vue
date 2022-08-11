<template>
  <div class="pa-0">
    <MobileBanner />

    <div class="" fluid fill-height no-gutters>
      <v-row pa-0 ma-0>
        <v-col class="d-sm-flex d-none col-6 pa-0">
          <About />
        </v-col>

        <v-col
          :class="{ 'blue lighten-5': !$vuetify.breakpoint.xs }"
          class="auth mobile"
        >
          <div class="pa-5 pb-0 pt-0">
            <v-img
              v-if="!$vuetify.breakpoint.xs"
              alt="leyyow logo"
              :src="require('@/assets/leyyow_logo_old.svg')"
              class="logo"
              contain
              position="center left"
            />
            <h1 class="text-left mt-5 pt-5 text-h6" style="color: #0C3E26">
              Create new password
            </h1>
            <p class="text-left text-body-2" style="color: #445B54">
              Enter a new password below.
            </p>
            <v-form
              class="auth_form_xs mt-2"
              :class="{ form_lg: !$vuetify.breakpoint.xs }"
            >
               <TextInput
                  label="Password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  :validate="validateInputs"
                  :validations="validations.password"
                  @update="(passwordvl) => (password = passwordvl)"
                >
                  <template v-slot:prepend-inner>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5026 6.71801V4.87112C11.4759 2.70625 9.69865 0.973661 7.53464 1.0003C5.41445 1.02695 3.69991 2.73375 3.66382 4.85393V6.71801"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.58325 10.8027V12.7115"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.58314 6.2207C2.64579 6.2207 1 7.56827 1 11.6101C1 15.6528 2.64579 17.0004 7.58314 17.0004C12.5205 17.0004 14.1671 15.6528 14.1671 11.6101C14.1671 7.56827 12.5205 6.2207 7.58314 6.2207Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                  <template v-slot:append>
                    <svg
                      @click="showPassword = !showPassword"
                      width="20"
                      height="20"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.72258 14.6723C2.46063 13.1914 1 10.9599 1 9.00225C1 5.67525 5.19932 1.59766 10.3825 1.59766C12.5025 1.59766 14.4703 2.27726 16.0526 3.33216"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3448 5.42188C19.2485 6.56807 19.775 7.83597 19.775 9.00245C19.775 12.3294 15.5655 16.407 10.3823 16.407C9.45924 16.407 8.55751 16.2752 7.7146 16.0419"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.11627 11.2614C7.51275 10.6639 7.17498 9.84943 7.178 9.00044C7.17396 7.23044 8.60619 5.79212 10.3772 5.78907C11.2292 5.78705 12.0468 6.12482 12.6493 6.72733"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.5366 9.57031C13.2993 10.8808 12.2738 11.9083 10.9633 12.1487"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.3873 1L2.38733 17"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg> </template
                ></TextInput>
              <Button
                :block="true"
                label="Change password"
                :primary="true"
                size="large"
                @onClick="changePassword"
              />
              <p class="text-body-2 mt-5">
                Remember your password?
                <router-link to="/login"
                  ><span class="primary_link">Log in</span></router-link
                >
              </p>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {
  updatePassword,
} from "@/services/apiServices";
import About from "@/components/About";
import MobileBanner from "@/components/MobileBanner";
import TextInput from "@/components/TextInput";
import { required, minLength } from "@vuelidate/validators";
import { EventBus } from "@/services/eventBus";

import Button from "@/components/Button";

export default {
  name: "NewPassword",
  components: {
    About,
    MobileBanner,
    Button,
    TextInput,
  },
  data: () => ({
    showPassword: false,
    token: '',
    validateInputs: false,
    validations: {
      password: { required, minLength: minLength(8) },
    },
  }),
  methods: {
    changePassword() {
      let data = {
        password: this.password,
        token: '9ca6b8b708c0e2f2e7eafe69',
      }
      updatePassword(data)
      .then(() => {
        EventBus.$emit("dialog", "open", "success_password_reset_mail"); // change success message        
      })
      .catch((error) => {
        // add appropriate error response
        console.log(error)
      });
    }
  },
  computed: {},
};
</script>

<style scoped>
.form_lg {
  padding-top: 90px;
}
</style>
