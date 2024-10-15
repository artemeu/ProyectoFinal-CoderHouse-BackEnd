import Ticket from '../models/ticketModel.js';
import GenericDAO from './genericDAO.js';

export default class TicketDAO extends GenericDAO {
    constructor() {
        super(Ticket);
    }
}
