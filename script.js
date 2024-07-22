class Ticket {
    constructor(id, name, price, date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.date = date;
    }

    getDetails() {
        return `${this.name }/ ${this.date} - ZAR ${this.price} `;
    }
}

class EventTickets {
    constructor() {
        this.events = {};
    }

    addEvent(eventId, tickets) {
        this.events[eventId] = tickets.map(ticket => new Ticket(ticket.id, ticket.name, ticket.price, ticket.date));
    }

    getTickets(eventId) {
        return this.events[eventId] || [];
    }

    getAllPastEvents() {
        //  past events data
        return [
            { id: 'past1', name: 'Womens day - General Admission', price: 200, date: '05 May' },
            { id: 'past2', name: 'Youth day - VIP', price: 1000, date: '16 Jun' },
            { id: 'past3', name: 'Mandela day - General Admission', price: 300, date: '18 Jul' },
        ].map(ticket => new Ticket(ticket.id, ticket.name, ticket.price, ticket.date));
    }
}

const eventTickets = new EventTickets();
eventTickets.addEvent('event1', [
    { id: 'ticket1', name: 'Will Linley Concert Ticket - General Admission', price: 500, date: '25 Aug'},
    { id: 'ticket2', name: 'Will Linley Concert Ticket - VIP', price: 1500, date: '25 Aug' },
    { id: 'ticket3', name: 'Atlantic Star Concert Ticket - General Admission', price: 700, date: '28 Sep' },
    { id: 'ticket4', name: 'Atlantic Star Concert Ticket - VIP', price: 2300, date: '28 Sep' },
    { id: 'ticket5', name: 'Keyisha Cole Concert Ticket - General Admission', price: 900, date: '29 Sep' },
    { id: 'ticket6', name: 'Jeremy Loops Concert Ticket - General Admission', price: 700, date: '19 Oct' },
    { id: 'ticket7', name: 'Jeremy Loops Concert Ticket - VIP', price: 1900, date: '19 Oct' }
]);

eventTickets.addEvent('event2', [
    { id: 'ticket8', name: 'Orphanage - Charity Ticket - Regular', price: 600, date: '25 Aug' },
    { id: 'ticket9', name: 'Jeans4Genes - Charity Ticket - Premium', price: 500, date: '25 Aug' },
    { id: 'ticket10', name: 'Breast Cancer - Charity Ticket - Free', price: 0, date: '25 Aug' },
    { id: 'ticket11', name: 'Giving Back - Charity Ticket - Free', price: 0, date: '25 Aug' }
]);

eventTickets.addEvent('event3', [
    { id: 'ticket12', name: 'Education Event Ticket - Standard', price: 900, date: '03 Oct' },
    { id: 'ticket13', name: 'Education Event Ticket - VIP', price: 1800, date: '16 Nov' }
]);

document.getElementById('view-tickets-btn').addEventListener('click', () => {
    const eventSelect = document.getElementById('event-select');
    const selectedEvent = eventSelect.value;

    if (selectedEvent) {
        const tickets = eventTickets.getTickets(selectedEvent);
        const ticketList = document.getElementById('ticket-list');
        const ticketSelect = document.getElementById('ticket-select');
        ticketList.innerHTML = '';
        ticketSelect.innerHTML = '';

        tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = ticket.getDetails();
            ticketList.appendChild(li);

            const option = document.createElement('option');
            option.value = ticket.price;
            option.textContent = ticket.getDetails();
            ticketSelect.appendChild(option);
        });

        document.getElementById('ticket-view').style.display = 'block';
        document.getElementById('booking-form').style.display = 'none';
        document.getElementById('confirmation').style.display = 'none';
        document.getElementById('past-events').style.display = 'none';
    }
});

document.getElementById('book-ticket-btn').addEventListener('click', () => {
    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
    updateTotalPrice();
});

document.getElementById('ticket-select').addEventListener('change', updateTotalPrice);
document.getElementById('quantity').addEventListener('input', updateTotalPrice);

document.getElementById('ticket-booking-form').addEventListener('submit', event => {
    event.preventDefault();
    showConfirmation();
});

document.getElementById('view-past-events-btn').addEventListener('click', () => {
    const pastEvents = eventTickets.getAllPastEvents();
    const pastEventsList = document.getElementById('past-events-list');
    pastEventsList.innerHTML = '';

    pastEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event.getDetails();
        pastEventsList.appendChild(li);
    });

    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('past-events').style.display = 'block';
});

function updateTotalPrice() {
    const ticketSelect = document.getElementById('ticket-select');
    const quantity = document.getElementById('quantity').value;
    const totalPrice = document.getElementById('total-price');
    const selectedTicketPrice = ticketSelect.value;

    totalPrice.textContent = selectedTicketPrice ? selectedTicketPrice * quantity : 0;
}

function showConfirmation() {
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('past-events').style.display = 'none';

    document.getElementById('continue-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
