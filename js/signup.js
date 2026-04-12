function signup() {
    const gamertag = document.querySelector('#gamertag');
    const email = document.querySelector('#email');
    const age = document.querySelector('#age');
    let valid = true;
    if(gamertag.value.trim().length == 0) {
        gamertag.classList.add('error')
        gamertag.value = 'Gamer Tag required';
        valid = false;
    }
    if(!(email.value.includes('@') && email.value.includes('.com'))) {
        email.classList.add('error')
        email.value = 'Invalid Email';
        valid = false;
    }
    if(Number(age.value) < 13) {
        age.classList.add('error')
        age.type = 'text';
        age.value = 'Enter 13+ age Kiddo';
        valid = false
    }

    if(valid) {
        localStorage.setItem('isLoggedIn', true);
        window.open('../index.html', '_self');
    }
}

function reset(e) {
    e.target.classList.remove('error')
    e.target.value = '';
    age.type = 'number';
}

document.querySelector('#signup_button').addEventListener('click', signup);
document.querySelectorAll('input').forEach(inputBox => inputBox.addEventListener('focus', reset))