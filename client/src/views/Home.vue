<template>
    <div>
        <h1>pray request</h1>
        <div v-for="data in this.$store.state.pray" :key="data.id">
            <prayList :data="data"></prayList>
        </div>
        <!-- modal -->
        
    </div>
</template>

<script>
import router from "../router";
import prayList from "../components/prayCard";
const token = localStorage.getItem("token");

export default {
    components:{
        prayList
    },
    created(){
        console.log("masuk created home page");
        if(!token){
            router.push("/login");
        }
        this.$store.dispatch("getAllPray");
    }
}
</script>


