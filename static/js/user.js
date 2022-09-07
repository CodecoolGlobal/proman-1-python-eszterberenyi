const loginContainer = document.querySelector("#loginContainer");
const registerContainer = document.querySelector('#registerContainer');
const errorMessagePlace1 = document.querySelector('#error-message');
const errorMessagePlace2 = document.querySelector('#error-message2');

function informUser(param, paramText, htmlTag, message, container) {
     if (param === paramText) {
        htmlTag.textContent = message;
        container.addEventListener('click', () => {
            htmlTag.textContent = '';
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const param = new URLSearchParams(document.location.search);
    const attempt = param.get('attempt');
    if (registerContainer !== null){
        informUser(attempt, 'unsuccessful', errorMessagePlace1, 'Username already taken', registerContainer);
    } else {
        informUser(attempt, 'unsuccessful', errorMessagePlace2, 'Incorrect username or password', loginContainer)
    }
})