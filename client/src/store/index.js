import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
const baseUrl = "http://localhost:3000"
const token = localStorage.getItem("token")

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pray:[],
    prayById:{}
  },
  mutations: {
    GET_ALL_PRAY(state,payload){
      // console.log(payload,"masuk ke mutation---->>>>>");
      state.pray = payload;
    },
    DELETE_PRAY(state,payload){
      let result = state.pray.filter((el)=>{return el.id !== payload})
      state.pray = result;
    },
    GET_PRAY_BY_ID(state,payload){
      // console.log(payload,"---payload pray by id");
      state.prayById = payload
    },
    UPDATE_PRAY(state,payload){
      console.log(payload,"from mutation store");
    }
  },
  actions: {
    getAllPray(context){
      console.log("masuk ke actions");
      axios({
        method: "GET",
        url: `${baseUrl}/prays`,
        headers: {token}
      })
      .then(resp=>{
        // console.log(resp.data,'masuk ke then===>..');
        context.commit("GET_ALL_PRAY",resp.data);
      })
      .catch(err=>{
        console.log(err,"from state action get prays");
      })
    },
    deletePray(context,id){
      axios({
        method: "DELETE",
        url: `${baseUrl}/prays/${id}`,
        headers: {token}
      }).then(resp=>{
        context.commit("DELETE_PRAY",id)
      }).catch(err=>{
        console.log(err,"from delete state actions");
      })
    },
    getPrayById(context,id){
      axios({
        method: "GET",
        url: `${baseUrl}/prays/${id}`,
        headers: {token}
      }).then(resp=>{
        // console.log(resp.data,'----resp data from actions');
        context.commit("GET_PRAY_BY_ID",resp.data)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    },
    updatePray(context,payload){
      // console.log(payload.data,'----resp data edit actions',payload.id,";;;;>>>>>>");
      let pray = payload.data
      let id = payload.id
      console.log(pray,"---",id);
      axios({
        method: "PUT",
        url: `${baseUrl}/prays/${id}`,
        data: {pray},
        headers: {token}
      }).then(resp=>{
        context.commit("UPDATE_PRAY",resp)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    }
  },
  modules: {
  }
})
