const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
let authCode;
let token;
let tokenRef;

const app = express();
const PORT = 5000;

app.use(express.text());
app.use(express.json());

app.get("/authenticate", (req, res) => {
  const urlParams = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-top-read",
    show_dialog: true,
  }).toString();
  const url = "https://accounts.spotify.com/authorize?" + urlParams;
  res.json(url);
});

app.post("/postCode", async (req, res) => {
  authCode = req.body;

  await setTokens();
  if (token === undefined) {
    res.json("no token");
    return;
  }
  let topTracks = await getTopTracks();
  if (topTracks.items.length < 4) {
    res.json("not enough tracks");
    return;
  }
  let audioFeatures = await getAudioFeatures(topTracks.items);
  let topArtists = await getTopArtists();
  let data = { topTracks, audioFeatures, topArtists };
  res.json(data);
});

function setTokens() {
  return axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirectUri,
        client_id: clientId,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
      }
    )
    .then((res) => {
      token = res.data.access_token;
      tokenRef = res.data.refresh_token;
    })
    .catch(() => {
      token = undefined;
    });
}

function getTopTracks() {
  return axios
    .get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => {
      return res.data;
    });
}

function getAudioFeatures(topTracksArr) {
  topTracksArr = topTracksArr.map((track) => track.id);
  let idsQuery = topTracksArr.join(",");
  return axios
    .get("https://api.spotify.com/v1/audio-features?ids=" + idsQuery, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      return res.data;
    });
}

function getTopArtists() {
  return axios
    .get(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0",
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => {
      return res.data;
    });
}

//run build production
/*
const buildpath = path.join(__dirname, "..", "/client/build");
app.use(express.static(buildpath));
app.get("*", (req, res) => {
  res.sendFile(buildpath + "/index.html");
});
*/

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
