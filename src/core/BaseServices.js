import {GeneralResponse} from "@/models/GeneralResponse";
import {environment} from "@/enviroments/enviroments";

export class BaseServices {
    static _api = environment.api
    static _headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    static newRequestGet(url) {
        return new Request(url, {
            method: 'GET',
            headers: this._headers,
            mode: 'cors',
            cache: 'default'
        })
    }

    static newRequestPost(url, body) {
        return new Request(url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(body),
            mode: 'cors',
            cache: 'default'
        })
    }

    static newRequestPatch(url, body) {
        return new Request(url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(body),
            mode: 'cors',
            cache: 'default'
        })
    }

    static newRequestDelete(url) {
        return new Request(url, {
            method: 'DELETE',
            headers: this._headers,
            mode: 'cors',
            cache: 'default'
        })
    }

    static handleError(error) {
        const res = new GeneralResponse()
        res.data = []
        res.error = true

        if (error.message) {
            res.message = error.message
        }
        return res
    }

    static getItemFromStorage(name) {
        return localStorage.getItem(name);
    }
}