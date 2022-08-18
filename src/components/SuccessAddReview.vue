<template>
  <div class="rounded-xl">
 
    <v-card
      height="280px"
    
      class="elevation-0 overflow-hidden"
      style="display: flex; align-items: center"
    >
      <div>
        <div
          style="
            width: 145px;
            height: 145px;
            background: #ffc350;
            border-radius: 70px;
            position: absolute;
            bottom: -55px;
            left: -45px;
          "
        ></div>
        <div
          style="
            width: 145px;
            height: 145px;
            background: #1BA68F;
            border-radius: 70px;
            position: absolute;
            bottom: -55px;
            right: -45px;
          "
        ></div>
        <div
          style="
            width: 145px;
            height: 145px;
            background: #00B2FF;
            border-radius: 70px;
            position: absolute;
            top: -55px;
            left: -45px;
          "
        ></div>
        <v-card-text>
          <v-card-title
            class="justify-center"
            style="font-weight: 600; font-size: 1.1rem"
          >
           Thanks you for your feedback
          </v-card-title>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
 
  components: {
    // setupFooter,
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
  }
};
</script>

<style scoped>
.v-messages__message {
  color: green !important;
}
</style>
