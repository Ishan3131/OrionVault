function openSearchPage() {
    const searchInput = document.querySelector('.nav-search-input').value;
    window.open(`../html/search.html?search=${searchInput}`, '_self')
}

document.querySelector('.nav-search-button').addEventListener('click', openSearchPage);

function openSignUpPage() {
    window.open('../html/signup.html', '_self');
}

document.querySelector('#signup').addEventListener('click', openSignUpPage)

function signout() {
    localStorage.setItem('isLoggedIn', false)
    window.open('../index.html', '_self');
}

document.querySelector('#signout').addEventListener('click', signout)