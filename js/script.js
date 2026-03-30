import * as api from "./api.js";
import * as ui from './ui.js'
const results = document.getElementById('results');

async function showGames(queries = {}) {
    let games = await api.getGamesCollection(queries);
    api.endpoints.next_games = games.next;

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

async function showGenres(queries = {}) {
    let genres = await api.getGenresCollection(queries);
    console.log(genres)
    console.dir(genres.results[0])
}

async function showDevelopers(queries = {}) {
    let developers = await api.getDevelopers(queries);
    console.log(developers)
    console.dir(developers.results[0])
}

document.getElementById('nav_collection').addEventListener('click', () => showGames())
document.getElementById('nav_genres').addEventListener('click', () => showGenres())
document.getElementById('nav_developers').addEventListener('click', () => showDevelopers())