export class GeneralResponse {

    constructor(message = '',
                error = false,
                logout = false,
                data = null,
                links = null,
                meta = null) {
        this.message = message
        this.error = error
        this.logout = logout
        this.data = data
        this.links = links
        this.meta = meta
    }

    getFirstError() {
        let error = '';
        if (!this.data.length) {
            error = this.message;
        } else {
            if ((typeof this.data[0]) === 'string') {
                error = this.data[0];
            } else {
                error = this.data[0][0];
            }
        }
        return error;
    }
}