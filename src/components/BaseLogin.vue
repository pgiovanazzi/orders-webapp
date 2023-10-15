<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthServices } from '../services';

const router = useRouter()
const loadingButton = ref(false)

const formLogin = ref({
    email: '',
    password: ''
})

const login = async () => {
    loadingButton.value = true
    try {
        const res = await AuthServices.login(formLogin.value)
        if (res.success) {
            return router.push({ name: 'dashboard'})
        }
    } catch (e) {
        console.log(e)
    } finally {
        loadingButton.value = false
    }
}

</script>

<template>
    <div class="col-start-2 card w-96 bg-base-100 shadow-xl image-full">
        <figure><img src="@/assets/images/Untitled.jpeg" alt="Log in our orders" /></figure>
        <div class="card-body mt-5">
            <label class="block">
                <span class="block text font-medium text-slate-300">Email</span>
            </label>
            <input type="text" placeholder="Type here your email" class="input input-bordered input-sm w-full max-w-xs"
                v-model.trim="formLogin.email" />
            <label class="block">
                <span class="block text font-medium text-slate-300">Password</span>
            </label>
            <input type="password" placeholder="Type here your password" class="input input-bordered input-sm w-full max-w-xs"
                v-model.trim="formLogin.password" />
            <div class="card-actions justify-end">
                <button class="btn btn-ghost" @click="login" :disabled="loadingButton">Log in</button>
            </div>
        </div>
    </div>
</template>


<style></style>