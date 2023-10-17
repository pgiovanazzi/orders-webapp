import { createGeneralResponse } from "@/models";
import { environment } from "@/enviroments/enviroments";

export const createBaseServices = () => {
    const _api = environment.api
    const _headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    })
    const newRequestGet = (url) => {
        return new Request(url, {
            method: 'GET',
            headers: _headers,
            mode: 'cors',
            cache: 'default'
        })
    }

    const newRequestPost = (url, body) => {
        return new Request(url, {
            method: 'POST',
            headers: _headers,
            body: JSON.stringify(body),
            mode: 'cors',
            cache: 'default'
        })
    }

    const newRequestPatch = (url, body) => {
        return new Request(url, {
            method: 'PATCH',
            headers: _headers,
            body: JSON.stringify(body),
            mode: 'cors',
            cache: 'default'
        })
    }

    const newRequestDelete = (url) => {
        return new Request(url, {
            method: 'DELETE',
            headers: _headers,
            mode: 'cors',
            cache: 'default'
        })
    }

    const handleError = (error) => {
        const res = createGeneralResponse({})
        res.data = []
        res.error = true

        if (error.message) {
            res.message = error.message
        }
        return res
    }

    const getItemFromStorage = (name) => {
        return localStorage.getItem(name);
    }

    return {
        _api,
        newRequestGet,
        newRequestPost,
        newRequestPatch,
        newRequestDelete,
        handleError,
        getItemFromStorage
    }
}