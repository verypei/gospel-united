<template>
  <div class="home">
    <form @submit="register">

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" v-model="emailInput">
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="usernameInput">
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" v-model="passwordInput">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>

      </form>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000"
import axios from "axios"
import router from "../router"

export default{
  data  () {
    return {
      emailInput : "",
      usernameInput : "",
      passwordInput : ""
    }
  },
  methods : {
    register(e){
      e.preventDefault()
      let obj = {
        email : this.emailInput,
        user_name : this.usernameInput,
        password : this.passwordInput
      }
      axios({
        method : "POST",
        url : `${baseUrl}/users/register`,
        data : obj
      }).then(resp=>{
        localStorage.setItem("token",resp.data.token);
        router.push("/home");
      }).catch(err=>{
        console.log(err,"====error from register client");
      })
    }
  }

}
</script>
