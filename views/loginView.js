export const loginView = {
    getInputs: function() {
        return {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value
        };
    },

    showError: function() {
        document.getElementById("error-message").style.display = "block";
        this.clearInputs();
    },

    redirectToDashboard: function() {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    },

    clearInputs: function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
};