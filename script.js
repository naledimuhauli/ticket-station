// Ticket class
class Ticket {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Getter Method to get the event details
    getDetails() {
        return `${this.name} - ZAR ${this.price}`;
    }
}

// EventTickets class to manage events and their tickets
class EventTickets {
    constructor() {
        this.events = {};
    }

    // Method to add tickets for a specific event
    addEvent(eventId, tickets) {
        this.events[eventId] = tickets.map(ticket => new Ticket(ticket.id, ticket.name, ticket.price));
    }

    // Method to get tickets for a specific event
    getTickets(eventId) {
        return this.events[eventId] || [];
    }
}

// Availability of tickets
const eventTickets = new EventTickets();
eventTickets.addEvent('event1', [
    { id: 'ticket1', name: 'Concert Ticket - General Admission', price: 500 },
    { id: 'ticket2', name: 'Concert Ticket - VIP', price: 800 }
]);

eventTickets.addEvent('event2', [
    { id: 'ticket3', name: 'Charity Ticket - Regular', price: 600 },
    { id: 'ticket4', name: 'Charity Ticket - Premium', price: 500 },
    { id: 'ticket7', name: 'Charity Ticket - Free', price: 0 }
]);

eventTickets.addEvent('event3', [
    { id: 'ticket5', name: 'Education Event Ticket - Standard', price: 900 },
    { id: 'ticket6', name: 'Education Event Ticket - VIP', price: 1800 }
]);



// Event listener for View Tickets button
document.getElementById('view-tickets-btn').addEventListener('click', () => {
    const eventSelect = document.getElementById('event-select');
    const selectedEvent = eventSelect.value;

    if (selectedEvent) {
        const tickets = eventTickets.getTickets(selectedEvent);
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = '';

        tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = ticket.getDetails();
            ticketList.appendChild(li);
        });

        document.getElementById('ticket-view').style.display = 'block';
    }
});

// Event listener for Booking Ticket button
document.getElementById('book-ticket-btn').addEventListener('click', () => {
    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
});

// Event listener for booking form submission
document.getElementById('ticket-booking-form').addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const quantity = document.getElementById('quantity').value;

    showConfirmation();
});

// Function to show confirmation page
function showConfirmation() {
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
}