Forked from onedr0p, working to port to Radarr for movie support. Will hopefully add support for use in a group chat. 

# telegram-radarr-bot

Bot which lets you or others add series to [Radarr](https://radarr.video/) via the messaging service [Telegram](https://telegram.org/).

Contact [@BotFather](http://telegram.me/BotFather) on Telegram to create and get a bot token.

Getting Started
---------------

## Prerequisites
- [Node.js](http://nodejs.org) v4.2.x
- [Git](https://git-scm.com/downloads) (optional)

## Installation

```bash
# Clone the repository
git clone https://github.com/eamondo2/telegram-radarr-bot
```

```bash
# Install dependencies
cd telegram-radarr-bot
npm install
```

```bash
# Copy acl.json.template to acl.json
cp acl.json.template acl.json
```

```bash
# Copy config.json.template to config.json
cp config.json.template config.json
```

In `config.json` fill in the values below:

Telegram:
- **botToken** your Telegram Bot token

Bot:
- **password** the password to access the bot
- **owner** your Telegram user ID. (you can fill this in later)
- **notifyId** Telegram ID used for notifications. (optional; you can fill this in later)

Radarr:
- **hostname**: hostname where Radarr runs (required)
- **apiKey**: Your API to access Radarr (required)
- **port**: port number Radarr is listening on (optional, default: 7878)
- **urlBase**: URL Base of Radarr (optional, default: empty)
- **ssl**: Set to true if you are connecting via SSL (default: false)
- **username**: HTTP Auth username (default: empty)
- **password**: HTTP Auth password (default: empty)

**Important note**: Restart the bot after making any changes to the `config.json` file.

```bash
# Start the bot
node radarr.js
```

## Usage (commands)

### First use
Send the bot the `/auth` command with the password you created in `config.json`

### Adding a Movie

Send the bot a message with the movie name

`/q men in`

The bot will reply with

```
Found 15 movies 
➸ Men in Black - 1997
➸ Men in Black II - 2002
➸ Men in Black 3 - 2012
➸ Robin Hood: Men in Tights - 1993
➸ Men in War - 1957
➸ First Men in the Moon - 1964
➸ Men in the City - 2013
➸ Two Men in Town - 2014
➸ In the Company of Men - 1997
➸ Men in White - 1998
➸ Men in the City 2 - 2015
➸ Last Men in Aleppo - 2017
➸ Men in the Nude - 2006
➸ Men Suddenly in Black 2 - 2006
➸ Men in Red Suits - 2007
```

Use the custom keyboard to select the movie.

![Step One](https://raw.githubusercontent.com/eamondo2/telegram-radarr-bot/master/examples/step_1.png)

The bot will then ask if this is the correct movie

```
Men in Black (1997)

Men in Black follows the exploits of agents Kay and Jay, members of a top-secret organization established to monitor and police alien activity on Earth. The two Men in Black find themselves in the middle of the deadly plot by an intergalactic terrorist who has arrived on Earth to assassinate two ambassadors from opposing galaxies. In order to prevent worlds from colliding, the MiB must track down the terrorist and prevent the destruction of Earth. It's just another typical day for the Men in Black.

Is this movie correct?
➸ Yes
➸ No

```
![Step Two](https://raw.githubusercontent.com/eamondo2/telegram-radarr-bot/master/examples/step_2.png)


The bot will ask you for the quality

```
Found 6 profiles
➸ Any
➸ SD
➸ HD-720p
➸ HD-1080p
➸ Ultra-HD
➸ HD - 720p/1080p

```

Send the profile using the custom keyboard

![Step Three](https://raw.githubusercontent.com/eamondo2/telegram-radarr-bot/master/examples/step_3.png)

The bot will ask you where the path you want the movie to go

```
Found 1 folders
➸ /mnt/storage/PMData/Film/
```

Send the folder using the custom keyboard

![Step Four](https://raw.githubusercontent.com/eamondo2/telegram-radarr-bot/master/examples/step_4.png)



If everything goes well, you'll see a text from the bot saying the movie was added.

![Step Five](https://raw.githubusercontent.com/eamondo2/telegram-radarr-bot/master/examples/step_5.png)


### Notifications - Not ported yet
Radarr can be setup to send notifications to a user or a group chat when new content is added.  

* In Radarr go to `Settings` > `Connect` > `+` > `Custom Script`
* In the Name field enter `Telegram`
* In the Path field enter the full path to your node.js installation i.e. `C:\Program Files\nodejs\node.exe`
* In the Arguments field enter the full path to `radarr_notify.js` i.e `C:\bots\telegram-radarr-bot\radarr_notify.js`
* Start the bot by running `node radarr.js`
* Open a new chat or group chat with the bot and type `/cid` 
* Note the Chat ID
* Open `config.json` and enter the Chat ID next to `notifyId`
* Restart the bot
* The specified chat will now begin receiving notifications for newly added content


### Additional commands
* `/upcoming` shows upcoming movies, has a day parameter, defaults to 3 days
* `/library` search Radarr library for existing movies
* `/help` show available commands
* `/clear` clear all previous commands and cache

### Admin commands
* `/wanted` search all missing/wanted movies
* `/rss` perform an RSS Sync
* `/refresh` refreshes all movies
* `/users` list users
* `/revoke` revoke user from bot
* `/unrevoke` un-revoke user from bot
* `/cid` gets current chat id

## Docker
Alternatively you may use Docker to start the bot
```
docker run --name telegram-radarr-bot \
  -e TELEGRAM_BOTTOKEN=
  -e BOT_PASSWORD=
  -e BOT_OWNER=
  -e BOT_NOTIFYID=
  -e BOT_MAXRESULTS=
  -e RADARR_HOST=
  -e RADARR_APIKEY=
  -e RADARR_PORT=
  -e RADARR_URLBASE=
  -e RADARR_SSL=
  -e RADARR_USERNAME=
  -e RADARR_PASSWORD=
  telegram-radarr-bot
```



## License
(The MIT License)

Copyright (c) 2015 Devin Buhl <devin.kray@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
