<template>
  <div>
      <form @submit="login">

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" v-model="emailLogin">
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="passwordLogin">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000"
import axios from "axios"
import router from "../router"

export default {
  data() {
    return {
      emailLogin : "",
      passwordLogin : ""
    }
  },
  methods: {
    login(e) {
      e.preventDefault();
      let obj = {
        email : this.emailLogin,
        password : this.passwordLogin
      }
      console.log("masuk ke login",obj);
      axios({
        method : "POST",
        url : `${baseUrl}/users/login`,
        data : obj
      }).then(resp=>{
        localStorage.setItem("token",resp.data.token)
        router.push("/home");
      }).catch(err=>{
        console.log(err,"====error from login client");
      })
    }
  }
}
</script>