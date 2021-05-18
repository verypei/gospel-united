<template>
    <div>
        <navbar />
        <h1>halaman profile orang laen</h1>

        <ul class="list-group">
            <li class="list-group-item">name: {{this.$store.state.otherProfile.name}}</li>
            <li class="list-group-item">dob: {{this.$store.state.otherProfile.date_of_birth}}</li>
            <li class="list-group-item">phone: {{this.$store.state.otherProfile.phone}}</li>
            <li class="list-group-item">address: {{this.$store.state.otherProfile.address}}</li>
            <li class="list-group-item">church: {{this.$store.state.otherProfile.church}}</li>
        </ul>
        <br>
    </div>
</template>

<script>
import navbar from "../components/navbar"
export default{
    components:{
        navbar
    },
    created(){
        console.log("masuk ke created profile page");
        this.$store.dispatch("getOtherProfile");
        
    }
}
</script>
