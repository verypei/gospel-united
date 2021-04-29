<template>
  <div class="home">
    <navbar />
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
        <div><h2 color=red>{{error}}</h2></div>

      </form>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000"
import axios from "axios"
import router from "../router"
import navbar from "../components/navbarLogin"

export default{
  components :{
    navbar
  },
  data() {
    return {
      emailInput : "",
      usernameInput : "",
      passwordInput : "",
      error : ""
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
          // localStorage.setItem("id",resp.data.id);
          localStorage.setItem("token",resp.data.token);
          localStorage.setItem("user_name",resp.data.user_name);
          localStorage.setItem("id",resp.data.id);
          router.push("/home");
      }).catch(err=>{
        this.error = "email already used"
        console.log(err,"====error from register client");
      })
    }
  }

}
</script>
