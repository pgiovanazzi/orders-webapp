import { createBaseServices } from "@/core/BaseServices";

export const createAuthServices = () => {
    const baseServices = createBaseServices()

    const login = ({ email, password }) => {
        const url = `${baseServices._api}v1.0/login`
        return fetch(baseServices.newRequestPost(url, { username: email, password })).then(async res => {
            const data = await res.json()
            if (!data.code) {
                loginWriteStorage(data)
                return { success: true }
            } else
                throw baseServices.handleError(res)
        }).catch(err => {
            throw baseServices.handleError(err)
        })
    }

    const loginWriteStorage = (data) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('scope', data.scope)
        localStorage.setItem('expires_in', data.expires_in)
    }

    const logout = () => {
        localStorage.clear()
        location.reload()
    }

    const getToken = () => {
        const token = baseServices.getItemFromStorage('access_token')
        if (token) {
            return `Bearer ${token}`
        } else {
            return ''
        }
    }

    const loggedIn = () => {
        return getToken() !== ''
    }

    const isAdmin = () => {
        return baseServices.getItemFromStorage('scope') === 'admin'
    }

    return { 
        ...baseServices,
        login,
        loginWriteStorage,
        logout,
        loggedIn,
        getToken,
        isAdmin
    }
}