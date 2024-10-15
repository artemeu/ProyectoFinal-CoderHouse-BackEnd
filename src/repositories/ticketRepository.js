import TicketDAO from '../dao/mongoDB/ticketDao.js';
import TicketDTO from '../dtos/ticketDTO.js';
import GenericRepository from './genericRepository.js';

export default class TicketRepository extends GenericRepository {
    constructor() {
        super(TicketDAO, TicketDTO);
    }

}