import * as api from "./api.js";
import * as ui from './ui.js'
const results = document.getElementById('results');

async function renderGames(queries = {}) {
    let games = await api.getGamesCollection(queries);
    api.endpoints.next_games = games.next;
    results.innerHTML = '';

    for(let game of games.results) {
        let div = document.createElement('div')
        div.setAttribute('class', 'game_container');
        div.innerHTML = `
        <div class="game_img" style="background-image: url(${game.background_image});"></div>
        <div class="game_detail_panel">
            <div class="game_less_details">
                <p class="game_name">${game.name}</p>
                <p class="game_genre">${game.genres[0].name}</p>
                <p class="game_rating"><span class="game_rating_text">${game.rating}</span>⭐</p>
            </div>
            <div class="game_more_details"></div>
        </div>
`
        div.addEventListener('mouseenter', ui.game_card_hover);
        div.addEventListener('mouseleave', ui.game_card_mouseLeave);
        results.appendChild(div);
    }
}

async function renderGenres(queries = {}) {
    let genres = await api.getGenresCollection(queries);
    results.innerHTML = ''
    console.log(genres.results)
    for(let genre of genres.results){
    results.innerHTML += `
        <div class='genre_container'>
            <div class='genre_img' style="background-image: url(${genre.image_background});"></div>
            <div class='genre_details'>
                <h3 class='genre_name'>${genre.name}</h3>
                <h4 class='genre_games_count'>${genre.games_count} games</h4>
            </div>
        </div>`
    }
}

async function renderDevs(queries = {}) {
    let developers = await api.getDevelopers(queries);
    console.log(developers.results)
    results.innerHTML = ''
    for(let dev of developers.results){
    results.innerHTML += `
        <div class='genre_container'>
            <div class='genre_img' style="background-image: url(${dev.image_background});"></div>
            <div class='genre_details'>
                <h3 class='genre_name'>${dev.name}</h3>
                <h4 class='genre_games_count'>${dev.games_count} games</h4>
            </div>
        </div>`
    }

}

document.getElementById('nav_games').addEventListener('click', () => renderGames())
document.getElementById('nav_genres').addEventListener('click', () => renderGenres())
document.getElementById('nav_devs').addEventListener('click', () => renderDevs())

renderGames();