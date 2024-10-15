import mongoose from 'mongoose';

const userCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => `TICKET-${Date.now()}-${Math.floor(Math.random() * 10000)}`
    },
    purchase_datetime: {
        type: Date,
        default: () => new Date()
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true,
    }
});

const Ticket = mongoose.model(userCollection, ticketSchema);

export default Ticket;
