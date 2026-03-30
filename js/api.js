const endpoints = {
    games: 'games',
    next_games: null,
    similar_games: id =>  `games/${id}/suggested`,
    game_youtube: id => `games/${id}/youtube`,
    genres: 'genres',
    genre_games: id => `genres/${id}`,
    platforms: 'platforms',
    developers: 'developers',
    next_developers: null,
    developer: id => `developers/${id}`
}


function generateApi(endpoint,queries) {
    let queryString = ''
    for(let k in queries) {
        queryString += `&${k}=${queries[k]}`
    }
    console.log(queryString)
    console.log(`/api/fetch?endpoint=${endpoint}&queries=${encodeURIComponent(queryString)}`)
    return `/api/fetch?endpoint=${endpoint}&queries=${encodeURIComponent(queryString)}`
}

async function getData(api) {
    let data = await fetch(api);
    return await data.json();
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

export {getGamesCollection, getGenresCollection, getDevelopers, endpoints}