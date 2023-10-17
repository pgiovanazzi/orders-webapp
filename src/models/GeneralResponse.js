export const createGeneralResponse = ({ message = '',
    error = false,
    logout = false,
    data = null,
    links = null,
    meta = null }) => {

    const getFirstError = () => {
        let error = ''
        if (!data.length) {
            error = message
        } else {
            if ((typeof data[0]) === 'string') {
                error = data[0];
            } else {
                error = data[0][0];
            }
        }
        return error;
    }

    return {
        message,
        error,
        logout,
        data,
        links,
        meta,
        getFirstError
    }
}