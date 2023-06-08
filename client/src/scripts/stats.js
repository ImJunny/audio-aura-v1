function getPopularity(tracks) {
  let avgPopularity = 0;
  tracks.forEach((track) => {
    avgPopularity += track.popularity;
  });
  avgPopularity /= tracks.length;
  return avgPopularity;
}

function getVariety(tracks) {
  let artistsList = [];
  //get num of unique artists
  tracks.forEach((track) => {
    let trackName = track.album.artists[0].name;
    if (!artistsList.includes(trackName)) {
      artistsList.push(trackName);
    }
  });
  //return ratio of artists
  return (artistsList.length / tracks.length) * 100;
}

function getRecency(tracks) {
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  let avgRecency = 0;
  tracks.forEach((track) => {
    let relDate = track.album.release_date;
    let relYear = parseInt(relDate.substring(0, 4));
    let timeDiff = curYear - relYear;
    if (timeDiff <= 5) {
      avgRecency += 100 - timeDiff * 20;
    }
  });
  avgRecency /= tracks.length;
  return avgRecency;
}

export function getStats(tracks) {
  let popularity = getPopularity(tracks);
  let variety = getVariety(tracks);
  let recency = getRecency(tracks);

  return [popularity, variety, recency];
}
