<p align='center'>
  <img src="https://github.com/LuisAlejandro/movie-box/blob/master/branding/moviebox-preview.png">
  <h3 align="center">movie-box</h3>
  <p align="center">Update a gist to contain your recently watched movies from trakt.tv</p>
</p>

---
> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## ✨ Inspiration
This code was heavily inspired by [@jacc's music-box](https://github.com/jacc/music-box).

## 🎒 Prep Work
1. Create a new public GitHub Gist (https://gist.github.com/).
2. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new).
3. Create a Trakt.tv Application (https://trakt.tv/oauth/applications/new).
4. Copy the `API token`.

## 🖥 Project Setup
1. Fork this repo.
2. Go to your fork's `Settings` > `Secrets` > `Add a new secret` for each environment secret (below).
3. Activate github workflows on `Actions` > `I understand my workflows, go ahead and run them`.
4. The workflow will run every hour to update your gist info, if you dont want to wait an hour, you can star your repository fork and this will trigger a workflow build. You can then go to your profile and pin the gist.

## 🤫 Environment Secrets
- **GIST_ID:** The ID portion from your gist url `https://gist.github.com/<github username>/`**`<gist ID>`**.
- **GH_TOKEN:** The GitHub token generated above.
- **TRAKT_ID:** The Client ID you got from creating a Trakt.tv app.
- **TRAKT_USERNAME:** Your Last.fm username.
- **MOVIE_BOX_MODE:** Select the box mode from three options: `movies`, `shows` and `stats`.

## 🕵🏾 Hacking suggestions

- You can set up CI on Travis if you want to modify this Github Action. You just have to configure the environment secrets as environment variables on Travis. A build will be triggered on every push for the `develop` branch. Careful, your gist WILL be updated.
- You can also test the script locally with Lando and Docker:

  * Install [Docker Community Edition](https://docs.docker.com/install/#supported-platforms) according with your operating system
  * Install [Lando](https://docs.devwithlando.io/installation/system-requirements.html) according with your operating system.

      - [Linux](https://docs.devwithlando.io/installation/linux.html)
      - [Mac](https://docs.devwithlando.io/installation/macos.html)
      - [Windows](https://docs.devwithlando.io/installation/windows.html)

  * Install a git client.
  * Clone your fork of the repository.
  * Open a terminal and navigate to the newly created folder.
  * Change to the `develop` branch.

          git branch develop

  * Create a `.env` file with the content of the environment secrets as variables, like this (with real values):

          GIST_ID=xxxx
          GH_TOKEN=xxxx
          TRAKT_ID=xxxx
          TRAKT_USERNAME=xxxx
          MOVIE_BOX_MODE=xxxx

  * Execute the following command to create the docker image (first time only):

          make image

  * Execute the following command to start the project:

          make start

  * Execute the following command to stop the project (you can also hit ctrl+C):

          make stop