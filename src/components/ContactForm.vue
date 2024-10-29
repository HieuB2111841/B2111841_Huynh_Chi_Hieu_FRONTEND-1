<template>
  <vee-form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <vee-field name="name" type="text" class="form-control" v-model="contactLocal.name" />
      <error-message name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <vee-field name="email" type="email" class="form-control" v-model="contactLocal.email" />
      <error-message name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <vee-field name="address" type="text" class="form-control" v-model="contactLocal.address" />
      <error-message name="address" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <vee-field name="phone" type="tel" class="form-control" v-model="contactLocal.phone" />
      <error-message name="phone" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>

      <button 
        v-if="contactLocal._id" 
        type="button" 
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>

      <button 
        type="button" 
        class="ml-2 btn btn-danger" 
        @click="cancel"
      >
        Thoát
      </button>
    </div>
  </vee-form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    VeeForm: Form,
    VeeField: Field,
    ErrorMessage,
  },

  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true }
  },

  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),

      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),

      address: yup
        .string()
        .max(100, "Địa chỉ tối đa 100 ký tự."),

      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ.",
        ),
    });

    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      contactLocal: this.contact,
      contactFormSchema,
    };
  },

  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },

    deleteContact() {
      this.$emit("delete:contact", this.contactLocal.id);
    },

    cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?');
      if (!reply) {
        // stay on the page if
        // user clicks 'Cancel'
        return false;
      }
      else this.$router.push({ name: "contactbook" });
    }
  },
};
</script>

<style scoped>

@import "@/assets/form.css";

</style>
