<p align='center'>
  <img src="https://github.com/LuisAlejandro/movie-box/blob/develop/branding/moviebox-preview.png">
  <h3 align="center">Movie Box</h3>
  <p align="center">Update a gist to contain your recently watched movies from trakt.tv</p>
</p>

---
> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## ✨ Inspiration
This code was heavily inspired by [@jacc's music-box](https://github.com/jacc/music-box).

## 🎒 Prep Work

1. Create a new public GitHub Gist (https://gist.github.com/).
2. Create a token with the `gist` scope and copy it. (https://github.com/settings/tokens/new).
3. Create a Trakt.tv Application and copy the `API token` (https://trakt.tv/oauth/applications/new).

## 🖥 Project Setup

1. Fork this repo.
2. Go to your fork's `Settings` > `Secrets` > `Add a new secret` for each environment secret (below).
3. Activate github workflows on `Actions` > `I understand my workflows, go ahead and run them`.
4. Star your own fork to trigger the initial build. Then the gist will update hourly. You can then go to your profile and pin the gist.

## 🤫 Environment Secrets

Set the following environment secrets on `github.com/<github username>/movie-box` > `Settings` > `Secrets`:

- **GIST_ID:** The ID portion from your gist url `https://gist.github.com/<github username>/`**`<gist ID>`**.
- **GH_TOKEN:** The GitHub token generated above.
- **TRAKT_ID:** The Client ID you got from creating a Trakt.tv app.
- **TRAKT_USERNAME:** Your Trakt.tv username.
- **MOVIE_BOX_MODE:** Select the box mode from three options: `movies`, `shows` and `stats`.

## 🕵🏾 Hacking suggestions

- You can test the script locally with Docker Compose:

  * Install [Docker Community Edition](https://docs.docker.com/install/#supported-platforms) according with your operating system
  * Install [Docker Compose](https://docs.docker.com/compose/install/) according with your operating system.

      - [Linux](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)
      - [Mac](https://docs.docker.com/compose/install/#install-compose-on-macos)
      - [Windows](https://docs.docker.com/compose/install/#install-compose-on-windows-desktop-systems)

  * Install a git client.
  * Clone your fork of the repository into your local computer.
  * Open a terminal and navigate to the newly created folder.
  * Change to the `develop` branch.

          git checkout develop

  * Create a `.env` file with the content of the environment secrets as variables, like this (with real values):

          GIST_ID=xxxx
          GH_TOKEN=xxxx
          TRAKT_ID=xxxx
          TRAKT_USERNAME=xxxx
          MOVIE_BOX_MODE=xxxx

  * Execute the following command to create the docker image (first time only):

          make image

  * Execute the following command to install node dependencies:

          make dependencies

  * You can execute the update script with this command:

          make update

  * Or, alternatively, open a console where you can manually execute the script and debug any errors:

          make console
          node index.js

  * You can stop the docker container with:
  
          make stop

  * Or, destroy it completely:
  
          make destroy
  

## Made with :heart: and :hamburger:

![Banner](https://github.com/LuisAlejandro/movie-box/blob/develop/branding/author-banner.svg)

> Web [luisalejandro.org](http://luisalejandro.org/) · GitHub [@LuisAlejandro](https://github.com/LuisAlejandro) · Twitter [@LuisAlejandro](https://twitter.com/LuisAlejandro)