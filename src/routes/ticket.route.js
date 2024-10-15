import CustomRouter from "./customRouter.js";
import * as TicketController from "../controllers/ticket.controller.js";



class TicketRouter extends CustomRouter {
    init() {
        this.get('/', [], TicketController.getTickets);
        this.get('/:tid', [], TicketController.getTicketById);
        this.post('/', ['authenticated', 'admin', 'user'], TicketController.createTicket);
        this.put('/:tid', ['authenticated', 'admin', 'user'], TicketController.updateTicket);
        this.delete('/:tid', ['authenticated', 'admin'], TicketController.deleteTicket);
    }
}

export default new TicketRouter().getRouter();