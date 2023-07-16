import Shape from "../components/Shape.js";
//globals
const VALLOW = 0.45;
const VALNEUTRAL = 0.65;
const VALHIGH = 1.0;

const ENLOW = 0.47;
const ENNEUTRAL = 0.78;
const ENHIGH = 1.0;

let categories = [
  { valence: VALLOW, energy: ENLOW, amount: 0, name: "melancholic" },
  { valence: VALLOW, energy: ENNEUTRAL, amount: 0, name: "emotional" },
  { valence: VALLOW, energy: ENHIGH, amount: 0, name: "passionate" },
  { valence: VALNEUTRAL, energy: ENLOW, amount: 0, name: "calm" },
  { valence: VALNEUTRAL, energy: ENNEUTRAL, amount: 0, name: "chill" },
  { valence: VALNEUTRAL, energy: ENHIGH, amount: 0, name: "energetic" },
  { valence: VALHIGH, energy: ENLOW, amount: 0, name: "content" },
  { valence: VALHIGH, energy: ENNEUTRAL, amount: 0, name: "blissful" },
  { valence: VALHIGH, energy: ENHIGH, amount: 0, name: "elated" },
];
let categoriesTop = [];
let topArtists = [];
let audioFeatures = [];
let topTracks = [];
let hue = 0;

