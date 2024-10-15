export default class TicketDTO {
    constructor({ id, code, purchase_datetime, amount, purchaser }) {
        this.id = id;
        this.code = code;
        this.datetime = purchase_datetime;
        this.amount = amount;
        this.purchaser = purchaser;
    }
}
