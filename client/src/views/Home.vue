<template>
    <div>
      <b-button @click="logout()">Logout</b-button> 
        <h1>pray request</h1>
        <!-- button add pray -->
        <b-button data-toggle="my-modal" @click="addPrayModalShow()">add pray</b-button>
        <!-- Looping data for pray list -->
        <div v-for="data in this.$store.state.pray" :key="data.id">
            <prayList :data="data"></prayList>
        </div>
        <!-- Modal for adding pray -->
        <div>
            <b-modal ref="my-modal" hide-footer title="Using Component Methods">
                <div class="d-block text-center">
                        <b-form-input
                        id="newPrayInput"
                        v-model="newPray"
                        required
                        style="width='auto'"
                        placeholder="add your pray here"
                        ></b-form-input>
                </div>
                <b-button class="mt-2" variant="outline-warning" block  @click="addPraySubmit()">add</b-button>
            </b-modal>
        </div>
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
    data(){
        return {
            newPray : ""
        }
    },
    created(){
        if(!token){
            router.push("/login");
        }
        console.log("masuk ke created");
        this.$store.dispatch("getAllPray");
    },
    methods:{
        async addPrayModalShow(){
            await this.$refs['my-modal'].show();
        },
        async addPraySubmit(){
            await this.$refs['my-modal'].hide();
            const data = this.newPray;
            this.$store.dispatch("addPray",data);
        },
        async logout(){
            localStorage.removeItem("token");
            await router.push("/login")
        }
    }
}
</script>


