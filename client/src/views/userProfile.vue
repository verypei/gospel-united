<template>
    <div>
        <navbar />
        <h1>halaman profile</h1>

        <div>
            <img class="rounded float-left">
            <vue2Dropzone 
                ref="myVueDropzone" 
                id="dropzone" 
                :options="dropzoneOptions"
                @vdropzone-file-added = "fileAdded"
            ></vue2Dropzone>
        </div>

        <ul class="list-group">
            <li class="list-group-item">name: {{this.$store.state.profile.name}}</li>
            <li class="list-group-item">dob: {{this.$store.state.profile.date_of_birth}}</li>
            <li class="list-group-item">phone: {{this.$store.state.profile.phone}}</li>
            <li class="list-group-item">address: {{this.$store.state.profile.address}}</li>
            <li class="list-group-item">church: {{this.$store.state.profile.church}}</li>
        </ul>
        <br>
            <button type="button" class="btn btn-primary" @click="showEditModal()">edit profile</button>
<!-- modal edit profile -->
            <div>
            <b-modal ref="edit-profile-modal" hide-footer title="Using Component Methods">
                <div class="d-block text-center">
                        <b-form-input v-model="nameForEdit" style="width='auto'" :state="nameForEdit"></b-form-input>
                        <b-form-input v-model="dobForEdit" style="width='auto'" placeholder="dob"></b-form-input>
                        <b-form-input v-model="phoneForEdit" style="width='auto'" placeholder="phone"></b-form-input>
                        <b-form-input v-model="addressForEdit" style="width='auto'" placeholder="address"></b-form-input>
                        <b-form-input v-model="churchForEdit" style="width='auto'" placeholder="church"></b-form-input>
                </div>
                <b-button class="mt-2" variant="outline-warning" block  @click="editProfileSubmit()">edit</b-button>
            </b-modal>
        </div>
    </div>
</template>

<script>
import navbar from "../components/navbar";
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import axios from "axios";
const baseUrl = "http://localhost:3000"
const token = localStorage.getItem("token");


export default{
    components:{
        navbar,
        vue2Dropzone
    },
    data(){
        return {
                nameForEdit : "",
                dobForEdit : "",
                phoneForEdit : "",
                addressForEdit : "",
                churchForEdit : "",
                dropzoneOptions: {
                    method: "PUT",
                    url: "http://localhost:3000/profiles/image",
                    headers: {token},
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,//mega bytes,
                    maxFiles:1,
                    addRemoveLinks: true
                }
        }
    },
    created(){
        console.log("masuk ke created profile page");
        this.$store.dispatch("getProfile")
    },
    methods:{
        fileAdded(file){
            // console.log("success add file to drop zone",file,"--->");
            // console.log(this.$refs.myVueDropzone,"--------------->>>>>>>>>>>>>>>>>");
            let formData = new FormData()
            formData.append("avatar",file)
            axios({
                method: "PUT",
                url: `${baseUrl}/profiles/image`,
                data: formData,
                headers: {token}
            })
            .then(resp=>{
                console.log(resp,"sukses upload axios");
            })
            .catch(err=>{
                console.log(err,"from state action get prays");
            })

        },
        showEditModal(){
            this.$refs["edit-profile-modal"].show()
        },
        editProfileSubmit(){
            let obj = {
                name : this.nameForEdit,
                date_of_birth : this.dobForEdit,
                phone : this.phoneForEdit, 
                address : this.addressForEdit, 
                church : this.churchForEdit 
            }
            this.$store.dispatch("editProfile",obj);
            this.$refs["edit-profile-modal"].hide()
        }
    },
    computed:{
        valid(){
            return this.nameForEdit.length > 0
        }
    }
}
</script>
