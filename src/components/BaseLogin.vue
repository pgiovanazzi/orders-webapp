<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createAuthServices } from '@/services';
import BaseAlert from './BaseAlert.vue';

const router = useRouter()
const authServices = createAuthServices()
const loadingButton = ref(false)
const error = ref({ message: '' })

const formLogin = ref({
    email: '',
    password: ''
})

const login = async () => {
    loadingButton.value = true
    try {
        const res = await authServices.login(formLogin.value)
        if (res.success)
            return router.push({ name: 'dashboard' })
        else
            error.value.message = res
    } catch (e) {
        error.value.message = e
    } finally {
        loadingButton.value = false
    }
}

</script>

<template>
    <BaseAlert v-if="error.message" :message="error.message" />
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
            <input type="password" placeholder="Type here your password"
                class="input input-bordered input-sm w-full max-w-xs" v-model.trim="formLogin.password" />
            <div class="card-actions justify-end">
                <button class="btn btn-ghost" @click="login" :disabled="loadingButton">Log in</button>
            </div>
        </div>
    </div>
</template>


<style></style>