<template>
  <div style="padding-bottom: 5rem">
    <h2 class="text-left text-h6 ma-5" @click="back()">
      <v-icon>mdi-chevron-left</v-icon>
      <span v-if="currentProduct">Edit {{ currentProduct.product_name }}</span>
      <span v-else>Add Sale</span>
    </h2>
    <v-icon class="mr-5" style="float: right; top: -47px;" @click="close"
      >mdi-close-thick</v-icon
    >

    <div class="pa-5">
      <v-container fluid class="pa-0">
        <div v-if="step === 1">
          <h3 class="text-left font-light">Select Product</h3>
          <div
            v-if="isMobile"
            :class="
              display == 'thumbnail'
                ? filteredInventory.length < 6
                  ? 'prod_img three-col'
                  : filteredInventory.length < 9
                  ? 'prod_img two-col'
                  : 'prod_img three-col'
                : 'prod_detail'
            "
          >
            <div
              v-for="(product, i) in filteredInventory"
              :key="'item' + i"
              :class="display == 'thumbnail' ? 'thumbnail' : ''"
              :style="display == 'thumbnail' ? thumbStyle(i) : ''"
              @click="toggleSelect(product)"
            >
              <span
                style="position: absolute; width: 16px; height: 16px;border: 2px solid black; right: 7px; top: 7px; display: flex; justify-content: center: align-items: center"
              >
                <v-icon
                  v-if="
                    selectedProducts.find(
                      (item) => JSON.stringify(item) === JSON.stringify(product)
                    )
                  "
                  style="font-size: 13px;    font-weight: bold;"
                  >mdi-check</v-icon
                ></span
              >
              <!-- should be direct child of prod_img/prod_detail because flex -->
              <Product
                v-if="display != 'thumbnail'"
                :product="product"
                :i="i"
                :logo="storeInfo.logo"
              />
            </div>
          </div>
        </div>
        <div v-else-if="step === 2">
          <a-row class="inner">
            <a-col :sm="24" :md="12" class="carts" style="margin-bottom: 7rem;">
              <p class="heading utm">
                YOU’RE BUYING
              </p>
              <div
                class="cart-item"
                v-for="(item, i) in selectedProducts"
                :key="i"
              >
                <div class="fascia">
                  <div
                    class="image"
                    :style="{ backgroundImage: `url('${item.product_image}')` }"
                  ></div>
                  <div>
                    <p class="name utm">{{ item.product_name }}</p>
                    <p class="price_group">
                      <span v-if="item.has_discount" class="item_price">
                        ₦{{
                          numeral(item.price - item.discountAmt).format("0,0")
                        }}
                      </span>
                      <span
                        :class="
                          item.has_discount
                            ? 'item_discount_price'
                            : 'item_price'
                        "
                      >
                        ₦{{ numeral(item.price).format("0,0") }}
                      </span>
                    </p>
                    <p class="item_subtotal">
                      <span v-if="item.has_discount">
                        ₦{{
                          numeral(
                            (item.price - item.discountAmt) * item.count
                          ).format("0,0")
                        }}
                      </span>
                      <span v-else>
                        ₦{{ numeral(item.price * item.count).format("0,0") }}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="">
                  <div v-if="item.first_variant_name" class="desc">
                    <p>Options:</p>
                    <p>
                      <span v-if="item.first_variant_name">
                        {{ item.selected_option }}
                      </span>
                      <span v-if="item.second_variant_name">
                        {{ ", " + item.selected_option2 }}
                      </span>
                    </p>
                  </div>
                  <!-- <div class="details"> -->
                  <div
                    class="count"
                    :style="!item.first_variant_name ? 'margin-top: 15px;' : ''"
                  >
                    <img
                      @click="removeFromCart(i)"
                      style="cursor: pointer"
                      src="../assets/trash.svg"
                      alt=""
                    />
                    <div class="grey">
                      <span class="svg" @click="reduceInCart(item)">
                        <svg
                          width="14"
                          height="10"
                          viewBox="0 0 14 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 1C0 0.44772 0.44772 0 1 0H13C13.5523 0 14 0.44772 14 1C14 1.5523 13.5523 2 13 2H1C0.44772 2 0 1.5523 0 1Z"
                            fill="#8093AD"
                          />
                        </svg>
                      </span>
                      <span class="utb">{{ item.count }}</span>
                      <span class="svg" @click="increaseInCart(item)">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 0C5.5523 0 6 0.44772 6 1V4H9C9.5523 4 10 4.44772 10 5C10 5.5523 9.5523 6 9 6H6V9C6 9.5523 5.5523 10 5 10C4.44771 10 4 9.5523 4 9V6H1C0.44772 6 0 5.5523 0 5C0 4.44771 0.44772 4 1 4H4V1C4 0.44772 4.44771 0 5 0Z"
                            fill="#8093AD"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <!-- </div> -->
                </div>
              </div>
              <div class="cart_prop"></div>
            </a-col>
            <!-- <a-col :sm="24" :md="12" class="checkout">
              <Checkout @submit="setVisible" />
            </a-col> -->
          </a-row>
        </div>
        <div v-else-if="step === 3">
          <h2 class="text-left">Add Customer</h2>

          <div class="d-flex my-4" style="justify-content: space-between">
            <div class="text-left" style="width: 48%">
              <label for="firstname">First name</label><br />
              <input
                style="border: 1px solid #E5E9F2;border-radius: 8px;width: 100%"
                class="pa-3"
                type="text"
                name="firstname"
                id="firstname"
                v-model="customerInfo.firstname"
              />
            </div>
            <div class="text-left" style="width: 48%">
              <label for="lastname">Last name</label><br />
              <input
                style="border: 1px solid #E5E9F2;border-radius: 8px;width: 100%"
                class="pa-3"
                type="text"
                name="lastname"
                id="lastname"
                v-model="customerInfo.lastname"

              />
            </div>
          </div>
           <div class="text-left my-4">
              <label for="email">Email Address</label><br />
              <input
                style="border: 1px solid #E5E9F2;border-radius: 8px;width: 100%"
                class="pa-3"
                type="text"
                name="email"
                id="email"
                v-model="customerInfo.email"

              />
            </div>
           <div class="text-left my-4">
              <label for="address"> Address</label><br />
              <input
                style="border: 1px solid #E5E9F2;border-radius: 8px;width: 100%"
                class="pa-3"
                type="text"
                name="address"
                id="address"
                v-model="customerInfo.address"

              />
            </div>
           <div class="text-left my-4">
              <label for="phone"> Phone number</label><br />
              <input
                style="border: 1px solid #E5E9F2;border-radius: 8px;width: 100%"
                class="pa-3"
                type="text"
                name="phone"
                id="phone"
                v-model="customerInfo.phone"

              />
            </div>
        </div>

        <Button
          v-if="currentProduct"
          size="large"
          :containerStyle="{ marginTop: '2rem' }"
          label="Save Product"
          :block="true"
          :primary="true"
          @onClick="fetchVariants()"
        />
        <div style="position: fixed; bottom: 2rem; width: 90%" v-else>
          <Button
            size="large"
            :containerStyle="{ marginTop: '2rem' }"
            label="Next"
            :block="true"
            :primary="true"
            @onClick="increase"
          />
        </div>

        <!-- </v-card-actions> -->
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as mutationTypes from "@/store/mutationTypes";
import {
  createProduct,
  fethcStoreInventory,
  updateProduct,
} from "@/services/apiServices";
import { EventBus } from "@/services/eventBus";
import Product from "@/components/Product";
import { saveOrder, createOrder,createCustomer } from "@/services/apiServices";

