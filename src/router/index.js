import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import ContactEdit from "@/views/ContactEdit.vue";
import ContactAdd from "@/views/ContactAdd.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts/add/",
    name: "contact.add",
    component: ContactAdd,
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: ContactEdit,
    props: true // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
