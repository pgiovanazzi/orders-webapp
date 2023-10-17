<script setup>
import { ref } from 'vue'
import { createOrdersServices } from '@/services'
import { createAuthServices } from '../services';
import { formatDateFilter } from '@/utils'
import BaseCreateEditOrder from './BaseCreateEditOrder.vue';
import BaseAlert from './BaseAlert.vue';


const orders = ref([])
const loadingOrders = ref(false)
const data = ref({})
const error = ref({ message: '' })
const authServices = createAuthServices()
const ordersServices = createOrdersServices()

const headers = [
  { title: 'Customer Name' },
  { title: 'Amout' },
  { title: 'Customer Phone' },
  { title: 'Delivery Type' },
  { title: 'Deliverer' },
  { title: 'Delivery Date' },
  { title: 'State' },
  { ...(!(authServices.isAdmin() && authServices.loggedIn()) || { title: 'Action' }) },
]

const loadOrders = async () => {
  loadingOrders.value = true
  try {
    orders.value = await ordersServices.getOrdersList()
  } catch (e) {
    error.value.message = e
  } finally {
    loadingOrders.value = false
  }
}

const showOrder = (id) => {
  data.value = orders.value.find(order => order._id === id)
  document.getElementById('create_oreder').showModal()
}

const removeOrder = async (id) => {
  loadOrders.value = true
  try {
    await ordersServices.deleteOrder(id)
  } catch (e) {
    error.value.message = e
  } finally {
    loadOrders.value = false
    loadOrders()
  }
}

loadOrders()
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="card-actions justify-end">
        <BaseCreateEditOrder @upload-orders="() => loadOrders()" :dataForm="data" />
      </div>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <!-- head -->
          <thead>
            <tr>
              <th>#</th>
              <template v-for="({ title }, idx) in headers" :key="idx">
                <th>{{ title }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(order, idx) in orders" :key="idx">
              <tr v-if="orders && !loadingOrders">
                <th>{{ idx + 1 }}</th>
                <td>{{ order.customerName }}</td>
                <td>{{ order.amount }}</td>
                <td>{{ order.customerPhone }}</td>
                <td>{{ order.deliverType }}</td>
                <td>{{ order.deliverer }}</td>
                <td>{{ formatDateFilter(order.deliveryDateTime) }}</td>
                <td>{{ order.state }}</td>
                <td v-if="authServices.isAdmin() && authServices.loggedIn()">
                  <button @click="showOrder(order._id)" class="btn btn-square btn-ghost btn-sm">
                    <ion-icon name="eye-outline"></ion-icon>
                  </button>
                  <button onclick="remove_order.showModal()" class="btn btn-square btn-ghost btn-sm">
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                  <dialog id="remove_order" class="modal">
                    <div class="modal-box">
                      <h3 class="font-bold text-lg"><ion-icon name="warning-outline"></ion-icon> Waring!</h3>
                      <p class="py-4">Are you sure to delete order?</p>
                      <div class="modal-action">
                        <form method="dialog">
                          <!-- if there is a button in form, it will close the modal -->
                          <button class="btn btn-ghost">Deny</button>
                          <button class="btn btn-ghost" @click="removeOrder(order._id)">Continue</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            </template>
            <tr v-if="loadingOrders">
              <td colspan="8" class="text-center"><span class="loading loading-dots loading-lg"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <BaseAlert v-if="error.message" :message="error.message" />
</template>

<style scoped></style>
