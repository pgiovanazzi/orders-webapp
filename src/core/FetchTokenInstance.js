import { createAuthServices } from "@/services"

const { fetch: originalFetch } = window
const authServices = createAuthServices()

export const fetchInstance = () => {
    window.FetchTokenInstance = async (...args) => {
        const [resource, config] = args

        if (authServices.getToken())
            resource.headers ? resource.headers.set('Authorization', authServices.getToken()) : null
        
        const promiseApi = originalFetch(resource, config)
        const promiseClient = new Promise(resolve => {
            setTimeout(() =>  resolve({ code: 'Timeout from client' }), 60000)
        })

        const response = await Promise.race([promiseApi, promiseClient])

        return response
    }
}