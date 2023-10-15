import { BaseServices } from "@/core/BaseServices";

export class AuthServices extends BaseServices {

    static login({ email, password }) {
        const url = `${this._api}v1.0/login`
        return fetch(this.newRequestPost(url, { username: email, password })).then(async res => {
            const data = await res.json()
            if (!data.code) {
                this.loginWriteStorage(data)
                return { success: true }
            } else
                return this.handleError(res)
        }).catch(err => {
            return this.handleError(err)
        })
    }

    static loginWriteStorage(data) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('scope', data.scope)
        localStorage.setItem('expires_in', data.expires_in)
    }

    static logout() {
        localStorage.clear()
        location.reload()
    }

    static getToken() {
        const token = this.getItemFromStorage('access_token')
        if (token) {
            return `Bearer ${token}`
        } else {
            return ''
        }
    }

    static loggedIn() {
        return this.getToken() !== ''
    }

    static isAdmin() {
        return this.getItemFromStorage('scope') === 'admin'
    }
}