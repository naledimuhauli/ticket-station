
const eventTickets = {
    event1: [
        { id: 'ticket1', name: 'Concert Ticket - General Admission', price: 500 },
        { id: 'ticket2', name: 'Concert Ticket - VIP', price: 800 }
    ],
    event2: [
        { id: 'ticket3', name: 'Charity Ticket - Regular', price: 600 },
        { id: 'ticket4', name: 'Charity Ticket - Premium', price: 500 },
        { id: 'ticket7', name: 'Charity Ticket - Free',    price: 0}
    ],
    event3: [
        { id: 'ticket5', name: 'Education Event Ticket - Standard', price: 900 },
        { id: 'ticket6', name: 'Education Event Ticket - VIP', price: 1800 }
    ]
};


// Event listeners for View Tickets button
document.getElementById('view-tickets-btn').addEventListener('click', function() {
    const eventSelect = document.getElementById('event-select');
    const selectedEvent = eventSelect.value;
    
    if (selectedEvent) {
        const tickets = eventTickets[selectedEvent];
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = '';
        
        tickets.forEach(ticket => {
            const li = document.createElement('li');
            li.textContent = `${ticket.name} - ZAR ${ticket.price}`;
            ticketList.appendChild(li);
        });
        
        document.getElementById('ticket-view').style.display = 'block';
    }
});


// Event listener for Book Ticket button
document.getElementById('book-ticket-btn').addEventListener('click', function() {
    document.getElementById('ticket-view').style.display = 'none';
    document.getElementById('booking-form').style.display = 'block';
});

// Event listener for ticket booking form submission
document.getElementById('ticket-booking-form').addEventListener('submit', function(event) {
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
