import * as api from './api.js'

async function renderGamePage(id) {
    try {
        const details = await api.getGameDetails(id);
        if(!('id' in details)) {
            throw new Error('No game found')
        }
        document.querySelector('.game-overview-img').src = details.background_image;
        const genresSec = document.querySelector('.game-overview-genres');
        details.genres.forEach(genre => {
            genresSec.innerHTML += `<button class="game-overview-genre-tag">${genre.name}</button>`
        })
        document.querySelector('.game-overview-title').innerText = details.name;
        document.querySelector('.game-overview-rating').innerText = details.rating;
        document.querySelector('.game-overview-reviews-count').innerText = details.ratings_count;
        const videoId = await api.getYoutubeVideo(id);
        document.querySelector('.game-page-video').src = `https://www.youtube.com/embed/${videoId}`
    }
    catch (err) {
        document.body.style.backgroundColor = 'black';
        document.body.innerHTML = '<h1 style="color: rgb(255, 34, 34); font-family: var(--text-font-family);">No game found</h1>'
    }
}

const gameId = new URLSearchParams(window.location.search).get('gameId');
if(gameId == null) {
    document.body.style.backgroundColor = 'black';
    document.body.innerHTML = '<h1 style="color: rgb(255, 34, 34); font-family: var(--text-font-family);">No game found</h1>'
}
else {
renderGamePage(gameId)
}