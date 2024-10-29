<template>
  <div class="page">
    <h4>Tạo mới Liên hệ</h4>
    <contact-form 
      :contact='{
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      }' 
      @submit:contact="addContact" 
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },

  data() {
    return {
      message: "",
    };
  },

  methods: {
    async addContact(data) {
      try {
        await ContactService.create(data);
        alert('Liên hệ được thêm thành công.');
        this.$router.push({ name: "contactbook" });
      } 
      catch (error) {
        console.log(error);
      }
    },
  },
};

</script>
