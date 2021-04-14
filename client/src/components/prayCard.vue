<template>
    <div class="bigCard">
        <!-- card -->
        <div class="card">
            <div class="card-body">
                <blockquote  class="blockquote">
                    <p class="card-body mb-0">{{data.pray}}</p>
                </blockquote>
                <span id="icons">
                    <fa icon="trash" size="2x" style="padding-left:10px;"  @click="deletePray(data.id)"/>
                    <fa icon="edit" size="2x" style="padding-left:10px;" v-b-modal.modal-1 @click="editPray(data.id)"/>
                </span>
                <footer><em>~{{data.user_name}}~</em></footer>
            </div>
        </div>
        <!-- modal -->
        <div>
            <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
                    <b-form-input
                    id="newPrayInput"
                    v-model="prayForEdit"
                    required
                    style="width='auto'"
                    >{{prayForEdit}}</b-form-input>
            </div>
            <b-button class="mt-2" variant="outline-warning" block  @click="editPraySubmit(prayForEdit,prayIdForEdit)">edit</b-button>
            </b-modal>
        </div>
    </div>
</template>
<script> 
import router from "../router"
    export default {
        props:["data"],
        data(){
            return {
                prayForEdit :"",
                prayIdForEdit :0,
            }
        },
        methods:{
            deletePray(id){
                this.$store.dispatch("deletePray",id);
            },
            async getPrayById(id){
                await this.$store.dispatch("getPrayById",id);
            },
            async setPrayById(){
                let result = await this.$store.state.prayById;
                return result;
            },
            async editPray(id){
                await this.getPrayById(id);
                await this.setPrayById();
                setTimeout(async() => {
                    this.prayForEdit = this.$store.state.prayById.pray
                    this.prayIdForEdit = this.$store.state.prayById.id
                    await this.$refs['my-modal'].show()
                }, 1000);
                console.log("ending");
            },
            async editPraySubmit(data,id){
                await this.$store.dispatch("updatePray",{data,id});
                await this.$refs['my-modal'].hide();
                await router.push("/home");
            }
        }
    }
</script>

<style scoped>
.bigCard{
    display: inline-flex;
    margin-top: 2%;
    width: 100%;
}
.card-body{
    font-size: 15px;
}
#icons{
   position: absolute;
  right: 35px;
}
#newPrayInput{
    overflow: auto;
}
</style>


