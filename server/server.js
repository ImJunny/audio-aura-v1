const express = require("express");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
//let authCode;
//let token; //shouldnt be global
//let tokenRef; //unused; will use as refresh token
//let term = "";

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
  let authCode = req.body.code;
  let term = req.body.term;
  let token = req.body.token;
  console.log(token);

  if (token === undefined) {
    token = await setTokens(token, authCode);
  }

  if (token === undefined) {
    res.json("no token");
    return;
  }

  let topTracks = await getTopTracks(token, term);
  if (topTracks.items.length < 5) {
    res.json("not enough tracks");
    return;
  }

  let audioFeatures = await getAudioFeatures(token, topTracks.items);
  let topArtists = await getTopArtists(token, term);
  let data = { topTracks, audioFeatures, topArtists, token };
  res.json(data);
});

function setTokens(token, authCode) {
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
      return res.data.access_token;
      //tokenRef = res.data.refresh_token;
    })
    .catch(() => {
      return undefined;
    });
}

function getTopTracks(token, term) {
  return axios
    .get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${term}_term&limit=50&offset=0`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => {
      return res.data;
    });
}

function getAudioFeatures(token, topTracksArr) {
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

function getTopArtists(token, term) {
  return axios
    .get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${term}_term&limit=50&offset=0`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => {
      return res.data;
    });
}

const buildpath = path.join(__dirname, "..", "/client/build");
app.use(express.static(buildpath));
app.get("*", (req, res) => {
  res.sendFile(buildpath + "/index.html");
});

app.listen(PORT, () => {
  console.log("server is live");
});
