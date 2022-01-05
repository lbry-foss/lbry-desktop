<img width="40%" src="https://miro.medium.com/max/5198/1*bTVuL2THG_0mpwmE-n7Ezg.png" />

# LBRY App - Community Edition

This repo contains the UI code that powers the official LBRY desktop app. The LBRY app is a graphical browser for the decentralized content marketplace provided by the
[LBRY](https://lbry.com) protocol. It is essentially the
[lbry daemon](https://github.com/lbryio/lbry) bundled with a UI using
[Electron](https://electron.atom.io/).

## Community Edition

This is the **Community Edition** (CE) of the LBRY desktop app. This LBRY CE version includes *additional improvements* and *changes*, including but not limited by:

* Adding **Rewards** feature back;
* **Disable Matomo Analytics**, meaning **no telemetry / tracking**;
* Adding **Referral** feature back;
* Adding **Sync YouTube Channel** menu item back;
* Enable **file reactions**
* Enable **creator reactions**
* Enable no source claims

**The LBRY Community Edition binaries are licensed under the [MIT license](https://github.com/lbry-foss/lbry-desktop/blob/master/LICENSE). With additional features. Telemetry is disabled.**

 <a href="https://github.com/lbry-foss/lbry-desktop/blob/master/LICENSE" title="MIT licensed">
   <img alt="npm" src="https://img.shields.io/dub/l/vibe-d.svg?style=flat">
 </a>
 <a href="https://GitHub.com/lbry-foss/lbry-desktop/releases/" title="GitHub release">
   <img src="https://img.shields.io/github/release/lbry-foss/lbry-desktop.svg"/>
 </a>
 <a href="https://github.com/lbry-foss/lbry-desktop/actions/workflows/deploy.yml?query=branch%3Afoss">
   <img src="https://github.com/lbry-foss/lbry-desktop/actions/workflows/deploy.yml/badge.svg?branch=foss" alt="Build Status"  />
 </a>
 <a href="https://chat.lbry.com">
   <img alt="GitHub contributors" src="https://img.shields.io/discord/362322208485277697.svg?logo=discord" alt="chat on Discord">
 </a>

<h2>
  <a href="https://forthebadge.com" title="forthebadge">
    <img alt="forthebadge" src="https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg">
  </a>
  <a href="https://forthebadge.com" title="forthebadge">
    <img alt="forthebadge" src="https://forthebadge.com/images/badges/approved-by-veridian-dynamics.svg">
  </a>
</h2>

![App GIF](https://spee.ch/ba/lbry-joule.gif)

## Table of Contents

1. [Install](#install)
2. [Usage](#usage)
3. [Running from Source](#running-from-source)
4. [Contributing](#contributing)
5. [License](#license)
6. [Security](#security)
7. [Contact](#contact)

## Install

[![Windows](https://img.shields.io/badge/Windows-Install-blue)](https://github.com/lbry-foss/lbry-desktop/releases/latest)
[![Linux](https://img.shields.io/badge/Linux-Install-blue)](https://github.com/lbry-foss/lbry-desktop/releases/latest)
[![MacOS](https://img.shields.io/badge/MacOS-Install-blue)](https://github.com/lbry-foss/lbry-desktop/releases/latest)

We provide installers for Windows, macOS (v10.12.4, Sierra, or greater), and Debian-based Linux. See community maintained builds section for alternative Linux installations.

Download **Community Edition** from: 

* [Our releases page](https://github.com/lbry-foss/lbry-desktop/releases)

_Note: If the deb fails to install using the Ubuntu Software Center, install manually via `sudo dpkg -i <path to deb>`. You'll need to run `sudo apt-get install -f` if this is the first time installing it to install dependencies_

To install from source or make changes to the application, continue to the next section below.

**Community maintained** builds for Arch Linux and Flatpak are available, see below. These installs will need to be updated manually as the in-app update process only supports Debian installs at this time.
_Note: If coming from a deb install, the directory structure is different and you'll need to [migrate data](https://lbry.com/faq/backup-data)._

*TODO*

## Usage

Double click the installed application to interact with the LBRY network.

## Running from Source

You can run the web version (lbry.tv), the electron app, or both at the same time.

#### Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) (v14 required)
- [Yarn](https://yarnpkg.com/en/docs/install)

1. Clone (or [fork](https://help.github.com/articles/fork-a-repo/)) this repository: `git clone https://github.com/lbry-foss/lbry-desktop`
2. Change directory into the cloned repository: `cd lbry-desktop`
3. Install the dependencies: `yarn`

#### Run the electron app

`yarn dev`

- If you want to build and launch the production app you can run `yarn build`. This will give you an executable inside the `/dist` folder. We use [electron-builder](https://github.com/electron-userland/electron-builder) to create distributable packages.

#### Resetting your Packages

If the app isn't building, or `yarn xxx` commands aren't working you may need to just reset your `node_modules`. To do so you can run: `rm -r node_modules && yarn` or `del /s /q node_modules && yarn` on Windows.

If you _really_ think something might have gone wrong, you can force your repo to clear everything that doesn't match the repo with `git reset --hard HEAD && git clean -fxd && git pull -r`

## Contributing

We :heart: contributions from everyone and contributions to this project are encouraged, and compensated. We welcome [bug reports](https://github.com/lbry-foss/lbry-desktop/issues/), [bug fixes](https://github.com/lbry-foss/lbry-desktop/pulls) and feedback is always appreciated. For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/lbry-foss/lbry-desktop/issues) [![GitHub contributors](https://img.shields.io/github/contributors/lbry-foss/lbry-desktop.svg)](https://GitHub.com/lbry-foss/lbry-desktop/graphs/contributors/)

## License

This project is MIT licensed. For the full license, see [LICENSE](LICENSE).

## Security

We take security seriously. Please contact security@lbry.com regarding any security issues. Our PGP key is [here](https://lbry.com/faq/pgp-key) if you need it. Previous versions up to v0.50.2 were signed by [Sean Yesmunt](https://keybase.io/seanyesmunt/key.asc).
New Releases are signed by [Jessop Breth](https://keybase.io/jessopb/key.asc).

## Contact

The primary contact for this project is [@danger89](https://github.com/danger89).
