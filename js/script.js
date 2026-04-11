import * as api from "./api.js";
import * as ui from './ui.js'
const results = document.getElementById('results');

let theme = localStorage.getItem('theme')
if(theme === null) localStorage.setItem('theme', 'dark');
else if(theme == 'light') ui.toggleTheme(true)

async function renderGames(queries = {}) {
    let games = await api.getGamesCollection(queries);
    if(games == undefined) return
    results.innerHTML = '';

    for(let game of games.results) {
        let div = document.createElement('div')
        div.setAttribute('class', 'game_container');

        div.setAttribute('style', `background-image: url(${game.background_image});`);
        div.addEventListener('click', () => openGameDetails(game.id))

        div.innerHTML += `
            <div class="game_less_details">
                <p class="game_name">${game.name}</p>
                <p class="game_genre">${game.genres[0].name}</p>
                <p class="game_rating"><span class="game_rating_text">${game.rating}</span>⭐</p>
            </div>
        `
        results.appendChild(div);
    }
}

async function renderGenres(queries = {}) {
    let genres = await api.getGenresCollection(queries);
    if(genres == undefined) return
    results.innerHTML = ''
    for(let genre of genres.results){
    results.innerHTML += `
        <div class='genre_container' style="background-image: url(${genre.image_background});">
            <h3 class='genre_name'>${genre.name}</h3>
            <h4 class='genre_games_count'>${genre.games_count} games</h4>
        </div>
        `
    }
}

async function renderDevs(queries = {}) {
    let developers = await api.getDevelopers(queries);
    if(developers == undefined) return
    results.innerHTML = ''
    for(let dev of developers.results){
    results.innerHTML += `
        <div class='genre_container' style="background-image: url(${dev.image_background});">
            <h3 class='genre_name'>${dev.name}</h3>
            <h4 class='genre_games_count'>${dev.games_count} games</h4>
        </div>
        `
    }
}

document.getElementById('nav_games').addEventListener('click', () => renderGames())
document.getElementById('nav_genres').addEventListener('click', () => renderGenres())
document.getElementById('nav_devs').addEventListener('click', () => renderDevs())
document.querySelector('.nav-more-options-button').addEventListener('click', ui.moreOptions);
document.querySelector('.toggle-theme').addEventListener('click', ui.toggleTheme);

renderGames({page_size: '50'});

async function openGameDetails(id) {
    window.open('./html/game.html?gameId='+id);
}