import Button from "./Button/Button.vue";
import numeral from "numeral";
import { fetchOrders } from '../services/apiServices';

export default {
  name: "AddOrEditProduct",
  components: {
    Button,
    Product,
  },
  data: () => {
    return {
      step: 1,
      isMobile: false,
      search: "",
      display: "thumbnail", // or detail
      selectedProducts: [],
      product: {
        first_variant: [],
        second_variant: [],
        third_variant: [],
      },
      customerInfo: {
        email: '',
        address: '',
        firstname: '',
        lastname: '',
        phone: '',
      },
      orderID: '',
      variant_pairs: 25, // should be an array
      description: "",
      discount: "",
      discount_type: "0",
      discount_types: [
        // get this from API (not built yet)
        // {value: "0", type: 0}, doesn't recognise as true
        { value: "1", type: "Percentage" },
        { value: "2", type: "Amount" },
      ],
      // display: true,
      get_variants: false,
      // hasDiscountError: false, // change casing
      // has_discount: false,
      // has_variant: false,
      image_preview: null,
      // preview: null,
      // price: "",
      // id: null,
      // product_name: "",
      // product_image: "",
      loading: false,
      total_stock: 0,
      uploading_image: false, // implement loading icon
      variants_with_options: [],
      variant_index: 1, // not zero indexed
      variant_data: {},
    };
  },
  methods: {
    numeral,
    increase() {
      if (this.step === 1) {
        if (this.selectedProducts.length) {
          this.selectedProducts.forEach((item) => (item.count = 1));
          this.step++;
        }
      }else if(this.step === 3){
        console.log('ajdlfa')
        this.saveOrderHandle()
      } else {
        this.step++;
      }
    },
        createOrderID() {
      var ref_type ='2'; // '1' for purchase by merchnat's customer
      var rand_int = Math.floor(Math.random() * 9999) + 1000;
      const today = new Date();
      var year = today
        .getFullYear()
        .toString()
        .slice(-2);
      var store_id = this.store.id.toString(); // this allows for up to 9999 stores merchants
      // var customer_id = '0000' // 0 for anonymous
      var month = (today.getMonth() + 1).toString(); // cause month is 0 indexed
      var day = today.getDate().toString();
      var cart_count = this.selectedProducts.length.toString();
      var hour = today.getHours().toString();
      var minute = today.getMinutes().toString();
      var second = today.getSeconds().toString();
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minute.length == 1) {
        minute = "0" + minute;
      }
      if (second.length == 1) {
        second = "0" + second;
      }
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      if (cart_count.length == 1) {
        cart_count = "0" + cart_count;
      }
      if (store_id.length == 1) {
        store_id = "000" + store_id;
      }
      if (store_id.length == 2) {
        store_id = "00" + store_id;
      }
      if (store_id.length == 3) {
        store_id = "0" + store_id;
      }
      // this.orderID = store_id + month + day + cart_count + hour + minute + customer_id + year
      this.orderID =
        ref_type + store_id + month + day + cart_count + year + rand_int;
    },
       saveOrderHandle() {
      this.createOrderID();
      let data = {
        address: this.customerInfo.address,
        email: this.customerInfo.email,
        full_name: this.customerInfo.firstname + ' ' + this.customerInfo.lastname,
        items_count: this.selectedProducts.length,
        total_amount:this.preshipTotal,
        unique_items: this.selectedProducts.length,
        order_ref: this.orderID,
        phone: this.customerInfo.phone,
        city: '-',
        products_total: this.numeral(this.preshipTotal).format("0,0"),
        shipping: 0,
        store: this.store.id,
      };
      console.log(this.store)

      // console.log(this.cartItems)
      // if (Object.values(data).includes("")) {
      //   EventBus.$emit("open_alert", "error", "Please fill in all fields");
      //   return;
      // }
      this.loading = true;
      saveOrder(data)
        .then(() => {
          this.createOrderItems();
          createCustomer({first_name: this.customerInfo.firstname, last_name: this.customerInfo.lastname, line1: this.customerInfo.address, email: this.customerInfo.email, phone: this.customerInfo.phone, stores: [this.store.id]})
        EventBus.$emit("dialog", "open", "success_add_sale"); // change success message        

        })
        .catch(() => {
          this.loading = false;
          console.log(this.loading)
          EventBus.$emit(
            "open_alert",
            "error",
            "An error occured. Please try again"
          );
        });
    },
    createOrderItems() {
      // console.log(this.cart_meta.preShipTotal , this.city , 100)
      createOrder(this.order)
        .then(() => {
          // this.payWithPaystack();
               fetchOrders();
        })
        .catch((err) => {
          console.log(err);
          EventBus.$emit(
            "open_alert",
            "error",
            "Error @ Paystack or CreateOrder"
          );
        })
        .finally(() => (this.loading = false));
    },
    increaseInCart(product) {
      // Increases product count while viewing cart
      // let product = this.selexctedProducts[index]

      let copy = this.selectedProducts;
      copy.find((item) => JSON.stringify(product) === JSON.stringify(item))
        .count++;
      this.selectedProducts = [...copy];

      // this.selectedProducts = arr
      copy.subTotal = copy.discountAmt
        ? copy.count * (copy.price - copy.discountAmt)
        : copy.count * copy.price;
      this.selectedProducts = [...copy];
      // this.$store.commit(mutationTypes.SAVE_CART, this.cart);
    },
    reduceInCart(product) {
      // Reduces product count while viewing cart

      if (product.count > 1) {
        let copy = this.selectedProducts;
        copy.find((item) => JSON.stringify(product) === JSON.stringify(item))
          .count--;

        copy.subTotal = copy.discountAmt // refactor this - used elsewhere
          ? copy.count * (copy.price - copy.discountAmt)
          : copy.count * copy.price;
        this.selectedProducts = [...copy];
        // this.$store.commit(mutationTypes.SAVE_CART, this.cart);
      }
    },
    removeFromCart(i) {
      // Deletes all instances of a product while viewing cart
      this.selectedProducts.splice(i, 1);
      // this.$store.commit(mutationTypes.SAVE_CART, this.cart);
    },
    toggleSelect(product) {
      let exists = this.selectedProducts.find(
        (item) => JSON.stringify(item) === JSON.stringify(product)
      );
      console.log(exists, product);
      if (exists) {
        this.selectedProducts = this.selectedProducts.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(exists)
        );
      } else {
        let cartItem = {
          ...product,
        };
        this.selectedProducts.push(cartItem);
      }
    },
    thumbStyle(i) {
      let style = {
        "background-size": "cover",
        "background-position": "50% 50%",
        "background-image": "url(" + this.productImages[i] + ")",
      };
      return style;
    },
    back() {
      if (this.step === 2) {
        this.selectedProducts = [];
        this.step--;
      } else if (this.step > 1) {
        this.step--;
      } else {
        this.currentProduct ? this.$emit("back") : this.close();
      }
    },
    close() {
      this.$emit("close");
      // this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, {});
    },
    fetchVariants() {
      if (this.product.has_variant) {
        this.get_variants = true;
      } else {
        this.finishCreation();
      }
      // this.get_variants = false
    },
    composePayload() {
      // this.has_variant ? (this.get_variants = true) : "";
      // var variant_1_options = this.variants_with_options.variant_1_options.reduce((acc, curr) => {
      //   acc += `${curr},`
      //   return acc
      // })
      // try {
      //   var variant_2_options = this.variants_with_options.variant_2_options.reduce((acc, curr) => {
      //     acc += `${curr},`
      //     return acc
      //   })
      // } catch {variant_2_options = ""}

      // let variant_options = this.generatePairs.reduce((acc, curr) => {
      //   acc += `${curr.text},${curr.qty},`;
      //   return acc;
      // }, "");

      // console.log(variant_options, this.variants)

      // let data = {
      //   // only add parameters that have values/new values so not to overwite the existing stuff with empty values
      //   product_name: this.product_name,
      //   description: this.description,
      //   has_discount: this.has_discount,
      //   has_variant: this.has_variant,
      //   first_variant_name: this.variants_with_options.variant_name_1,
      //   second_variant_name: this.variants_with_options.variant_name_2,
      //   first_variant: this.variants_with_options.variant_1_options,
      //   second_variant: this.variants_with_options.variant_2_options,
      //   variant_options: this.variants_with_options.variant_options,
      //   price: parseFloat(this.price) * 100,
      //   total_stock: this.total_stock,
      //   discount_type: this.discount_type,
      //   discount: this.discount,
      //   display: this.display,
      //   store: this.store.store_name,
      //   has_discount: this.addDiscount,

      //   // first_variant_name: this.variants[0] ? this.variants[0].key : "",
      //   // first_variant: this.variants[0]
      //   //   ? this.variants[0].values.reduce(
      //   //       (cumm, curr) => (cumm += `${curr.value},`),
      //   //       ""
      //   //     )
      //   //   : "",
      //   // second_variant_name: this.variants[1] ? this.variants[1].key : "",
      //   // second_variant: this.variants[1]
      //   //   ? this.variants[1].values.reduce(
      //   //       (cumm, curr) => (cumm += `${curr.value},`),
      //   //       ""
      //   //     )
      //   //   : "",
      // };
      // console.log(data)
      return this.product;
    },
    finishCreation() {
      // this.get_variants = true;
      // console.log(this.composePayload())
      let data = {
        ...this.product,
        ...{
          first_variant_name: this.variants_with_options.variant_name_1,
          second_variant_name: this.variants_with_options.variant_name_2,
          first_variant: this.variants_with_options.variant_1_options,
          second_variant: this.variants_with_options.variant_2_options,
          variant_options: this.variants_with_options.variant_options,
          store: this.store.store_name,
          price: Number(this.product.price + "00"),
          total_stock: this.product.total_stock,
        },
      };

      delete data.product_image;
      if (data.has_variant) {
        // data.price = 0;
        // data.total_stock = 0
      }
      if (this.hasDiscountError) {
        return;
      }
      if (this.product.id) {
        // console.log(data, this.variants_with_options);
        updateProduct(data, this.product.id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              this.currentProduct
                ? "Product updated successfully"
                : "Product created successfully"
            );
            this.product = {
              product_image: null,
              product_name: null,
              description: "",
              has_discount: false,
              has_variant: false,
              discount_type: "0",
              discount: "",
              product_id: null,
              price: null,
              total_stock: null,
              display: false,
            };
            EventBus.$emit("close_drawer");
            EventBus.$emit("close_drawer");
            fethcStoreInventory(this.storeSlug);
          })
          .catch((err) => {
            // console.log(err.response.data);
            EventBus.$emit(
              "open_alert",
              "error",
              Object.values(err.response.data)[0][0]
            );
          })
          .finally(() => {
            this.loading = false;
            this.currentProduct ? this.$emit("back") : this.close();
          });
      } else {
        EventBus.$emit("open_alert", "error", "please upload a product image");
      }
      this.get_variants = false;

      this.loading = true;
    },
    getVariants(variant_data) {
      // console.log(variant_data.variant_options.split(';')[0].split(',')[2])
      this.variant_data = variant_data;
      this.variants_with_options = variant_data;
      if (this.product.has_variant) {
        this.product.total_stock = variant_data.total_stock;
      }
      if (this.product.price == 0) {
        this.product.price = Number(
          variant_data.variant_options.split(";")[0].split(",")[2]
        );
      }

      // this.price = variant_data.price;

      // this.$nextTick(function(){
      //   this.get_variants = false
      // })
    },
    unsavedChangeMade() {
      this.$store.commit(mutationTypes.UNSAVED_CHANGE, true);
    },
    uploadImage(e) {
      const image = e.target.files[0];
      this.image_preview = URL.createObjectURL(image);

      let form = new FormData();
      form.append("product_image", e.target.files[0]);
      this.uploading_image = true;

      if (!this.product.id) {
        createProduct(form)
          .then((res) => {
            this.product.product_image = res.data.product_image;
            this.product.id = res.data.id;
            this.product.temp_id = res.data.id;
          })
          .catch((err) => {
            this.image_preview = "";
            EventBus.$emit(
              "open_alert",
              "error",
              Object.values(err.response.data)[0][0]
            );
          })
          .finally(() => {
            this.uploading_image = false;
          });
      } else {
        updateProduct(this.product, this.product.id)
          .then(() => {
            // EventBus.$emit(
            //   "open_alert",
            //   "success",
            //   this.currentProduct
            //     ? "Product updated successfully"
            //     : "Product created successfully"
            // );
            // EventBus.$emit("close_drawer");
            fethcStoreInventory(this.store.slug);
          })
          .catch(() => {
            // console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  watch: {
    variant_data() {
      this.finishCreation();
    },
  },
  computed: {
    ...mapGetters({
      store: "getStore",
      inventory: "getInventory",
      storeSlug: "getStoreSlug",
      currentProduct: "getProductToBeEditted",
      unsavedChange: "getUnsavedChange",
    }),
        order() {
      return this.selectedProducts.map((item, i) => {
        var order_item = {};
        order_item.index = i + 1;
        order_item.order = this.orderID;
        order_item.product = item.id;
        order_item.selected_option1 = item.selected_option;
        order_item.selected_option2 = item.selected_option2;
        order_item.qty = item.count;
        order_item.productid = item.id;
        order_item.sub_total = this.numeral(item.price * item.count).format("0,0");
        order_item.image_url = item.product_image;
        return order_item;
      });
    },
       preshipTotal() {
      // console.log(this.cart)
      return this.selectedProducts.reduce((prev, current) => prev +( current?.count * current?.price), 0)
    },
    productImages() {
      let images = [];
      for (let i = 0; i < this.filteredInventory.length; i++) {
        images.push(this.filteredInventory[i].product_image);
      }
      return images;
    },
    filteredInventory() {
      if (this.inventory) {
        return this.inventory.filter((product) => {
          if (product.display) {
            return product.product_name
              .toLowerCase()
              .match(this.search.toLowerCase());
          }
        });
      }
      return [];
    },
    onePrice() {
      try {
        return this.currentProduct.price.toString();
      } catch {
        return null;
      }
    },
    oneQty() {
      try {
        return this.currentProduct.total_stock.toString();
      } catch {
        return null;
      }
    },
    // has_variant = this.currentProduct.has_variant
  },
  mounted() {

    if (window.innerWidth < 504) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 504) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    // console.log(this.currentProducct);
    EventBus.$on("get_variants", () => {
      // console.log("get variants activated from edit product");
    });

    if (this.currentProduct) {
      this.product = this.currentProduct;
    } else {
      this.product = {
        product_image: null,
        product_name: null,
        description: "",
        has_discount: false,
        has_variant: false,
        discount_type: "0",
        discount: "",
        id: null,
        price: 0,
        total_stock: 0,
        display: true,
      };
    }

    // this.has_variant = this.currentProduct?.has_variant;
    // console.log(this.currentProduct);
    // if (this.currentProduct) {
    //   this.product_image = this.currentProduct.product_image;
    //   this.product_name = this.currentProduct.product_name;
    //   this.description = this.currentProduct.description;
    //   this.has_discount = this.currentProduct.has_discount;
    //   this.has_variant = this.currentProduct.has_variant;
    //   this.discount_type = this.currentProduct.discount_type;
    //   this.discount = this.currentProduct.discount;
    //   this.product_id = this.currentProduct.id;
    //   this.price = this.currentProduct.price;
    //   this.total_stock = this.currentProduct.total_stock;
    //   this.display = this.currentProduct.display;

    //   //   let variants = [];
    //   //   this.variants = variants;
    // } else {
    //   this.product_image = null;
    //   this.product_name = null;
    //   this.description = "";
    //   this.has_discount = false;
    //   this.has_variant = false;
    //   this.discount_type = "0";
    //   this.discount = "";
    //   this.product_id = null;
    //   this.price = null;
    //   this.total_stock = null;
    //   this.display = false;
    // }
  },
  created() {
    // this.currentProduct.one_price ? this.generalPrice = currentProduct.total_stock
    // console.log(this.has_variant)
    // this.$nextTick(function(){
    //   this.has_variant = this.currentProduct.has_variant
    //   console.log(this.has_variant)
    // })
  },
};
</script>

<style lang="scss" scoped>
.prod_img {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // height: 100vh;
}
// .prod_img::after {
//   content: "";
//   flex: auto;
// }
.prod_img.one-col > .thumbnail {
  width: 100%;
  min-height: 300px;
  height: auto;
}
.prod_img.two-col > .thumbnail {
  width: 48%;
  min-height: 300px;
  height: auto;
}
.thumbnail {
  position: relative;
  width: 32%;
  border-radius: 8px;
  // height: 150px;
  padding-bottom: 32%;
  margin-top: 1%;
}
.prod_detail {
  display: flex;
  flex-direction: column;
}
.prop {
  // pushes up the bottom most item up
  height: 60px;
  width: 100%;
}

.describe {
  font-size: 14px;
  text-align: left;
  color: #69747e;
  margin-bottom: 0;
}
.svg {
  cursor: pointer;
  padding: 5px 12px;
  span {
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    color: #2b2b2b;
  }
}
// .store-cart {
.cart_prop {
  // pushes up the bottom most item in cart
  height: 160px;
  width: 100%;
}
.cart_summary {
  width: 100%;

  position: relative;
  left: 0;
  bottom: 40px;
  background: #fff;
  padding: 50px 15px;
}
.back {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 0;
  padding: 10px;
  padding-left: 15px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
.fascia {
  position: relative;
  display: flex;
  width: 100%;
  // background: pink;
  .image {
    width: 82px;
    height: 82px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 15px;
  }
  .name {
    font-size: 20px;
  }
  .price_group,
  .item_subtotal {
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    bottom: 0;
  }
  p {
    margin: 0;
  }
  .item_price {
    color: #3a50d5;
  }
  .item_discount_price {
    color: #919eab;
    text-decoration: line-through;
  }
  .item_subtotal {
    right: 0;
  }
}
.desc,
.count {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #e6e9ef;
  // border-top: 1px solid #F8F9FA;
}
.desc {
  width: 100%;
  font-size: 16px;
  color: #4d5868;
  margin-top: 15px;
  p {
    margin: 0;
  }
}
.count {
  position: relative;
  padding: 13px 0;
  // border-bottom: 1px solid #E6E9EF;
  img {
    margin: 5px auto 0;
    height: 20px;
  }
  .grey {
    position: absolute;
    width: 120px;
    right: 0;
    bottom: 7px;
    background: #e6e9ef !important;
    border-radius: 4px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 5px;
  }
}

.inner {
  padding: 50px 100px;
}
.empty {
  width: 100%;
  padding-top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 16px;
    line-height: 20px;
    color: #8093ad;
    margin-top: 12px;
  }
  .main-btn {
    height: 50px;
    width: 200px;
  }
}
.heading {
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.05em;
  color: #8093ad;
}
.carts {
  border-right: 1px solid #e6e9ef;
  text-align: left;
  padding-right: 100px;
  .cart-item {
    position: relative;
    // border: 1px solid #E6E9EF;
    background: #f8f9fa;
    // background: #E6E9EF;
    // -moz-box-shadow: 0 0 5px #E6E9EF;
    // -webkit-box-shadow: 0 0 5px #E6E9EF;
    // box-shadow: 0 0 5px #E6E9EF;
    margin-bottom: 20px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 10px;
    .info {
      .details {
        .name {
          font-size: 16px;
          line-height: 20px;
          color: #2b2b2b;
          margin-bottom: 5px;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .cart_summary {
    position: fixed;
  }
  .inner {
    padding: 15px !important;
  }
  .carts {
    padding-right: 0;
    border: 0;
  }
  .cart-item {
    padding: 15px 0;
  }
  .form {
    margin-top: 40px;
    padding: 0 0 100px;
  }
}
// }
</style>
