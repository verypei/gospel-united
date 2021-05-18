<template>
    <div>
        <navbar />
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
                        <b-form-textarea
                        id="newPrayInput"
                        v-model="newPray"
                        required
                        style="width='auto'"
                        placeholder="add your pray here"
                        ></b-form-textarea>
                </div>
                <b-button class="mt-2" variant="outline-warning" block  @click="addPraySubmit()">add</b-button>
            </b-modal>
        </div>

        <!-- modal edit -->
        <div>
            <b-modal ref="edit-pray-modal" hide-footer title="Using Component Methods"  v-model="modalShow">
                <div class="d-block text-center">
                        <b-form-textarea
                        id="newPrayInput"
                        v-model="prayForEdit"
                        required
                        style="width='auto'"
                        >{{prayForEdit}}</b-form-textarea>
                </div>
                <b-button class="mt-2" variant="outline-warning" block  @click="editPraySubmit(prayForEdit,prayIdForEdit)">edit</b-button>
            </b-modal>
        </div>
        <!-- end -->
    </div>
</template>

<script>
import router from "../router";
import prayList from "../components/prayCard";
import navbar from "../components/navbar"
const token = localStorage.getItem("token");

export default {
    components:{
        prayList,
        navbar
    },
    data(){
        return {
            newPray : "",
            prayContent: ""
        }
    },
    async created(){
        console.log(token,"from created home client");
        if(!token){
            router.push("/login");
        }
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
        async editPraySubmit(data,id){
            await this.$store.dispatch("updatePray",{data,id});
            await this.$refs['edit-pray-modal'].hide();
        },
    },
    computed:{
        modalShow(){//show modal
            return Object.keys(this.$store.state.prayById).length > 0
        },

        prayIdForEdit(){
            return this.$store.state.prayById.id
        },

        prayForEdit: {
            get(){
                if(this.prayContent) return this.prayContent
                else return this.$store.state.prayById.pray
            },
            set(value){
                this.prayContent = value
            }
        }
    }
}
</script>


