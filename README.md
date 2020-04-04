<p align='center'>
  <img src="https://github.com/jacc/music-box/blob/master/branding/musicbox-preview.png">
  <h3 align="center">movie-box</h3>
  <p align="center">Update a gist to contain your recently watched movies from trakt.tv</p>
</p>

---
> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## ✨ Inspiration
This code was heavily inspired by [@jacc's music-box](https://github.com/jacc/music-box).

## 🎒 Prep Work
1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)
1. Create a Trakt.tv Application (https://trakt.tv/oauth/applications/new)
1. Copy the `API token`

## 🖥 Project Setup
1. Fork this repo
2. Go to your fork's `Settings` > `Secrets` > `Add a new secret` for each environment secret (below)

## 🤫 Environment Secrets
- **GIST_ID:** The ID portion from your gist url `https://gist.github.com/<github username>/`**`<gist ID>`**.
- **GH_TOKEN:** The GitHub token generated above.
- **TRAKT_ID:** The Client ID you got from creating a Trakt.tv app.
- **TRAKT_USERNAME:** Your Last.fm username.
