<template>
  <div id="app">
    <div v-if="!$store.state.isLoginIn">
      <Login/>
    </div>
    <div v-else>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Login from './components/Login.vue'
  
   export default{
    created(){
      const token=localStorage.getItem('token');
      if(token){
        this.$store.commit('isLoginIn',true)
      }
    },
    data(){
      return{
        LogedIn:false,
      }
    },
    components:{
      Login
    }
   }
</script>