document.addEventListener('DOMContentLoaded', () => {
    const currentUser = User.getCurrentUser();
    const signUpBtn = document.getElementById('sign-up-btn');

    if (currentUser) {
        signUpBtn.textContent = currentUser;
    }
});

class User {
    static getCurrentUser() {
        return localStorage.getItem('currentUser');
    }
}
