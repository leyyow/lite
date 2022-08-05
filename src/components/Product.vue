<template>
  <div style="width: 48%"
    @click="viewProduct(product)"
  >
    <v-card
      rounded="lg"
      class="pa-3"
       elevation="0"
      style="width: 100%;"
    >
      <v-row>
         <v-img
            :src="product.product_image"
            lazy-src="https://picsum.photos/id/11/100/60"
            style="width: 100%; height: 100px;border-radius: 8px;"
          
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="text-left">
            <h2 class="mt-2 block">{{product.product_name}} </h2>
          <p class="text-subtitle-2">N{{product.price}}</p>
          <p class="text-caption text-left" style="line-height: 1rem">{{product.description}}</p>
          </div>
          
        <!-- <v-col class="pa-0" cols="2">
          <v-img
            :src="product.product_image"
            lazy-src="https://picsum.photos/id/11/100/60"
            style="width: auto; height: 50px"
            class="rounded"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col
          cols=6
          class="pa-0 pl-2"
          style="position: relative"
        >
        <div>
           <p class="ma-0 pr-5 text-subtitle-2 text-left">{{product.product_name}}</p>
          <p class="ma-0 pr-5 text-subtitle-2 text-left"> &#8358; {{product.price}}</p>
        </div>
         
         
        </v-col>
        <v-col
          cols=3
          class="pa-0"
          style="font-size: 16px;"
        >
          <p style="text-align: right" class="ma-0">
           
            >
          </p>
        
        </v-col> -->
      </v-row>
    </v-card>
  </div>
</template>

<script>  
  import * as mutationTypes from "@/store/mutationTypes"
  import { EventBus } from '@/services/eventBus'
  import {
    fethcStoreInventory,
    updateProduct,
  } from "@/services/apiServices"

  export default {
    name: 'Product',
    props: [
      "product",
    ],
    data: () => {
			return {
        display: false
      }
    },
    methods: {
      toggleDisplay () {
        let data = {display: this.display}

        updateProduct(data, this.product.id)
          .then(() => {
            EventBus.$emit(
              "open_alert",
              "success",
              !this.product.display
                ? "This product has been added to your gallery. Your visitors will now see it when they visit."
                : "This product has been removed from your gallery. Your visitors will no longer see it."
            )
            fethcStoreInventory(this.product.slug) // perhaps fetch only this item and update it
          })
          .catch((err) => {
            EventBus.$emit("open_alert", "error", `There was an error changing display status ${err}`)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      viewProduct(product) {
        this.$store.commit(mutationTypes.SET_PRODUCT_TO_BE_EDITTED, product);
        this.$emit('viewProduct')
      },
    },
    mounted() {
      this.display = this.product.display
      // console.log(this.product)
    }
  }
</script>
