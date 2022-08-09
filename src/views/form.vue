<template>
  <div class="pa-3 text-left pb-5 mb-5" style="overflow-y: scroll; height: 92%">
    <h1>Customer feedback</h1>
    <p>
      We value your feedback, Please take a few minutes to give us feedback
      about our Product by filling the Form.
    </p>

    <h4>Rate this product</h4>
    <!-- <img src="@/assets/star_outline.svg" alt="star"> -->
    <div style="display: flex; align-items: center">
      <span
        @click="
          productRateStars.fill1 = true;
          productRateStars.fill2 = false;
          productRateStars.fill2 = false;
          productRateStars.fill3 = false;
          productRateStars.fill4 = false;
          productRate = 1;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!productRateStars.fill1"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          productRateStars.fill1 = true;
          productRateStars.fill2 = true;
          productRateStars.fill3 = false;
          productRateStars.fill4 = false;
          productRateStars.fill5 = false;
          productRate = 2;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!productRateStars.fill2"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          productRateStars.fill1 = true;
          productRateStars.fill2 = true;
          productRateStars.fill3 = true;
          productRateStars.fill4 = false;
          productRateStars.fill5 = false;
          productRate = 3;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!productRateStars.fill3"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          productRateStars.fill1 = true;
          productRateStars.fill2 = true;
          productRateStars.fill3 = true;
          productRateStars.fill4 = true;
          productRateStars.fill5 = false;
          productRate = 4;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!productRateStars.fill4"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          productRateStars.fill1 = true;
          productRateStars.fill2 = true;
          productRateStars.fill3 = true;
          productRateStars.fill4 = true;
          productRateStars.fill5 = true;
          productRate = 5;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!productRateStars.fill5"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <p class="my-0 ml-3">
        {{ productRate ? `${productRate} out of 5` : "Click to rate" }}
      </p>
    </div>

    <div>
      <label for="review">
        <h2>Your review</h2>
        By sharing your experiences, you're helping Other customer to make
        better choices . Thank you)</label
      >
      <textarea
        name="review"
        id="review"
        cols=""
        rows="5"
        style="border: 1px solid #E5E9F2;width: 100%; border-radius: 8px;margin: 1rem 0;padding: .5rem"
      ></textarea>
    </div>
    <div>
      <label for="title">
        <h2>Tittle of your review</h2>

        summarize your experience or highlight and interesting details)</label
      >
      <input
        type="text"
        name="title"
        id="title"
        style="border: 1px solid #E5E9F2;width: 100%; border-radius: 8px;margin: 1rem 0; height: 45px;padding: .5rem"
      />
    </div>

    <p>How likely are you to purchase from this merchant again?</p>

    <div style="display: flex; align-items: center">
      <span
        @click="
          storeRateStars.fill1 = true;
          storeRateStars.fill2 = false;
          storeRateStars.fill3 = false;
          storeRateStars.fill4 = false;
          storeRateStars.fill5 = false;
          storeRate = 1;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!storeRateStars.fill1"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          storeRateStars.fill1 = true;
          storeRateStars.fill2 = true;
          storeRateStars.fill3 = false;
          storeRateStars.fill4 = false;
          storeRateStars.fill5 = false;
          storeRate = 2;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!storeRateStars.fill2"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          storeRateStars.fill1 = true;
          storeRateStars.fill2 = true;
          storeRateStars.fill3 = true;
          storeRateStars.fill4 = false;
          storeRateStars.fill5 = false;
          storeRate = 3;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!storeRateStars.fill3"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          storeRateStars.fill1 = true;
          storeRateStars.fill2 = true;
          storeRateStars.fill3 = true;
          storeRateStars.fill4 = true;
          storeRateStars.fill5 = false;
          storeRate = 4;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!storeRateStars.fill4"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <span
        @click="
          storeRateStars.fill1 = true;
          storeRateStars.fill2 = true;
          storeRateStars.fill3 = true;
          storeRateStars.fill4 = true;
          storeRateStars.fill5 = true;
          storeRate = 5;
        "
        style="cursor:pointer"
      >
        <img
          v-if="!storeRateStars.fill5"
          src="@/assets/star_outline.svg"
          alt=""
          c
        />
        <img v-else src="@/assets/star.svg" alt="" />
      </span>
      <p class="my-0 ml-3">
        {{ storeRate ? `${storeRate} out of 5` : "Click to rate" }}
      </p>
    </div>

    <p>Attach a photo of the product or proof of payment (Optional)</p>

    <Button
      size="large"
      :containerStyle="{ marginTop: '2rem' }"
      label="Submit"
      :block="true"
      :primary="true"
          @onClick="submit()"

    />
  </div>
</template>

<script>
import Button from "@/components/Button/Button.vue";
import { mapGetters } from "vuex";
import {createReview} from '@/services/apiServices'
export default {
  components: { Button },
  data() {
    return {
      productRateStars: {
        fill1: false,
        fill2: false,
        fill3: false,
        fill4: false,
        fill5: false,
      },
      storeRateStars: {
        fill1: false,
        fill2: false,
        fill3: false,
        fill4: false,
        fill5: false,
      },

      productRate: 0,
      storeRate: 0,
      productReview: ''
    };
  },
  computed: {
        ...mapGetters({
      store: "getStore",
    }),
  },

  methods: {
      async submit() {
          await createReview( {
    "feedback_image": '' ,
    "comment": "A comment",
    "store_rating": 3,
    "product_rating": 3,
    "store": 22,
    "customer": 5,
    "product": 610
})
  
      }
  } 
};
</script>

<style lang="scss" scoped></style>
