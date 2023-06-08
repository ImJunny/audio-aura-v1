//top artists
function getTopArtists(artists) {
  artists = artists.slice(0, 5);
  artists = artists.map((item) => item.name);
  return artists;
}

//top tracks
function getTopTracks(tracks) {
  tracks = tracks.slice(0, 5);
  tracks = tracks.map((item) => item.name);
  /*
  tracks.forEach((item, i) => {
    if (item.includes("feat") || item.includes("ft")) {
      tracks[i] = item.substring(0, item.indexOf("(f"));
    }
  });
  */
  return tracks;
}

//top genres
function getTopGenres(artists) {
  let genres = [];
  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genres.push(genre);
    });
  });

  let topGenres = [];
  genres.forEach((genre) => {
    if (!topGenres.some((item) => item.name === genre)) {
      topGenres.push({ name: genre, amount: 1 });
    } else {
      topGenres.forEach((item) => {
        if (item.name === genre) {
          item.amount += 1;
        }
      });
    }
  });
  topGenres = topGenres.sort(compareByAmount).reverse();
  topGenres = topGenres.slice(0, 5);
  topGenres = topGenres.map((item) => item.name);

  return topGenres;
}

function compareByAmount(a, b) {
  if (a.amount < b.amount) {
    return -1;
  } else if (a.amount > b.amount) {
    return 1;
  } else {
    return 0;
  }
}

export function getInfo(tracks, artists) {
  let topTracks = getTopTracks(tracks);
  let topArtists = getTopArtists(artists);
  let topGenres = getTopGenres(artists);
  return [topTracks, topArtists, topGenres];
}
