const endpoints = {
    games: 'games',
    game_details: id => `games/${id}`,
    similar_games: id =>  `games/${id}/suggested`,
    game_youtube: id => `games/${id}/youtube`,
    game_screenshots: id => `games/${id}/screenshots`,
    genres: 'genres',
    genre_games: id => `genres/${id}`,
    platforms: 'platforms',
    developers: 'developers',
    developer: id => `developers/${id}`
}

const cache = {}


function generateApi(endpoint,queries={}) {
    let queryString = ''
    for(let k in queries) {
        queryString += `&${k}=${queries[k]}`
    }
    return `/api/fetch?endpoint=${endpoint}&queries=${encodeURIComponent(queryString)}`
}

async function getData(api) {
    if(api in cache) return cache[api]
    try{
        let res = await fetch(api);
        const data = await res.json();
        cache[api] = data;
        return data;
    }
    catch (err) {
        console.log(err)
    }
}

async function getGamesCollection(queries) {
    return await getData(generateApi(endpoints.games,queries));
}

async function getGenresCollection(queries) {
    return await getData(generateApi(endpoints.genres,queries));
}

async function getDevelopers(queries) {
    return await getData(generateApi(endpoints.developers,queries));
}

async function getGameDetails(id,queries) {
    return await getData(generateApi(endpoints.game_details(id),queries));
}

async function getYoutubeVideo(id,queries) {
    return await getData(generateApi(endpoints.game_youtube(id),queries));
}
export {getGamesCollection, getGenresCollection, getDevelopers, getGameDetails, getYoutubeVideo, endpoints}