class Ticket {
    constructor(id, name, price, date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.date = date;
    }

    getDetails() {
        return `${this.name} / ${this.date} - ZAR ${this.price}`;
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
    { id: 'ticket1', name: 'Will Linley Concert Ticket - General Admission', price: 500, date: '25 Aug' },
    { id: 'ticket2', name: 'Will Linley Concert Ticket - VIP', price: 1500, date: '25 Aug' },
    { id: 'ticket3', name: 'Atlantic Star Concert Ticket - General Admission', price: 700, date: '28 Sep' },
    { id: 'ticket4', name: 'Atlantic Star Concert Ticket - VIP', price: 2300, date: '28 Sep' },
    { id: 'ticket5', name: 'Keyisha Cole Concert Ticket - General Admission', price: 900, date: '29 Sep' },
    { id: 'ticket6', name: 'Jeremy Loops Concert Ticket - General Admission', price: 700, date: '19 Oct' },
    { id: 'ticket7', name: 'Jeremy Loops Concert Ticket - VIP', price: 1900, date: '19 Oct' }
]);

eventTickets.addEvent('event2', [
    { id: 'ticket8', name: 'Orphanage - Charity Ticket - Regular', price: 850, date: '16 Dec' },
    { id: 'ticket9', name: 'Jeans4Genes - Charity Ticket - Premium', price: 700, date: '16 Sep' },
    { id: 'ticket10', name: 'Breast Cancer - Charity Ticket - Regular', price: 1000, date: '03 Oct' },
    { id: 'ticket11', name: 'Giving Back - Charity Ticket - Regular', price: 650, date: '05 Nov' }
]);

eventTickets.addEvent('event3', [
    { id: 'ticket12', name: 'Education Event Seminar - Standard', price: 900, date: '03 Oct' },
    { id: 'ticket13', name: 'Education Event Conference - VIP', price: 1800, date: '16 Nov' }
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
            const listItem = document.createElement('li');
            listItem.textContent = ticket.getDetails();
            ticketList.appendChild(listItem);

            const option = document.createElement('option');
            option.value = ticket.id;
            option.textContent = ticket.getDetails();
            option.dataset.price = ticket.price; // Store price in a data attribute
            ticketSelect.appendChild(option);
        });

        document.getElementById('event-selection').style.display = 'none';
        document.getElementById('ticket-view').style.display = 'block';
    } else {
        alert('Please select an event');
    }
});

document.getElementById('book-ticket-btn').addEventListener('click', () => {
    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
});

document.getElementById('view-past-events-btn').addEventListener('click', () => {
    const pastEvents = eventTickets.getAllPastEvents();
    const pastEventsList = document.getElementById('past-events-list');

    pastEventsList.innerHTML = '';

    pastEvents.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.textContent = ticket.getDetails();
        pastEventsList.appendChild(listItem);
    });

    document.getElementById('event-selection').style.display = 'none';
    document.getElementById('past-events').style.display = 'block';
});

document.getElementById('ticket-booking-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const quantity = document.getElementById('quantity').value;

    if (quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
});

document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();

    alert('Payment successful!');

    document.getElementById('checkout').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
});

document.getElementById('continue-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('quantity').addEventListener('input', updateTotalPrice);
document.getElementById('ticket-select').addEventListener('change', updateTotalPrice);

function updateTotalPrice() {
    const ticketSelect = document.getElementById('ticket-select');
    const selectedTicket = ticketSelect.options[ticketSelect.selectedIndex];
    const ticketPrice = parseFloat(selectedTicket.dataset.price);
    const quantity = parseInt(document.getElementById('quantity').value);

    const totalPrice = ticketPrice * quantity;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Adding Go Back button event listener
document.getElementById('go-back-btn').addEventListener('click', () => {
    document.getElementById('past-events').style.display = 'none';
    document.getElementById('event-selection').style.display = 'block';
});
