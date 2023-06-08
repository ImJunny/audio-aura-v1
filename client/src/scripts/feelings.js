function getHappiness(audioFeatures) {
  let avgHappiness = 0;
  audioFeatures.forEach((track) => {
    avgHappiness += track.valence;
  });
  avgHappiness /= audioFeatures.length;
  avgHappiness *= 100;
  return avgHappiness;
}

function getEnergy(audioFeatures) {
  let avgEnergy = 0;
  audioFeatures.forEach((track) => {
    avgEnergy += track.energy;
  });
  avgEnergy /= audioFeatures.length;
  avgEnergy *= 100;
  return avgEnergy;
}

export function getFeelings(features) {
  let happiness = getHappiness(features);
  let energy = getEnergy(features);

  return [happiness, energy];
}
