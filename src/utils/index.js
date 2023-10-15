const formatDateFilter = timestamp => {
    if (timestamp) {
        const dateFormat = new Date(timestamp)
        return dateFormat.toLocaleString('es-AR')
    }
}

export {
    formatDateFilter
}