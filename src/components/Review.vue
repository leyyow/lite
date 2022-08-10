<template>
  <div v-if="currentProduct">
    <h2
      class="text-left text-h6 ma-5 font-weight-bold text-color-primaryDark"
      @click="back()"
    >
      <v-icon>mdi-chevron-left</v-icon>
      Review
    </h2>
    <!-- <v-icon
      class="mr-5" 
      style="float: right; top: -47px;"
      @click="close"
    >mdi-close-thick</v-icon> -->
    <!-- <v-divider></v-divider> -->
    <div class="pa-5" style="padding-bottom: 6rem !important;">
      <v-container fluid class="pa-0  text-left">
        <div style="display: flex; align-items: center">
          <span style="cursor:pointer">
            <img
              v-if="avgRating < 1"
              src="@/assets/star_outline.svg"
              alt=""
              c
            />
            <img v-else src="@/assets/star.svg" alt="" />
          </span>
          <span style="cursor:pointer">
            <img
              v-if="avgRating < 2"
              src="@/assets/star_outline.svg"
              alt=""
              c
            />
            <img v-else src="@/assets/star.svg" alt="" />
          </span>
          <span style="cursor:pointer">
            <img
              v-if="avgRating < 3"
              src="@/assets/star_outline.svg"
              alt=""
              c
            />
            <img v-else src="@/assets/star.svg" alt="" />
          </span>
          <span style="cursor:pointer">
            <img
              v-if="avgRating < 4"
              src="@/assets/star_outline.svg"
              alt=""
              c
            />
            <img v-else src="@/assets/star.svg" alt="" />
          </span>
          <span style="cursor:pointer">
            <img
              v-if="avgRating < 5"
              src="@/assets/star_outline.svg"
              alt=""
              c
            />
            <img v-else src="@/assets/star.svg" alt="" />
          </span>
          <p class="my-0 ml-3">
            {{ `${avgRating} out of 5` }}
          </p>
        </div>
        <p>Review ({{ currentProduct.review_count }}) in total</p>

        <div
          class="d-flex justify-content-between"
          style="width: 100%; justify-content: space-between; align-items: center"
        >
          <span>5 star</span>
          <div class="col-9">
            <v-progress-linear
              v-model="star5"
              color="#F8A401"
              height="20"
              style="border-radius: 5px"
            ></v-progress-linear>
          </div>

          <span>{{ Math.round(star5) }}%</span>
        </div>
        <div
          class="d-flex justify-content-between"
          style="width: 100%; justify-content: space-between; align-items: center"
        >
          <span>4 star</span>
          <div class="col-9">
            <v-progress-linear
              v-model="star4"
              color="#F8A401"
              height="20"
              style="border-radius: 5px"
            ></v-progress-linear>
          </div>
          <span>{{ Math.round(star4) }}%</span>
        </div>
        <div
          class="d-flex justify-content-between"
          style="width: 100%; justify-content: space-between; align-items: center"
        >
          <span>3 star</span>
          <div class="col-9">
            <v-progress-linear
              v-model="star3"
              color="#F8A401"
              height="20"
              style="border-radius: 5px"
            ></v-progress-linear>
          </div>
          <span>{{ Math.round(star3) }}%</span>
        </div>
        <div
          class="d-flex justify-content-between"
          style="width: 100%; justify-content: space-between; align-items: center"
        >
          <span>2 star</span>
          <div class="col-9">
            <v-progress-linear
              v-model="star2"
              color="#F8A401"
              height="20"
              style="border-radius: 5px"
            ></v-progress-linear>
          </div>
          <span>{{ Math.round(star2) }}%</span>
        </div>
        <div
          class="d-flex justify-content-between"
          style="width: 100%; justify-content: space-between; align-items: center"
        >
          <span>1 star</span>
          <div class="col-9">
            <v-progress-linear
              v-model="star1"
              color="#F8A401"
              height="20"
              style="border-radius: 5px"
            ></v-progress-linear>
          </div>
          <span>{{ Math.round(star1) }}%</span>
        </div>

        <h2 class="my-5">Customer reviwes ({{ reviews.length }})</h2>

        <v-card elevation="2" class="mt-2 mb-5" v-for="item in reviews" :key="item.id">
          <v-row class="mx-2" justify="space-between">
            <v-card-title>Anonymous</v-card-title>
            <div style="display: flex; align-items: center">
              <span style="cursor:pointer">
                <img
                  style="width: 20px"
                  v-if="item.product_rating < 1"
                  src="@/assets/star_outline.svg"
                  alt=""
                  c
                />
                <img
                  style="width: 20px"
                  v-else
                  src="@/assets/star.svg"
                  alt=""
                />
              </span>
              <span style="cursor:pointer">
                <img
                  style="width: 20px"
                  v-if="item.product_rating < 2"
                  src="@/assets/star_outline.svg"
                  alt=""
                  c
                />
                <img
                  style="width: 20px"
                  v-else
                  src="@/assets/star.svg"
                  alt=""
                />
              </span>
              <span style="cursor:pointer">
                <img
                  style="width: 20px"
                  v-if="item.product_rating < 3"
                  src="@/assets/star_outline.svg"
                  alt=""
                  c
                />
                <img
                  style="width: 20px"
                  v-else
                  src="@/assets/star.svg"
                  alt=""
                />
              </span>
              <span style="cursor:pointer">
                <img
                  style="width: 20px"
                  v-if="item.product_rating < 4"
                  src="@/assets/star_outline.svg"
                  alt=""
                  c
                />
                <img
                  style="width: 20px"
                  v-else
                  src="@/assets/star.svg"
                  alt=""
                />
              </span>
              <span style="cursor:pointer">
                <img
                  style="width: 20px"
                  v-if="item.product_rating < 5"
                  src="@/assets/star_outline.svg"
                  alt=""
                  c
                />
                <img
                  style="width: 20px"
                  v-else
                  src="@/assets/star.svg"
                  alt=""
                />
              </span>
            </div>
          </v-row>

          <v-card-text>
            <div>
             {{ item.comment}}
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import {
  fethcStoreInventory,
  updateProduct,
  deleteProduct,
  fetchReview,
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";

export default {
  name: "ProductView",
  props: ["clear_variants"],
  data: () => {
    return {
      formatter: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2000.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2000.99 to be printed as $2,501)
      }),
      rates: [],
      reviews: [],
      star5: 0,
      star4: 0,
      star3: 0,
      star2: 0,
      star1: 0,
      avgRating: 0,
      productRateStars: {
        fill1: false,
        fill2: false,
        fill3: false,
        fill4: false,
        fill5: false,
      },
      display: null,
      variants: {
        options_1: [],
        options_2: [],
        options_3: [],
        variants: [],
      },
      // options_1: [],
      // options_2: [],
      // options_3: [],
      // variants: [],
    };
  },
  methods: {
    back() {
      this.$emit("back");
    },
    editProduct() {
      // already has product_to_be_edited
      this.$store.commit(mutationTypes.UNSAVED_CHANGE, false);
      this.$emit("editProduct", this.variants);
    },
    deleteProduct(id) {
      deleteProduct(id).then(() => {
        // console.log(res);
      });
    },
    toggleDisplay() {
      let data = { display: this.display };

      updateProduct(data, this.currentProduct.id)
        .then(() => {
          EventBus.$emit(
            "open_alert",
            "success",
            this.display
              ? "This product has been added to your gallery. Your visitors will now see it when they visit."
              : "This product has been removed from your gallery. Your visitors will no longer see it."
          );
          fethcStoreInventory(this.currentProduct.slug); // perhaps fetch only this item and update it
        })
        .catch((err) => {
          EventBus.$emit(
            "open_alert",
            "error",
            `There was an error changing display status ${err}`
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapGetters({
      currentProduct: "getProductToBeEditted",
    }),
    discount_type() {
      let type;
      this.currentProduct.discount_type == 0 ? (type = "None") : "";
      this.currentProduct.discount_type == 1 ? (type = "Percentage") : "";
      this.currentProduct.discount_type == 2 ? (type = "Amount") : "";
      return type;
    },
  },
  async mounted() {
    if (this.currentProduct) {
      let res = await fetchReview(this.currentProduct?.id);
      this.reviews = res.data;

      let rates = this.currentProduct?.rate_tracking.split(",");
      this.avgRating = rates.indexOf(String(Math.max(...rates))) + 1;
      this.rates = rates;
      this.star1 = (rates[0] / this.currentProduct.review_count) * 100;
      this.star2 = (rates[1] / this.currentProduct.review_count) * 100;
      this.star3 = (rates[2] / this.currentProduct.review_count) * 100;
      this.star4 = (rates[3] / this.currentProduct.review_count) * 100;
      this.star5 = (rates[4] / this.currentProduct.review_count) * 100;
      this.display = this.currentProduct.display;
      let _currentProduct = this.currentProduct;

      // this.$nextTick(function() {
      // console.log(_currentProduct);
      if (_currentProduct.has_variant) {
        // extracts options for each existing variant
        // as well as their prices and quantities
        let options_1 = _currentProduct.first_variant
          .split(",")
          .filter((item) => item !== "");
        options_1.slice(-1)[0] == "" ? options_1.splice(-1) : "";
        let options_2 = _currentProduct.second_variant
          .split(",")
          .filter((item) => item !== "");
        let options_3;

        _currentProduct.second_variant
          ? (options_2 = _currentProduct.second_variant.split(","))
          : (options_2 = []);
        options_2.slice(-1)[0] == "" ? options_2.splice(-1) : "";

        _currentProduct.third_variant
          ? (options_3 = _currentProduct.third_variant.split(","))
          : (options_3 = []);
        options_3.slice(-1)[0] == "" ? options_3.splice(-1) : "";

        let variant_options = _currentProduct.variant_options
          .split(";")
          .filter((item) => item !== "");
        let options_object = {};
        // console.log(variant_options)
        for (let index = 0; index < variant_options.length; index++) {
          let option_properties = variant_options[index].split(",");
          options_object[option_properties[0]] = {
            qty: option_properties[1],
            price: option_properties[2],
          };
        }

        // console.log("options object ", options_object);

        this.variants.options_1 = options_1;
        this.variants.options_2 = options_2;
        this.variants.options_3 = options_3;

        // variant_options.forEach((var_options) => {
        //   split_ops.push(var_options.split(","));
        // });

        if (options_1?.length && options_2?.length && options_3?.length) {
          // three variants
          for (let i = 0; i < options_1?.length; i++) {
            for (let j = 0; j < options_2?.length; j++) {
              for (let k = 0; k < options_3?.length; k++) {
                // let object = {
                //   name:
                //     options_1[i] +
                //     " / " +
                //     options_2[j] +
                //     " / " +
                //     this.options_3[k],
                // };
                // this.variants.push(object);
              }
            }
          }
        } else if (options_1?.length && options_2?.length) {
          // console.log(this.variants);
          this.variants = {};

          // two variants
          for (let i = 0; i < options_1?.length; i++) {
            for (let j = 0; j < options_2?.length; j++) {
              if (!this.variants[`${options_1[i]}/${options_2[j]}`]) {
                this.variants = {
                  ...this.variants,
                  ...{
                    [`${options_1[i]}/${options_2[j]}`]: {
                      name: `${options_1[i]}/${options_2[j]}`,
                      price:
                        options_object[`${options_1[i]}/${options_2[j]}`]
                          ?.price,
                      qty:
                        options_object[`${options_1[i]}/${options_2[j]}`]?.qty,
                    },
                  },
                };
                // console.log("2 variants", this.variants);
                // this.variants[options_1[i]] = { name: options_1[i] }
              }
              // let object = {
              //   name: options_1[i] + " / " + options_2[j],
              // };
              // this.variants.push(object);
            }
          }
        } else if (options_1?.length) {
          // console.log("1 varoi")
          this.variants = {};

          for (let i = 0; i < options_1?.length; i++) {
            // console.log(i)
            // this.variants.push({ name: options_1[i] });
            // console.log(this.variants,options_1[i])
            // console.log(options_1[i], options_1)
            if (!this.variants[options_1[i]]) {
              this.variants = {
                ...this.variants,
                ...{
                  [`${options_1[i]}`]: {
                    name: `${options_1[i]}`,
                    price: options_object[options_1[i]]?.price,
                    qty: options_object[options_1[i]]?.qty,
                  },
                },
              };
              // this.variants[options_1[i]] = { name: options_1[i] }
            }
            // console.log(this.variants, 'fdfa')
            // this.variants[options_1[i]] = { name: options_1[i] }
            // console.log(this.variants)

            // this.variants = []
          }
        }

        // let options = _currentProduct.variant_options
        //   ?.split(";")
        //   .filter((item) => item !== "");
        // console.log("optioons", _currentProduct.variant_options, options);
        // if (!options) {
        //   return;
        // }
        // options.forEach((item) => {
        // console.log(item);
        // let option_values = item.split(",");
        // console.log(option_values, options_1, item[0]);
        // this.variants[options_1[item[0]]] = {
        //   name: options_1[item[0]],
        //   qty: option_values[1],
        //   price: option_values[2],
        // };

        // this.variants[option_values[0]] ? this.variants[option_values[0]].qty = option_values[1] : null
        // this.variants[option_values[0]] ? this.variants[option_values[0]].price = option_values[2] : null
        // });

        // console.log("variants", this.variants);

        // if (options_1.length && options_2.length && options_3.length) {
        //   // three variants
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     for (let j = 0; j < options_2.length; j++) {
        //       for (let k = 0; k < options_3.length; k++) {
        //         let object = {
        //           name:
        //             options_1[i] +
        //             " / " +
        //             options_2[j] +
        //             " / " +
        //             options_3[k],
        //           qty: split_ops[x][1],
        //           price: split_ops[x][2],
        //         };
        //         this.variants.variants.push(object);
        //         x++;
        //       }
        //     }
        //   }
        // } else if (options_1.length && options_2.length) {
        //   // two variants
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     for (let j = 0; j < options_2.length; j++) {
        //       let object = {
        //         name: options_1[i] + " / " + options_2[j],
        //         qty: split_ops[x][1],
        //         price: split_ops[x][2],
        //       };
        //       this.variants.variants.push(object);
        //       x++;
        //     }
        //   }
        // } else if (options_1.length) {
        //   // one variant
        //   let x = 0;
        //   for (let i = 0; i < options_1.length; i++) {
        //     this.variants.variants.push({
        //       name: options_1[i],
        //       qty: split_ops[x][1],
        //       price: split_ops[x][2],
        //     });
        //     x++;
        //   }
        // }
      }
      // });
      // console.log("variants", this.variants);
    }
  },
};
</script>

<style scoped>
.describe {
  font-size: 14px;
  text-align: left;
  color: #69747e;
  margin-bottom: 0;
}
</style>
