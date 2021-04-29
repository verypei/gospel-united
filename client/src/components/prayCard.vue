<template>
    <div class="bigCard">
        <!-- card -->
        <div class="card">
            <div class="img">
                <b-avatar></b-avatar>
        </div>

            <div class="card-body">
                <blockquote  class="blockquote">
                    <p class="card-body mb-0" v-if="pray">{{truncation()}}
                        <span  v-if="truncationDotsView" @click="allTextView()">...</span>
                    </p>
                    <p class="card-body mb-0" v-if="truncationDotsHide">
                        <span @click="truncationOn()">{{this.data.pray}}</span>
                    </p>
                </blockquote>

                <span id="icons-right">
                    <fa icon="arrow-up" size="2x" style="padding-left:10px;" color="grey" ref="arrowIcon" @click="arrowUpLifting()" />
                    <fa icon="praying-hands" size="2x" style="padding-left:10px;" color="grey" ref="supportIcon" @click="supportPray(data.id)" /><span v-if="dataSupportZero">{{dataSupport()}}</span>
                </span>

                <span id="icons-left">
                    <fa icon="trash" size="2x" style="padding-left:10px;" v-if="deleteButton" color=red @click="deletePray(data.id)"/>
                    <fa icon="edit" size="2x" style="padding-left:10px;" v-if="editButton" color=blue @click="editPray(data.id)"/>
                </span>

                <footer><em>~{{data.user_name}}~</em></footer>
            </div>
        </div>
        
    </div>
</template> 
<script> 
    export default {
        props:["data"],
        data(){
            return {
                prayForEdit :"",
                prayIdForEdit : 0,
                arrowIcon : false,
                support: false,
                pray: true,
                truncationDotsView : true,
                truncationDotsHide : false,
                dataSupportZero : true,
                deleteButton : false,
                editButton : false
            }
        },
        methods:{
            dataSupport(){
                if(this.data.support === 0){
                    this.dataSupportZero = false;
                }
                else{
                    return this.data.support;
                }
            },
            truncation(){
                // hide show delete edit button just for the login user
                let name = localStorage.getItem("user_name")
                // console.log(name,"masuk ke computed",this.data.user_name);
                if(this.data.user_name === name){
                    this.deleteButton = true
                    this.editButton = true
                }

                // arrow and support
                // let id = localStorage.getItem("id")
                // let arr = this.data.supportedBy
                // console.log(arr,"------",id);
                // if(arr.includes(Number(id))){
                //     console.log("masuk ke logik arrow and support");
                //     this.support = true
                    // this.$refs.supportIcon.style.color = "blue"
                // }

                //truncation text
                if(this.data.pray.length > 100){
                    this.truncationDotsView = true;
                    return this.data.pray.slice(0,100);
                }
                else{
                    this.truncationDotsView = false;
                    return this.data.pray;
                }

            },
            allTextView(){
                this.pray = false;
                this.truncationDotsHide = true;
                this.truncationDotsView = false;
            },
            truncationOn(){
                this.pray = true;
                this.truncationDotsHide = false;
                this.truncationDotsView = true;
            },
            deletePray(id){
                this.$store.dispatch("deletePray",id);
            },
            editPray(id){
                this.$store.dispatch("getPrayById",id);
            },
            arrowUpLifting(){
                if(!this.arrowIcon){
                    this.arrowIcon = true;
                    this.$refs.arrowIcon.style.color = "blue";
                }
                else{
                    this.arrowIcon = false;
                    this.$refs.arrowIcon.style.color = "grey";
                }
            },
            supportPray(id){
                let user_id = localStorage.getItem("id")
                if(!this.support){
                    this.support = true;
                    this.$refs.supportIcon.style.color = "blue";
                    this.$store.dispatch("addSupport",{id,user_id});
                }
                else{
                    this.support = false;
                    this.$refs.supportIcon.style.color = "grey";
                    this.$store.dispatch("lessSupport",{id,user_id});
                }
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
    width: 600px;
}
#icons-left{
   position: absolute;
   right: 35px;
}
#icons-right{
    position: absolute;
    left: 35px;
}
#newPrayInput{
    overflow: auto;
}
</style>


