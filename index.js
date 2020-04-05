require('dotenv').config();
const Octokit = require("@octokit/rest");
const fetch = require("node-fetch");
const eaw = require('eastasianwidth');

const {
  GH_TOKEN: githubToken,
  GIST_ID: gistId,
  TRAKT_ID: traktId,
  TRAKT_USERNAME: traktUser,
  MOVIE_BOX_MODE: movieBoxMode
} = process.env

const octokit = new Octokit({
  auth: `token ${githubToken}`
});

const API_URL = 'https://api.trakt.tv';


function truncateString(str, num, suf) {
  let suffix = '';
  if (suf) {
    suffix = '...';
  }
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + suffix;
}

function generateBarChart(percent, size) {
  const syms = "░▏▎▍▌▋▊▉█";

  const frac = Math.floor((size * 8 * percent) / 100);
  const barsFull = Math.floor(frac / 8);
  if (barsFull >= size) {
    return syms.substring(8, 9).repeat(size);
  }
  const semi = frac % 8;

  return [
    syms.substring(8, 9).repeat(barsFull),
    syms.substring(semi, semi + 1),
  ].join("").padEnd(size, syms.substring(0, 1));
}

async function main() {
  if (!traktId || !traktUser || !gistId || !githubToken || !movieBoxMode){
    throw new Error('Please check your environment variables, as you are missing one.')
  }

  let gist, endpoint, gistTitle, API_END, mainData, mainJson, lines = [],
      showsGnreData, moviesGnreData, showsGnreJson, moviesGnreJson;

  switch(movieBoxMode) {
    case 'movies':
      endpoint = 'history/movies';
      gistTitle = `🎞 My last watched movies`;
      break;
    case 'shows':
      endpoint = 'history/shows';
      gistTitle = `📺 My last watched shows`;
      break;
    case 'stats':
      endpoint = 'stats';
      gistTitle = `📊 My movie + shows statistics`;
      break;
  }

  API_END = `${API_URL}/users/${traktUser}/${endpoint}`;
  MOVIES_GNRE_API_END = `${API_URL}/users/${traktUser}/watched/movies?extended=full&limit=10000`;
  SHOWS_GNRE_API_END = `${API_URL}/users/${traktUser}/watched/shows?extended=full&limit=10000`;

  try {
    mainData = await fetch(API_END, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': traktId,
        'trakt-api-version': '2',
      }
    });
    mainJson = await mainData.json();

    if (movieBoxMode == 'stats') {
      showsGnreData = await fetch(SHOWS_GNRE_API_END, {
        headers: {
          'Content-Type': 'application/json',
          'trakt-api-key': traktId,
          'trakt-api-version': '2',
        }
      });
      showsGnreJson = await showsGnreData.json();
      moviesGnreData = await fetch(MOVIES_GNRE_API_END, {
        headers: {
          'Content-Type': 'application/json',
          'trakt-api-key': traktId,
          'trakt-api-version': '2',
        }
      });
      moviesGnreJson = await moviesGnreData.json();
    }
  } catch (error) {
    console.error(`movie-box ran into an issue getting your Trakt.tv data:\n${error}`);
  }

  try {
    gist = await octokit.gists.get({
      gist_id: gistId
    });
  } catch (error) {
    console.error(`movie-box ran into an issue getting your Gist:\n${error}`);
  }

  try {
    switch(movieBoxMode) {
      case 'shows':
        for(let i = 0; i < 5; i++) {
          const title = truncateString(mainJson[i].show.title, 35, true);
          const season = mainJson[i].episode.season.toString().padStart(2, '0');
          const episode = mainJson[i].episode.number.toString().padStart(2, '0');
          const w = new Date(mainJson[i].watched_at);
          const d = w.getDate().toString().padStart(2, '0');
          const m = (w.getMonth() + 1).toString().padStart(2, '0');
          const y = truncateString(w.getFullYear().toString(), 2, false);
          lines.push([
            `S${season}E${episode}`,
            title.padEnd(40 + title.length - eaw.length(title)),
            `${d}-${m}-${y}`
          ].join(' '));
        }
        break;
      case 'movies':
        for(let i = 0; i < 5; i++) {
          const title = truncateString(mainJson[i].movie.title, 41, true);
          const w = new Date(mainJson[i].watched_at);
          const d = w.getDate().toString().padStart(2, '0');
          const m = (w.getMonth() + 1).toString().padStart(2, '0');
          const y = truncateString(w.getFullYear().toString(), 2, false);
          lines.push([
            title.padEnd(46 + title.length - eaw.length(title)),
            `${d}-${m}-${y}`
          ].join(' '));
        }
        break;
      case 'stats':
        let genres = [];
        const nMovies = mainJson.movies.watched;
        const nEpisodes = mainJson.episodes.watched;
        const nShows = mainJson.shows.watched;
        for(let i = 0; i < moviesGnreJson.length; i++) {
          genres = genres.concat(moviesGnreJson[i].movie.genres);
        }
        for(let i = 0; i < showsGnreJson.length; i++) {
          genres = genres.concat(showsGnreJson[i].show.genres);
        }
        let genreScore = genres.reduce(function (acc, curr) {
          if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});
        let genreScoreList = Object.keys(genreScore).map(function(key) {
          return [key, genreScore[key] * 100 / genres.length];
        });
        genreScoreList.sort(function(first, second) {
          return second[1] - first[1];
        });
        lines.push([
          `I've watched ${nMovies} movies and ${nEpisodes} episodes of ${nShows} shows.\n`,
          'My favorite 3 genres are:',
        ].join(''));
        for(let i = 0; i < 3; i++) {
          lines.push([
            genreScoreList[i][0].padEnd(25),
            generateBarChart(genreScoreList[i][1], 21),
            String(genreScoreList[i][1].toFixed(1)).padStart(5) + "%"
          ].join(' '));
        }
        break;
    }
  } catch (error) {
    console.error(`movie-box ran into an issue processing your data:\n${error}`);
  }

  try {
    // Get original filename to update that same file
    const filename = Object.keys(gist.data.files)[0];
    await octokit.gists.update({
      gist_id: gistId,
      files: {
        [filename]: {
          filename: gistTitle,
          content: lines.join("\n")
        }
      }
    });
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

(async () => {
  await main();
})();
