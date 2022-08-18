import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // Routes with * are used as routing names in BottomNav. Don't change
  {
    name: "About",
    path: "/about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // {
  //   name: "Dashboard", // *
  //   path: "/dash",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "forgot_password" */ "../views/Dashboard.vue"
  //     ),
  // },
  {
    name: "ForgotPassword",
    path: "/forgot_password",
    component: () =>
      import(
        /* webpackChunkName: "forgot_password" */ "../views/auth/ForgotPassword.vue"
      ),
  },
  {
    name: "NewPassword",
    path: "/set-new-password",
    component: () =>
      import(
        /* webpackChunkName: "new_password" */ "../views/auth/NewPassword.vue"
      ),
  },
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Form",
    path: "/form",
    component: () =>
    import(/* webpackChunkName: "register" */ "../views/form.vue"),
  },
  {
    name: "Profile",
    path: "/profile",
    component: () =>
      import(
        /* webpackChunkName: "forgot_password" */ "../views/Profile.vue"
      ),
  },
  {
    name: "Inventory", // *
    path: "/inventory",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Inventory.vue"),
  },
  {
    name: "Sales", // *
    path: "/sales",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Sales.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
  },
  {
    name: "Manage", // *
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Settings.vue"),
  },
  {
    name: "Orders", // *
    path: "/orders",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Orders.vue"),
  },
  {
    name: "Register",
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/auth/Register.vue"),
  },
  {
    name: "GiveFeedback",
    path: "/feedback/:product_id",
    component: () =>
      import(
        /* webpackChunkName: "forgot_password" */ "../views/form.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem("leyyow_token");

  let whitelist = [
    "/register",
    "/login",
    "/forgot_password",
    "/set-new-password",
    "/set-new-password/",
    "/feedback/"
  ];
  // let whitelist = [
  //   {name: "Home"},
  //   {name: "Signin"},
  //   {name: "Signup"},
  //   {name: "ResetPassword"},
  //   {name: "newPassword"}
  // ];
  whitelist.some(item => console.log(to.path.includes(item), item))
  if (whitelist.some(item => to.path.includes(item))) {
   
    if (token) {
      next({
        name: "Inventory",
      });
    } else {
      next();
    }
  } else {

    if (token) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  }
});

export default router;
