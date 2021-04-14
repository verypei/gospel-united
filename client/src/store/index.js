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
      state.pray = payload.sort((a,b)=>{return a.id - b.id});
    },
    ADD_PRAY(state, payload){
      state.pray.push(payload)
    },
    DELETE_PRAY(state,payload){
      let result = state.pray.filter((el)=>{return el.id !== payload})
      state.pray = result;
    },
    GET_PRAY_BY_ID(state,payload){
      state.prayById = payload
    },
    UPDATE_PRAY(state,payload){
      for (let i = 0; i < state.pray.length; i++) {
          if(state.pray.id === payload.id){
            state.pray[i].pray = payload.data
          }
      }
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
        context.commit("GET_ALL_PRAY",resp.data);
      })
      .catch(err=>{
        console.log(err,"from state action get prays");
      })
    },
    addPray(context,pray){
      console.log("state action add",{pray});
      axios({
        method: "POSt",
        url: `${baseUrl}/prays`,
        data: {pray},
        headers: {token}
      })
      .then(resp=>{
        context.commit("ADD_PRAY",resp.data);
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
        context.commit("GET_PRAY_BY_ID",resp.data)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    },
    updatePray(context,payload){
      let pray = payload.data
      let id = payload.id
      axios({
        method: "PUT",
        url: `${baseUrl}/prays/${id}`,
        data: {pray},
        headers: {token}
      }).then(resp=>{
        context.commit("UPDATE_PRAY",payload)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    }
  },
  modules: {
  }
})
