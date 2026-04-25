export const loginModel = {
    validateUser: function(username, password) {
        const validUser = "admin";
        const validPass = "1234";
        
        return username === validUser && password === validPass;
    }
};