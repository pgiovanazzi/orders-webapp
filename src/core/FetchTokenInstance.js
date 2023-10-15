import { AuthServices } from "../services/AuthServices"

const { fetch: originalFetch } = window

const FetchInstance = () => {
    window.FetchTokenInstance = async (...args) => {
        const [resource, config] = args

        if (AuthServices.getToken())
            resource.headers ? resource.headers.set('Authorization', AuthServices.getToken()) : null
        
        const promiseApi = originalFetch(resource, config)
        const promiseClient = new Promise(resolve => {
            setTimeout(() =>  resolve({ code: 'Timeout from client' }), 60000)
        })

        const response = await Promise.race([promiseApi, promiseClient])

        return response
    }
}

export default FetchInstance