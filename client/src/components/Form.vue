<template>
  <div>
    <h1>{{ type }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" v-model="email" />
        <div v-for="err in errs" :key="err.field" class="errors">
          {{ err.field === "email" ? err.message : "" }}
        </div>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" v-model="password" />
        <div v-for="err in errs" :key="err.field" class="errors">
          {{ err.field === "password" ? err.message : "" }}
        </div>
      </div>
      <div class="errors" v-for="err in errs" :key="err.field">
        {{ err.field === "general" ? err.message : "" }}
      </div>
      <div class="form-control submit">
        <input type="submit" :value="type" />
      </div>
      <div class="form-control" v-if="type === 'Login'">
        <router-link to="/register">Not a user?</router-link>
      </div>
      <div class="form-control" v-if="type === 'Register'">
        <router-link to="/login">Already registered?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Form",
  props: {
    type: String
  },
  setup(props) {
    let email = ref("");
    let password = ref("");
    let type = ref(props.type);
    type.value = type.value.toLowerCase();
    let errs = ref([]);
    const store = useStore();
    const router = useRouter();

    const verification = (email, password) => {
      let errors = [];

      if (email.length <= 2) {
        errors = [
          ...errors,
          { field: "email", message: "Email must be greater than two characters" }
        ];
      }
      if (password.length <= 2) {
        errors = [
          ...errors,
          { field: "password", message: "Password must be longer than two characters" }
        ];
      }

      return {
        errors,
        valid: !Boolean(errors.length)
      };
    };

    const handleSubmit = async () => {
      let { errors, valid } = verification(email.value, password.value);
      if (!valid) {
        errs.value = errors;
      } else {
        errs.value = [];

        const response = await fetch(`http://localhost:3333/api/v0/auth/${type.value}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email.value, password: password.value })
        });
        const data = await response.json();

        if (data.message) {
          errs.value = [{ field: "general", message: data.message.split(":")[1] }];
        } else {
          store.commit("authentication/setToken", data.token);
          store.commit("authentication/setIsLoggedIn", true);
          router.push("/projects");
        }

        email.value = "";
        password.value = "";
      }
    };

    return {
      email,
      password,
      errs,
      handleSubmit
    };
  }
};
</script>

<style scoped>
h1 {
  width: 100%;
  height: 75px;
  text-align: center;
  line-height: 75px;
  margin-bottom: 25px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  margin: 0 auto;
  height: fit-content;
  padding: 25px 50px;
}
.form-control {
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 50px minmax(0, auto);
  gap: 15px;
  align-items: center;
  justify-content: space-between;
}
.form-control input {
  height: 75%;
  padding: 10px;
  outline: none;
  border: none;
  background-color: rgb(148, 141, 141);
  color: rgb(235, 235, 235);
  font-size: 15px;
  transition: 0.2s ease;
}
.form-control input:focus {
  border: 3px solid steelblue;
}
.submit {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 25px;
  height: 100%;
}
.submit input {
  width: 100%;
  cursor: pointer;
  background-color: steelblue;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.errors {
  grid-row: 2/3;
  grid-column: 1/-1;
  margin: -10px 0 0 0;
  color: #ff0000;
  height: 20px;
  font-size: 14px;
}
</style>
