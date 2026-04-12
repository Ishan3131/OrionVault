import * as api from './api.js'
if(localStorage.getItem('isLoggedIn') == 'true') {
    const data = await api.getGamesCollection({search: searchInput})
}
else {
    window.open('../html/signup.html', '_self');
}

async function renderSearchedData(searchInput) {

}