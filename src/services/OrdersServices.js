import { BaseServices } from "@/core/BaseServices"
import { OrderModel } from "@/models"

export class OrdersServices extends BaseServices {
    static getOrdersList() {
        const url = `${this._api}v1.0/orders`
        return fetch(this.newRequestGet(url)).then(async res => {
            const data = await res.json()
            if (!data.code) {
                const orders = data.data.map(data => new OrderModel(data))
                return orders
            } else
                return this.handleError(res)
        }).catch(err => {
            return this.handleError(err)
        })
    }

    static saveOrder(order) {
        const url = `${this._api}v1.0/orders`
        return FetchTokenInstance(this.newRequestPost(url, order)).then(async res => {
            const data = await res.json()
            if (!data.code) {
                return
            } else return this.handleError(res)
        }).catch(err => {
            return this.handleError(err)
        })
    }

    static updateOrder(id, order) {
        const url = `${this._api}v1.0/orders/${id}`
        return FetchTokenInstance(this.newRequestPatch(url, order)).then(async res => {
            const data = await res.json()
            if (!data.code) {
                return
            } else return this.handleError(res)
        }).catch(err => {
            return this.handleError(err)
        })
    }

    static deleteOrder(id) {
        const url = `${this._api}v1.0/orders/${id}`
        return FetchTokenInstance(this.newRequestDelete(url)).then(async res => {
            const data = await res.json()
            if (!data.code) {
                return
            } else return this.handleError(res)
        }).catch(err => {
            return this.handleError(err)
        })
    }
}