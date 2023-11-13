<template>
    <div class="card text-bg-info mb-3" style="max-width: 18rem;">
        <div class="card-body">
            <form @submit.prevent="login">
                <div class="card-header">Login</div>
                <div class="mb-3">
                    <label for="email" class="form-label">Usuario</label>
                    <input type="text" id="email" class="form-control" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password"  class="form-control" id="password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            email:'',
            password:''
        };
    },
    methods: {
        ...mapMutations(['setLogerIn']),

       async login() {
         try {
          const res=await axios.post('http://127.0.0.1:8000/api/auth/login',{
     
            email:this.email,
            password:this.password
          }); 
          localStorage.setItem('token',res.data['TOKEN']);
          this.setLogerIn(true);
          this.$router.push('/home');
          console.log(res);
         } catch (error) {
            console.log(error)
         }
        }
    }
}
</script>
