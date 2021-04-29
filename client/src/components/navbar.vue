<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" disabled id="welcome-name"><em>Shalom</em> ~{{nameToUpperCase}}~</b-nav-item>
            <b-nav-item-dropdown text="" right>
                <b-dropdown-item href="#">hebrew</b-dropdown-item>
                <b-dropdown-item href="#">pray</b-dropdown-item>
                <b-dropdown-item href="#">contributor</b-dropdown-item>
                <b-dropdown-item href="#">articles</b-dropdown-item>
                <b-dropdown-item ><router-link  to="/profile">profile</router-link></b-dropdown-item>
                <b-dropdown-item href="#" @click="logout()">sign out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import router from "../router"
export default {
    data(){
        return {
            name : localStorage.getItem("user_name")
        }
    },
    methods: {
        logout() { 
            localStorage.clear();
            router.push("/login");
        },
        mounted(){
            console.log(this.name,"nama dari mounted navbar");
        }
    },
    computed: {
        nameToUpperCase:function(){
            let name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
            return name;
        }
    }
}
</script>
<style scoped>

</style>
