import { Component } from '@angular/core';
import { TicketService,Ticket } from 'src/app/auth/ticket.service';
@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent {

  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  updateTicket(id: number, newStatus: 'open' | 'in-progress' | 'closed'): void {
    this.ticketService.updateTicketStatus(id, newStatus);
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id);
    this.fetchTickets(); // Refresh the list after deletion
  }
}