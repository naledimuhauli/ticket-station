document.addEventListener('DOMContentLoaded', () => {
    const currentUser = User.getCurrentUser();
    const signUpBtn = document.getElementById('sign-up-btn');
    const signOutBtn = document.getElementById('sign-out-btn');

    if (currentUser) {
        signUpBtn.textContent = currentUser;
        signOutBtn.style.display = 'inline-block';
    }

    signOutBtn.addEventListener('click', () => {
        User.signOut();
        window.location.href = 'index.html';
    });
});

class User {
    static getCurrentUser() {
        return localStorage.getItem('currentUser');
    }

    static signOut() {
        localStorage.removeItem('currentUser');
    }
}