function countCategories() {
  for (const track of audioFeatures) {
    for (const category of categories) {
      if (track.valence > category.valence || track.energy > category.energy) {
      } else {
        category.amount++;
        break;
      }
    }
  }
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

function setWeightAndShade() {
  const LIGHT = 0.17;
  const MEDIUM = 0.45;
  let total =
    categoriesTop[0].amount + categoriesTop[1].amount + categoriesTop[2].amount;
  categoriesTop.forEach((category) => {
    category.weight = category.amount / total;
    if (category.weight < LIGHT) {
      category.shade = "light";
    } else if (category.weight < MEDIUM) {
      category.shade = "medium";
    } else {
      category.shade = "dark";
    }
  });
}

function setColor() {
  categoriesTop.forEach((category) => {
    if (category.shade === "light") {
      if (category.valence === VALLOW && category.energy === ENLOW) {
        category.rgb = "rgb(121, 124, 255)";
      } else if (category.valence === VALLOW && category.energy === ENNEUTRAL) {
        category.rgb = "rgb(214,164,255)";
      } else if (category.valence === VALLOW && category.energy === ENHIGH) {
        category.rgb = "rgb(245, 137, 142)";
      } else if (category.valence === VALNEUTRAL && category.energy === ENLOW) {
        category.rgb = "rgb(133, 254, 230)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(152, 254, 154)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENHIGH
      ) {
        category.rgb = "rgb(253, 206, 252)";
      } else if (category.valence === VALHIGH && category.energy === ENLOW) {
        category.rgb = "rgb(183, 255, 255)";
      } else if (
        category.valence === VALHIGH &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(255, 249, 121)";
      } else if (category.valence === VALHIGH && category.energy === ENHIGH) {
        category.rgb = "rgb(255, 174, 121)";
      }
    } else if (category.shade === "medium") {
      if (category.valence === VALLOW && category.energy === ENLOW) {
        category.rgb = "rgb(13,19,255)";
      } else if (category.valence === VALLOW && category.energy === ENNEUTRAL) {
        category.rgb = "rgb(138,1,250)";
      } else if (category.valence === VALLOW && category.energy === ENHIGH) {
        category.rgb = "rgb(237,28,36)";
      } else if (category.valence === VALNEUTRAL && category.energy === ENLOW) {
        category.rgb = "rgb(1,216,173)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(105,255,125)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENHIGH
      ) {
        category.rgb = "rgb(251,132,248)";
      } else if (category.valence === VALHIGH && category.energy === ENLOW) {
        category.rgb = "rgb(16,254,254)";
      } else if (
        category.valence === VALHIGH &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(255,242,0)";
      } else if (category.valence === VALHIGH && category.energy === ENHIGH) {
        category.rgb = "rgb(255,121,32)";
      }
    } else {
      if (category.valence === VALLOW && category.energy === ENLOW) {
        category.rgb = "rgb(0, 4, 187)";
      } else if (category.valence === VALLOW && category.energy === ENNEUTRAL) {
        category.rgb = "rgb(102, 1, 184)";
      } else if (category.valence === VALLOW && category.energy === ENHIGH) {
        category.rgb = "rgb(187, 15, 23)";
      } else if (category.valence === VALNEUTRAL && category.energy === ENLOW) {
        category.rgb = "rgb(1, 158, 126)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(79,214,97)";
      } else if (
        category.valence === VALNEUTRAL &&
        category.energy === ENHIGH
      ) {
        category.rgb = "rgb(249, 47, 243)";
      } else if (category.valence === VALHIGH && category.energy === ENLOW) {
        category.rgb = "rgb(1, 216, 216)";
      } else if (
        category.valence === VALHIGH &&
        category.energy === ENNEUTRAL
      ) {
        category.rgb = "rgb(202, 192, 0)";
      } else if (category.valence === VALHIGH && category.energy === ENHIGH) {
        category.rgb = "rgb(234, 94, 0)";
      }
    }
  });
}

//MAIN FUNCTION
export function getBackground(features, artists, tracks) {
  //only for login page
  if (features === null && artists === null) {
    let randomColors = getRandomColors();

    let grad = {
      background: `linear-gradient(145deg, ${randomColors[0].rgb} 20%, ${randomColors[1].rgb} 50%, ${randomColors[2].rgb} 80%)`,
    };

    let shap = [];
    for (let i = 0; i < 5; i++) {
      shap.push(<Shape key={i} color={randomColors[i % 3].rgb} />);
    }
    return [grad, shap];
  }

  //reset saved global variables
  categories = [
    { valence: VALLOW, energy: ENLOW, amount: 0, name: "melancholic" },
    { valence: VALLOW, energy: ENNEUTRAL, amount: 0, name: "emotional" },
    { valence: VALLOW, energy: ENHIGH, amount: 0, name: "passionate" },
    { valence: VALNEUTRAL, energy: ENLOW, amount: 0, name: "calm" },
    { valence: VALNEUTRAL, energy: ENNEUTRAL, amount: 0, name: "chill" },
    { valence: VALNEUTRAL, energy: ENHIGH, amount: 0, name: "energetic" },
    { valence: VALHIGH, energy: ENLOW, amount: 0, name: "content" },
    { valence: VALHIGH, energy: ENNEUTRAL, amount: 0, name: "blissful" },
    { valence: VALHIGH, energy: ENHIGH, amount: 0, name: "elated" },
  ];
  hue = 0;

  audioFeatures = features;
  topArtists = artists;
  topTracks = tracks;
  countCategories();
  categoriesTop = categories.sort(compareByAmount).reverse().slice(0, 3);
  setWeightAndShade();
  setColor();
  let gradient = {
    background: `linear-gradient(145deg, ${categoriesTop[0].rgb} 20%, ${categoriesTop[1].rgb} 50%, ${categoriesTop[2].rgb} 80%)`,
  };
  getHue();
  return [gradient, categoriesTop, hue];
}

function getHue() {
  topTracks.forEach((track) => {
    hue += track.popularity;
  });
  hue /= topTracks.length;
  hue /= 100;
  if (hue > 0.55) {
    hue = ((hue - 0.55) / 0.45) * 20;
  } else {
    hue = (1 - hue / 0.55) * -15;
  }
}

//only for login page; generates arr of 3 colors for login page
function getRandomColors() {
  const rgbStrings = [
    "rgb(121, 124, 255)",
    "rgb(214, 164, 255)",
    "rgb(245, 137, 142)",
    "rgb(133, 254, 230)",
    "rgb(152, 254, 154)",
    "rgb(253, 206, 252)",
    "rgb(183, 255, 255)",
    "rgb(255, 249, 121)",
    "rgb(255, 174, 121)",
    "rgb(13, 19, 255)",
    "rgb(138, 1, 250)",
    "rgb(237, 28, 36)",
    "rgb(1, 216, 173)",
    "rgb(105, 255, 125)",
    "rgb(251, 132, 248)",
    "rgb(16, 254, 254)",
    "rgb(255, 242, 0)",
    "rgb(255, 121, 32)",
    "rgb(0, 4, 187)",
    "rgb(102, 1, 184)",
    "rgb(187, 15, 23)",
    "rgb(1, 158, 126)",
    "rgb(79, 214, 97)",
    "rgb(249, 47, 243)",
    "rgb(1, 216, 216)",
    "rgb(202, 192, 0)",
    "rgb(234, 94, 0)",
  ];

  function randomColor() {
    let rand = Math.floor(Math.random() * 27);
    return rgbStrings[rand];
  }

  let arr = [];
  while (arr.length < 3) {
    let color = randomColor();
    if (!arr.includes(color)) {
      arr.push({ rgb: color });
    } else {
      color = randomColor();
    }
  }
  return arr;
}
