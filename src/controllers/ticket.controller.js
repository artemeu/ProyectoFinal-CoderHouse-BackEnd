import TicketRepository from '../repositories/ticketRepository.js';

const ticketRepository = new TicketRepository();

// Crear un nuevo ticket
export const createTicket = async (req, res) => {
    try {
        const newTicket = await ticketRepository.create(req.body);
        return res.success(newTicket);
    } catch (error) {
        return res.errorServer(error.message);
    }
};

// Obtener todos los tickets
export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketRepository.getAll();
        return res.success(tickets);
    } catch (error) {
        return res.errorServer(error.message);
    }
};

// Obtener un ticket por ID
export const getTicketById = async (req, res) => {
    const ticketId = req.params.tid;
    try {
        const ticket = await ticketRepository.getById(ticketId);
        if (!ticket) return res.notFound('Ticket no encontrado');
        return res.success(ticket);
    } catch (error) {
        return res.errorServer(error.message);
    }
};

// Actualizar un ticket por ID
export const updateTicket = async (req, res) => {
    const ticketId = req.params.tid;
    try {
        const updatedTicket = await ticketRepository.update(ticketId, req.body);
        if (!updatedTicket) return res.notFound('Ticket no encontrado');
        return res.success(updatedTicket);
    } catch (error) {
        return res.errorServer(error.message);
    }
};

// Eliminar un ticket por ID
export const deleteTicket = async (req, res) => {
    const ticketId = req.params.tid;
    try {
        const deletedTicket = await ticketRepository.delete(ticketId);
        if (!deletedTicket) return res.notFound('Ticket no encontrado');
        return res.success({ message: 'Ticket eliminado correctamente' });
    } catch (error) {
        return res.errorServer(error.message);
    }
};
