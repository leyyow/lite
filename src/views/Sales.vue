<template>
  <div class="pa-5">
    <topNav :addProduct="addProduct">Orders</topNav>
    <div
      :style="
        `margin-top: 4rem; min-height: 80vh; ${
          email_verified ? 'marginTop:4rem' : 'marginTop:8rem'
        }`
      "
    >
      <div
        style="display: flex; align-items: center; min-height: 80vh"
        v-if="!orders.length"
      >
        <v-container>
          <OrdersEmpty />
          <h3
            class="justify-center mb-3"
            style="font-weight: 600; font-size: 1.3rem"
          >
            No Registered Sales
          </h3>

          <Button
            :block="true"
            label="Add Sales"
            :primary="true"
            size="large"
            @onClick="addProduct()"
          />
        </v-container>
      </div>

      <v-container v-else fluid class="pa-0">
        <v-row class="pa-0">
          <v-col cols="9">
            <!-- <v-text-field
              outlined
              prepend-inner-icon="mdi-magnify"
              placeholder="Search by name"
              background-color="grey lighten-5"
            >
            </v-text-field> -->
            <TextInput
              :placeholder="`Search by ${filterOption}`"
              name="search"
              inputStyles="background-color: #FDFDFD; margin-bottom: 0 !important; font-size: 12px"
              @update="(vl) => searchOrders(vl)"
            >
              <template v-slot:prepend-inner>
                <Search />
              </template>
            </TextInput>
          </v-col>
          <v-col cols="3" class="">
            <Button
              :block="true"
              :primary="true"
              :containerStyle="{ marginTop: '.2rem' }"
              @onClick="openDialog('filter_orders')"
            >
              <template v-slot:child>
                <v-icon>$vuetify.icons.filter</v-icon>
              </template>
            </Button>
            <!-- <v-btn
              color="primary"
              height="55"
              depressed
              @click="product_drawer = true"
              ><v-icon>$vuetify.icons.filter</v-icon></v-btn
            > -->
          </v-col>
        </v-row>

        <div
          style="
            max-height: 70vh;
            width: 100%;
            overflow-y: auto;
            margin: -2rem 0;
            padding: 20px 0;
          "
        >
          <OrderItem
            v-for="(order, i) in computedOrders || orders"
            :key="'order' + i"
            :order="order"
          />
        </div>
      </v-container>
      <v-navigation-drawer app right :width="400" v-model="edit_product_drawer">
        <AddOrEditSale
          v-if="edit_product_drawer"
          @back="backToProductView()"
          @close="closeAddEditDrawer()"
        />
      </v-navigation-drawer>
    </div>
    <MenuSpacer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import topNav from "@/components/TopNav";
import OrderItem from "@/components/OrderItem2";
import MenuSpacer from "@/components/MenuSpacer.vue";
import OrdersEmpty from "../components/Icons/OrdersEmpty.vue";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Search from "@/components/Icons/Search.vue";
import * as mutationTypes from "@/store/mutationTypes";
import { EventBus } from "@/services/eventBus";
import AddOrEditSale from "@/components/AddOrEditSale";

export default {
  components: {
    topNav,
    OrderItem,
    MenuSpacer,
    OrdersEmpty,
    Button,
    TextInput,
    Search,
    AddOrEditSale,
  },
  data: () => {
    return {
      // searchBy: "client name",
      searchTerm: "",
      pageWidth: true,
      activeKey: null,
      orderItems: [],
      expandIconPosition: "right",
      loading: false,
      loadingIndex: null,
      computedOrders: null,
      edit_product_drawer: false,
      // orders: [1, 2, 3],
    };
  },
  methods: {
    addProduct() {
      this.edit_product_drawer = true;
    },
    closeAddEditDrawer() {
      this.edit_product_drawer = false;
      this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, null);
    },
    openDialog(setup) {
      this.$store.commit(mutationTypes.SET_SETTINGS_STATE, false);
      EventBus.$emit("dialog", "open", setup);
    },
    searchOrders(term) {
      if (term) {
        this.computedOrders = this.orders.filter((item) =>
          item[
            this.filterOption == "Customer name"
              ? "full_name"
              : this.filterOption == "phone number"
              ? "phone"
              : this.filterOption == "Order number"
              ? "order_ref"
              : ""
          ]
            .toLowerCase()
            .includes(term.toLowerCase())
        );
      } else {
        this.computedOrders = null;
      }
      // console.log(this.computedOrders);
    },
    // openCollapse(i) {
    //   if (this.activeKey === i) {
    //     this.activeKey = null;
    //     return;
    //   }
    //   this.activeKey = null;
    //   this.loading = true;
    //   this.loadingIndex = i;
    //   this.orderItems = [];
    //   fetchOrderItems(this.orders[i].order_ref)
    //     .then((res) => {
    //       this.orderItems = res.data;
    //       this.activeKey = i;
    //     })
    //     .catch(() => {
    //       // console.log({ err });
    //       this.orderItems = [];
    //     })
    //     .finally(() => (this.loading = false));
    // },
    // markAsCompleted(id, i) {
    //   updateOrderStatus(id)
    //     .then(() => {
    //       fetchOrders();
    //       this.openCollapse(i);
    //     })
    //     .catch(() => {
    //       // console.log(err);
    //     });
    // },
    // markAll(items, i) {
    //   items.forEach((item) => {
    //     this.markAsCompleted(item.id, i);
    //   });
    // },
  },
  computed: {
    ...mapGetters({
      orders: "getOrders",
      email_verified: "getEmailStatus",
      filterOption: "getFilterOption",
    }),
  },
  watch: {
    searchTerm() {},

    // pageWidth_() {
    //   this.pageWidth_ > 767
    //     ? (this.pageWidth = true)
    //     : (this.pageWidth_ = false);
    // },
  },
  mounted() {
    // this.computedOrders = this.orders;
  },
};
</script>

<style scoped>
.v-text-field__details {
  display: none !important;
}

.v-input__slot {
  margin-bottom: 0 !important;
}
</style>
