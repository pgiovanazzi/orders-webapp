export class OrderModel {
    constructor({
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
    }) {
        this._id = _id
        this.number = number
        this.deliveryDateTime = deliveryDateTime
        this.address = address
        this.deliverer = deliverer
        this.state = state
        this.customerName = customerName
        this.customerPhone = customerPhone
        this.deliverType = deliverType
        this.amount = amount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

}
