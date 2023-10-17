<script setup>
import { useRouter } from 'vue-router'
import { createAuthServices } from '../services';

const router = useRouter()
const authServices = createAuthServices()

const logout = () => {
    authServices.logout()
    router.push({ name: 'login' })
}

</script>

<template>
    <div class="navbar bg-neutral text-neutral-content mb-5">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl" @click="router.push({ name: 'dashboard' })">Orders System</a>
        </div>
        <div class="flex-none" v-if="!authServices.loggedIn()">
            <a class="btn btn-ghost normal-case text-xl" @click="router.push({ name: 'login' })">Login</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end" v-if="authServices.isAdmin() && authServices.loggedIn()">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="@/assets/images/avatar.png" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li @click="logout"><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>