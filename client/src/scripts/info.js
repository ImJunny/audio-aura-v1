//top artists
function getTopArtists(artists) {
  artists = artists.slice(0, 5);
  artists = artists.map((item) => item.name);
  return artists;
}

//top tracks
function getTopTracks(tracks) {
  return tracks.slice(0, 5).map((track) => ({
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(", "),
  }));
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
  topGenres = topGenres.slice(0, 1);
  topGenres = topGenres.map((item) => item.name);

  return topGenres;
}

function getTrackPreviews(tracks) {
  return tracks.slice(0, 5).map((item) => item.preview_url);
}

function getTrackImages(tracks) {
  return tracks.slice(0, 5).map((item) => item.album.images[0].url);
}

function getArtistImages(artists) {
  return artists.slice(0, 5).map((item) => item.images[0].url);
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
  let trackPreviews = getTrackPreviews(tracks);
  let trackImages = getTrackImages(tracks);
  let artistImages = getArtistImages(artists);
  return [
    topTracks,
    topArtists,
    topGenres,
    trackPreviews,
    trackImages,
    artistImages,
  ];
}
