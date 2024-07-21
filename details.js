class User {
    constructor(fullName, username, email, phone, password, gender) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.gender = gender;
    }

    save() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }

    static getUser(username) {
        const user = localStorage.getItem(username);
        return user ? JSON.parse(user) : null;
    }

    static setCurrentUser(username) {
        localStorage.setItem('currentUser', username);
    }

    static getCurrentUser() {
        return localStorage.getItem('currentUser');
    }
}

class Registration {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.registerUser();
        });
    }

    registerUser() {
        const fullName = document.getElementById('full-name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const user = new User(fullName, username, email, phone, password, gender);
        user.save();
        User.setCurrentUser(username);
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        document.body.innerHTML = `
            <div class="container text-center">
                <h2>Registration Successful</h2>
                <p>Thank you for registering.</p>
                <button class="btn btn-primary" id="continue-btn">Continue</button>
            </div>
        `;
        document.getElementById('continue-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Registration('registration-form');
});
