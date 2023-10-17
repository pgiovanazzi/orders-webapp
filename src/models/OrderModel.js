export const createOrderModel = ({ _id = '',
    number = '',
    deliveryDateTime = '',
    address = '',
    deliverer = null,
    state = null,
    customerName = '',
    customerPhone = '',
    deliverType = null,
    amount = '',
    createdAt = '',
    updatedAt = '' }) => {
    const orderModel = {
        _id,
        number,
        deliveryDateTime,
        address,
        deliverer,
        state,
        customerName,
        customerPhone,
        deliverType,
        amount,
        createdAt,
        updatedAt
    }

    const prepareToUpdateOrder = (dataForm) => {
        const objectUpdateOrder = {}

        Object.keys(dataForm).forEach(key => {
            if (JSON.stringify(orderModel[key]) !== JSON.stringify(dataForm[key])) {
                objectUpdateOrder[key] = dataForm[key]
            }
        })
        return objectUpdateOrder
    }

    return {
        ...orderModel,
        prepareToUpdateOrder
    }
}