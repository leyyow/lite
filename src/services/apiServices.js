import axios from "axios";
import * as urls from "./urls";

import * as mutationTypes from "@/store/mutationTypes";
// import { EventBus } from "@/services/eventBus"
import store from "@/store/index";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

try {
  var auth = store.getters.getSettlement.paystack_secret_key
} catch {null}

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// const Axios = axios.create({
//   timeout: 1000,
// });

export const apiLogin = (data) => {
  return axios({
    method: "post",
    url: urls.loginUrl,
    data,
  });
};

export const bankList = () => {
  return axios({
    method: "get",
    url: urls.bankListUrl,
    headers: {
      "Authorization": "Bearer " + auth,
    },
  });
};

export const createImage = (data) => {
  return axios({
    method: "post",
    url: urls.createImageUrl,
    data,
  });
};

export const createProduct = (data) => {
  return axios({
    method: "post",
    url: urls.createProductUrl,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};

export const createStore = (data) => {
  return axios({
    method: "post",
    url: urls.createStoreUrl,
    data,
  })
  // .then((res) => {
  //   store.commit(mutationTypes.SAVE_STORE, res.data);
  // })
  // .catch((err) => {
  //   EventBus.$emit("open_alert", "error", err)
  // });
};

export const createSubAcc = (data, key) => {
  return axios({
    method: "post",
    url: urls.createSubAccUrl,
    data,
    headers: {
      "Authorization": "Bearer " + key,
    },
  });
};

export const fetchOrderItems = (id) => {
  return axios({
    method: "get",
    url: `${urls.orderItemUrl}${id}/`,
  });
};

export const fetchOrders = () => {
  axios({
    method: "get",
    url: urls.ordersUrl,
  })
    .then((res) => {
      store.commit(mutationTypes.SAVE_ORDERS, res.data.sort( (objA, objB) => Number(new Date(objB.created)) - Number(new Date(objA.created))));
    })
    .catch(() => {
    });
};

export const fethcStoreInventory = (slug) => {
  axios({
    method: "get",
    url: `${urls.inventoryUrl}${slug}/`,
  })
    .then((res) => {
      // console.log(res.data)
         store.commit(mutationTypes.SAVE_VISITOR_INVENTORY, res.data)
         store.commit(mutationTypes.SAVE_INVENTORY, res.data);
    })
    .catch(() => {
    });
};
export const fetchStore = () => {
  axios({
    method: "get",
    url: `${urls.storeUrl}`,
  })
    .then(() => {
      // console.log(res.data)
     
    })
    .catch(() => {
    });
};

export const initialiseProduct = (id) => {
  let data = {image_id: id}
  return axios({
    method: "post",
    url: urls.initialiseProductUrl,
    data,
  });
};

export const joinWaitlist = (data) => {
  return axios({
    method: "post",
    url: urls.joinWaitListUrl,
    data,
  });
};

export const requestPasswordReset = (data) => {
  return axios({
    method: "post",
    url: urls.requestPasswordResetUrl,
    data,
  })
};

export const resolveAcc = (bank_code, acc_no, key) => {
  return axios({
    method: "get",
    url: `${urls.resolveAccUrl}${acc_no}&bank_code=${bank_code}`,
    headers: {
      "Authorization": "Bearer " + key,
    },
  });
};

export const saveMerchSettlement = (data) => {
  return axios({
    method: "post",
    url: urls.saveBankUrl,
    data,
  });
};

export const signUp = (data) => {
  // console.log(urls.signUpUrl)
  return axios({
    method: "post",
    url: urls.signUpUrl,
    data,
  })
 
};

export const updatePassword = (data) => {
  return axios({
    method: "post",
    url: urls.updatePasswordUrl,
    data,
  })
};

export const updateOrderStatus = (id, status) => {
  return axios({
    method: "patch",
    url: `${urls.updateOrderStatus}${id}/`,
    data: {
      status,
    },
  });
};

export const updateProduct = (data, id) => {
  return axios({
    method: "patch",
    url: `${urls.updateProductUrl}${id}/`,
    data,
  });
};

export const deleteProduct = (id) => {
  return axios({
    method: "delete",
    url: `${urls.deleteProductUrl}${id}/`,
  });
};

export const updateStore = (data, id) => {
  // console.log(urls.updateStoreUrl)
  return axios({
    method: "patch",
    url: `${urls.updateStoreUrl}${id}/`,
    data,
  });
};

export const verifyEmailPhone = (otp, email_or_phone) => {
  return axios({
    method: "get",
    url: `${urls.verifyEmailPhoneUrl}${email_or_phone}/${otp}/`,
  });
};

export const verifyPasswordResetToken = (data) => {
  return axios({
    method: "post",
    url: urls.verifyPasswordResetTokenUrl,
    data,
  })
};

export const saveOrder = (data) => {
  return axios({
    method: "post",
    url: urls.saveOrderUrl,
    data,
  });
};

export const createOrder = (data) => {
  return axios({
    method: "post",
    url: urls.createOrderUrl,
    data,
  });
};
export const createReview = (data) => {
  return axios({
    method: "post",
    url: urls.createReviewUrl,
    data,
  });
};
export const createCustomer = (data) => {
  return axios({
    method: "post",
    url: urls.createCustomerUrl,
    data,
  });
};
export const fetchReview = (id) => {
  return axios({
    method: "get",
    url: `${urls.fetchReview}${id}`,
  });
};
