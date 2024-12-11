// ticket.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [
    { id: 1, title: 'Issue with payment', description: 'User unable to process payment.', status: 'open' },
    { id: 2, title: 'Feature request', description: 'Request to add dark mode feature.', status: 'in-progress' },
    { id: 3, title: 'Bug in booking', description: 'Error when booking an auto.', status: 'closed' },
  ];

  constructor() {}

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets); // Simulating an API call
  }

  updateTicketStatus(id: number, status: 'open' | 'in-progress' | 'closed'): void {
    const ticket = this.tickets.find(ticket => ticket.id === id);
    if (ticket) {
      ticket.status = status;
    }
  }

  deleteTicket(id: number): void {
    this.tickets = this.tickets.filter(ticket => ticket.id !== id);
  }
}
