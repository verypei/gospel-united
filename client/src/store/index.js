import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
const baseUrl = "http://localhost:3000"
const token = localStorage.getItem("token");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pray:[],
    prayById:{},
    profile:{},
    otherProfile:{}
  },
  mutations: {
    GET_ALL_PRAY(state,payload){
      console.log("masuk ke mutations");
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
          if(state.pray[i].id === payload.id){
            state.pray[i].pray = payload.data
          }
      }
    },
    ADD_SUPPORT(state, payload){
      console.log(state.pray,"data from add support client mutation");
      for (let i = 0; i < state.pray.length; i++) {
        if(state.pray[i].id === payload.id){
          state.pray[i].support++
          state.pray[i].supportedBy.push(payload.user_id);
        }
      }
    },
    LESS_SUPPORT(state, payload){
      for (let i = 0; i < state.pray.length; i++) {
        if(state.pray[i].id === payload.id){
          state.pray[i].support--;
          state.pray[i].supportedBy.filter((el)=>{return el != payload.user_id});
        }
      }
    },
    GET_PROFILE(state, payload){
      state.profile = payload;
    },
    UPDATE_PROFILE(state, payload){
      state.profile = payload;
    },
    GET_OTHER_PROFILE(state, payload){
      state.otherProfile = payload;
    }
  },
  actions: {
    getAllPray(context){
      console.log(token,"from state actions");
      axios({
        method: "GET",
        url: `${baseUrl}/prays`,
        headers: {token}
      })
      .then(resp=>{
        console.log("masuk ke actions get prays");
        context.commit("GET_ALL_PRAY",resp.data);
      })
      .catch(err=>{
        console.log(err,"from state action get prays");
      })
    },
    addPray(context,pray){
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
    },
    addSupport(context, payload){
      // console.log(payload,"from store add support");
      axios({
        method: "PUT",
        url: `${baseUrl}/support/add/${payload.id}`,
        headers: {token}
      }).then(resp=>{
        context.commit("ADD_SUPPORT",payload)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    },

    lessSupport(context, payload){
      console.log(payload,"from less support client actions");
      axios({
        method: "PUT",
        url: `${baseUrl}/support/less/${payload.id}`,
        headers: {token}
      }).then(resp=>{
        context.commit("LESS_SUPPORT",payload)
      }).catch(err=>{
        console.log(err,"from get pray by id state actions");
      })
    },
    getProfile(context){
      console.log("masuk ke get profile actions");
      axios({
        method: "GET",
        url: `${baseUrl}/profiles`,
        headers: {token}
      }).then(resp=>{
        console.log(resp.data,"data profile client actions");
        context.commit("GET_PROFILE",resp.data);
      }).catch(err=>{
        console.log(err,"from get profile state actions");
      })
    },
    editProfile(context, payload){
      axios({
        method: "PUT",
        url: `${baseUrl}/profiles`,
        data : payload,
        headers: {token}
      }).then(resp=>{
        console.log(resp.data,"data profile client actions");
        context.commit("UPDATE_PROFILE",payload);
      }).catch(err=>{
        console.log(err,"from get profile state actions");
      })
    },
    getOtherProfile(context, payload){
      axios({
        method: "GET",
        url: `${baseUrl}/profiles/${payload}`,
        headers: {token}
      }).then(resp=>{
        console.log(resp.data,"data profile client actions");
        context.commit("GET_OTHER_PROFILE",resp.data);
      }).catch(err=>{
        console.log(err,"from get profile state actions");
      })
    }
  },
  modules: {
  }
})
