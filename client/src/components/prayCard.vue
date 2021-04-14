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
            <b-button class="mt-3" variant="outline-danger" block @click="cancelEdit()">cancel</b-button>
            <b-button class="mt-2" variant="outline-warning" block  @click="editPraySubmit(prayForEdit,prayIdForEdit)">edit</b-button>
            </b-modal>
        </div>
    </div>
</template>
<script> 
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
                console.log("get pray");
                await this.$store.dispatch("getPrayById",id);
            },
            async setPrayById(){
                console.log("set pray");
                let result = await this.$store.state.prayById
                console.log(result,"result from set pray");
                return result;
            },
            async editPray(id){
                await this.getPrayById(id);
                await this.setPrayById();
                setTimeout(async() => {
                    this.prayForEdit = this.$store.state.prayById.pray
                    this.prayIdForEdit = this.$store.state.prayById.id
                    console.log(this.prayForEdit,"-----> after disptch",this.prayIdForEdit,";;;;;;");
                    await this.$refs['my-modal'].show()
                }, 1000);
                console.log("ending");
            },
            cancelEdit(){
                location.Reload()
            },
            editPraySubmit(data,id){
                console.log(data,id,"from submit edit pray------>>>>>>>>");
                this.$store.dispatch("updatePray",{data,id});
                
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


