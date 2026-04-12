import * as api from "./api.js";
import * as ui from './ui.js'
const trendingSection = document.querySelector('.trending-games');
const gameSection = document.querySelector('#games');
const genreSection = document.querySelector('#genres');
const devSection = document.querySelector('#devs');


let theme = localStorage.getItem('theme')
if(theme === null) localStorage.setItem('theme', 'dark');
else if(theme == 'light') ui.toggleTheme(true)

let isLoggedIn = localStorage.getItem('isLoggedIn');
if(isLoggedIn == 'true') {
    document.querySelector('#signup').style.display = 'none';
    document.querySelector('.nav-search-tab').style.display = 'flex';
    document.querySelector('#signout').style.display = 'block'
}

async function renderGames(parent, queries = {}) {
    let games = await api.getGamesCollection(queries);
    if(games == undefined) return
    parent.innerHTML = '';

    games.results.forEach(game => {
        let div = document.createElement('button')
        div.setAttribute('class', 'card');

        div.setAttribute('style', `background-image: url(${game.background_image});`);
        div.addEventListener('click', () => openGameDetails(game.id))

        div.innerHTML += `
        <div class="card-details">
            <p class="card-text1">${game.name}</p>
            <p class="card-text2">${game.genres[0].name}</p>
            <p class="card-text3"><span class="game_rating_text">${game.rating}</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="gold" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" data-hercules-id="src/pages/_components/GameCard.tsx:69:12" data-hercules-name="Star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg></p>
        </div>
        `
        parent.appendChild(div);
    })
}

async function renderGenres(parent, queries = {}) {
    let genres = await api.getGenresCollection(queries);
    if(genres == undefined) return
    parent.innerHTML = ''
    genres.results.forEach(genre => {
        let div = document.createElement('button')
        div.setAttribute('class', 'card');

        div.setAttribute('style', `background-image: url(${genre.image_background});`);
        div.addEventListener('click', () => searchGenreGames(genre.id))

        div.innerHTML += `
        <div class="card-details">
            <p class="card-text1"></p>
            <p class="card-text2">${genre.name}</p>
            <p class="card-text3"><span class="game_rating_text">${genre.games_count} Games</span></p>
        </div>
        `
        parent.appendChild(div);
    })
}

async function renderDevs(parent, queries = {}) {
    let developers = await api.getDevelopers(queries);
    if(developers == undefined) return
    parent.innerHTML = ''
    developers.results.forEach(dev => {
        let div = document.createElement('button')
        div.setAttribute('class', 'card');

        div.setAttribute('style', `background-image: url(${dev.image_background});`);
        div.addEventListener('click', () => openDevDetails(dev.id))

        div.innerHTML += `
        <div class="card-details">
            <p class="card-text1"></p>
            <p class="card-text2">${dev.name}</p>
            <p class="card-text3"><span class="game_rating_text">${dev.games_count} Games</span></p>
        </div>
        `
        parent.appendChild(div);
    })
}

document.querySelector('.nav-more-options-button').addEventListener('click', ui.moreOptions);
document.querySelector('.toggle-theme').addEventListener('click', ui.toggleTheme);

renderGames(trendingSection, {page_size: '10'})
renderGames(gameSection, {page_size: '80'});

function openGameDetails(id) {
    window.open('./html/game.html?gameId='+id);
}

function searchGenreGames(id) {
    window.open('./html/search.html?genre='+id)
}

function openDevDetails(id) {
    window.open('./html/dev.html?devId='+id)
}

function switchTab(e) {
    let switched = false;
    if(e.target.innerText == 'Games') {
        if(!('vault-select' in gameSection.classList)) {
            document.querySelector('.vault-select').classList.remove('vault-select');
            gameSection.classList.add('vault-select');
            renderGames(gameSection, {page_size: '80'});
            switched = true
        }
    }
    else if(e.target.innerText == 'Genres') {
        if(!('vault-select' in genreSection.classList)) {
            document.querySelector('.vault-select').classList.remove('vault-select');
            genreSection.classList.add('vault-select');
            renderGenres(genreSection), {page_size: '40'};
            switched = true
        }
    }
    else if(e.target.innerText == 'Developers') {
        if(!('vault-select' in devSection.classList)) {
            document.querySelector('.vault-select').classList.remove('vault-select');
            devSection.classList.add('vault-select');
            renderDevs(devSection, {page_size: '80'});
            switched = true;
        }
    }
    if(switched) {
        document.querySelector('.nav-select').classList.remove('nav-select');
        e.target.closest('.nav-tab').classList.add('nav-select')
    }
}

document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', switchTab);
})