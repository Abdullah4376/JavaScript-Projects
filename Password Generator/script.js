const length = 12;
const sLetters = 'abcdefghijklmnopqrstuvwxyz';
const lLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_=[{]},.></?';
const allChars = sLetters + lLetters + numbers + symbols;
const generatedPassword = document.querySelector('.generatedPassword')

document.querySelector('button').addEventListener('click', () => {
    let password = '';

    password += sLetters[Math.floor(Math.random() * sLetters.length)];
    password += lLetters[Math.floor(Math.random() * lLetters.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    generatedPassword.innerHTML = password;
})

