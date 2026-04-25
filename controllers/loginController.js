import { loginModel } from '../models/loginModel.js';
import { loginView } from '../views/loginView.js';

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const { user, pass } = loginView.getInputs();

    const isValid = loginModel.validateUser(user, pass);

    if (isValid) {
        loginView.redirectToDashboard();
    } else {
        loginView.showError();
    }
});