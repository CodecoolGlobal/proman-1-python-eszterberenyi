const mainContainer = document.querySelector(".main-container")
const errorPlace = document.querySelector('#error-message2');
document.addEventListener("DOMContentLoaded", () => {
    const param = new URLSearchParams(document.location.search);
    const attempt = param.get('attempt');
    console.log(attempt)
    if (attempt === 'unsuccessful') {
        console.log(errorPlace)
        errorPlace.textContent = 'Incorrect username or password';
        mainContainer.addEventListener('click', () => {
            errorPlace.textContent = '';
        })
    }
})