import {createRouter, createWebHistory} from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Registration from "./views/Registration.vue";
import AthleteRegistration from "./views/AthleteRegistration.vue";
import OrganizationRegistration from "./views/OrganizationRegistration.vue";
//import Profile from "./views/Profile.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/auth/login', name: 'Login', component: Login },
    { path: '/auth/registration', name: 'Registration', component: Registration },
    { path: '/auth/registration/athlete', name: 'AthleteRegistration', component: AthleteRegistration },
    { path: '/auth/registration/organization', name: 'OrganizationRegistration', component: OrganizationRegistration },
    //{ path: "/profile" , name: "Profile", component: Profile },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes
})

  export default router;