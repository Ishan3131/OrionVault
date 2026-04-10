import * as api from './api.js'
import * as ui from './ui.js'

let theme = localStorage.getItem('theme')
if(theme === null) localStorage.setItem('theme', 'dark');
else if(theme == 'light') ui.toggleTheme(true)

const gameId = new URLSearchParams(window.location.search).get('gameId');
if(gameId == null) {
    document.body.style.backgroundColor = 'black';
    document.body.innerHTML = '<h1 style="color: rgb(255, 34, 34); font-family: var(--text-font-family);">No game found</h1>'
}
else {
renderGamePage(gameId)
}

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
function formatDate(date) {
    date = date.split('-')
    return `${months[Number(date[1])-1]} ${date[2].slice(0,2)}, ${date[0]}`
}

const platform_icons = {
    windows: `<svg data-hercules-id="src/pages/game/page.tsx:47:4" data-hercules-name="svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path data-hercules-id="src/pages/game/page.tsx:48:6" data-hercules-name="path" d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.85"></path></svg>`,
    macos: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-apple w-5 h-5" aria-hidden="true" data-hercules-id="src/pages/game/page.tsx:52:11" data-hercules-name="Apple"><path d="M12 6.528V3a1 1 0 0 1 1-1h0"></path><path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"></path></svg>`,
    linux: `<svg data-hercules-id="src/pages/game/page.tsx:79:4" data-hercules-name="svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path data-hercules-id="src/pages/game/page.tsx:80:6" data-hercules-name="path" d="M12 2C9.6 2 8 4.2 8 6.5c0 1.2.4 2.3 1 3.1-.8.5-1.5 1.3-1.8 2.3L6 15c-.2.7 0 1.4.4 2 .5.6 1.2.9 2 .9H9c.2.5.6.9 1.1 1.1v.5c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5v-.5c.5-.2.9-.6 1.1-1.1h.6c.8 0 1.5-.3 2-.9.4-.6.6-1.3.4-2l-1.2-3.1c-.3-1-.9-1.8-1.8-2.3.6-.8 1-1.9 1-3.1C16 4.2 14.4 2 12 2zm0 2c1.6 0 2 1.5 2 2.5 0 1.5-.9 2.5-2 2.5S10 8 10 6.5C10 5.5 10.4 4 12 4zm-1 6.5c.3 0 .6 0 .9.1.1 0 .1 0 .2-.1.3-.1.6-.1.9-.1.9 0 1.7.5 2.1 1.3l1.2 3.1c.1.3 0 .6-.2.8-.2.3-.5.4-.8.4H15c-.3 0-.5.2-.5.5 0 .6-.4 1-1 1h-3c-.6 0-1-.4-1-1 0-.3-.2-.5-.5-.5h-.5c-.3 0-.6-.1-.8-.4-.2-.2-.3-.5-.2-.8l1.2-3.1c.4-.8 1.2-1.2 2.3-1.2z"></path></svg>`,
    playstation: `<svg data-hercules-id="src/pages/game/page.tsx:63:4" data-hercules-name="svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path data-hercules-id="src/pages/game/page.tsx:64:6" data-hercules-name="path" d="M8.984 2.596v14.477l3.282 1.17V6.389c0-.676.303-1.148.787-.983.612.182.735.806.735 1.48v4.382c2.701 1.328 4.74-.131 4.74-3.623 0-3.61-1.547-5.272-4.371-6.308-1.171-.43-3.25-.884-5.173-.741zM.575 19.554l7.882 2.843v-3.064l-5.415-1.896v-3.081l-2.467-.91v6.108zm22.85-6.811l-2.467.91v3.081l-5.415 1.895v3.065l7.882-2.843v-6.108z"></path></svg>`,
    xbox: `<svg data-hercules-id="src/pages/game/page.tsx:71:4" data-hercules-name="svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path data-hercules-id="src/pages/game/page.tsx:72:6" data-hercules-name="path" d="M4.102 3.27C2.518 4.876 1.5 7.057 1.5 9.5c0 4.694 3.806 8.5 8.5 8.5 2.443 0 4.624-1.018 6.23-2.602C13.91 12.884 11.5 9.5 11.5 9.5s-1.5-2.5-3.5-4.5c-1-.999-2.5-2-3.898-1.73zM12 1.5C9.557 1.5 7.376 2.518 5.77 4.102c.299-.064.613-.102.93-.102C8.88 4 11.5 6.5 11.5 6.5s2.617 2.5 4.801 2.5c.317 0 .632-.038.93-.102C15.624 7.294 14 4.636 12 1.5zM19.898 3.27C18.5 3 17 4 16 5c-2 2-3.5 4.5-3.5 4.5s-2.41 3.384-4.73 5.898C9.376 16.982 11.557 18 14 18c4.694 0 8.5-3.806 8.5-8.5 0-2.443-1.018-4.624-2.602-6.23z"></path></svg>`,
    'nintendo-switch': `<svg data-hercules-id="src/pages/game/page.tsx:95:4" data-hercules-name="svg" viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path data-hercules-id="src/pages/game/page.tsx:96:6" data-hercules-name="path" d="M9.1 2.4C5.4 2.4 2.4 5.4 2.4 9.1v5.8c0 3.7 3 6.7 6.7 6.7h2.7V2.4H9.1zm.6 10.5c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zM14.9 2.4v19.2h.2c3.7 0 6.7-3 6.7-6.7V9.1c0-3.7-3-6.7-6.7-6.7h-.2zm2 10.5c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7z"></path></svg>`,
    other: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4a1 1 0 00-1 1v12a1 1 0 001 1h7v2H8a1 1 0 000 2h8a1 1 0 000-2h-3v-2h7a1 1 0 001-1V4a1 1 0 00-1-1zm-1 12H5V5h14v10z" /></svg>`
}

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

        document.querySelector('#release_date').innerText = formatDate(details.released);
        document.querySelector('#updated_date').innerText = formatDate(details.updated);
        document.querySelector('.game-overview-site').href = details.website;

        details.platforms.forEach(platform => {
            let svg;
            for(let icon in platform_icons) {
                if(platform.platform.slug.includes(icon)) {
                    svg = platform_icons[icon]
                    break
                }
            }
            if(svg == undefined) svg = platform_icons.other;
            document.querySelector('.game-overview-platforms').innerHTML += `
            <div class='platform-tag'>
                <div class='platform-icon'>${svg}</div>
                <span class='platform-name'>${platform.platform.name}</span>
            </div>`
        })

        const videoId = await api.getYoutubeVideo(id);
        document.querySelector('.game-page-video').src = `https://www.youtube.com/embed/${videoId}`
    }
    catch (err) {
        console.log(err)
        document.body.style.backgroundColor = 'black';
        document.body.innerHTML = '<h1 style="color: rgb(255, 34, 34); font-family: var(--text-font-family);">No game found</h1>'
    }
}

document.querySelector('.nav-more-options-button').addEventListener('click', ui.moreOptions);
document.querySelector('.toggle-theme').addEventListener('click', ui.toggleTheme);