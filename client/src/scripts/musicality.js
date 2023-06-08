function getVocality(audioFeatures) {
  let avgVocality = 0;
  audioFeatures.forEach((track) => {
    avgVocality += track.instrumentalness;
  });
  avgVocality /= audioFeatures.length;
  avgVocality *= 100;
  avgVocality = 100 - avgVocality;
  return avgVocality;
}

function getAcousticness(audioFeatures) {
  let avgAcousticness = 0;
  audioFeatures.forEach((track) => {
    avgAcousticness += track.acousticness;
  });
  avgAcousticness /= audioFeatures.length;
  avgAcousticness *= 100;
  return avgAcousticness;
}

function getDanceability(audioFeatures) {
  let avgDanceability = 0;
  audioFeatures.forEach((track) => {
    avgDanceability += track.danceability;
  });
  avgDanceability /= audioFeatures.length;
  avgDanceability *= 100;
  return avgDanceability;
}

export function getMusicality(features) {
  let vocality = getVocality(features);
  let acousticness = getAcousticness(features);
  let danceability = getDanceability(features);

  return [vocality, acousticness, danceability];
}
