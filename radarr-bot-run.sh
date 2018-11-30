docker stop telegram-radarr-bot
docker rm telegram-radarr-bot
docker build . --tag telegram-radarr-bot
docker create \
--name=telegram-radarr-bot \
-v /opt/telegram-radarr-bot-data:/config \
--restart unless-stopped \
telegram-radarr-bot
docker start telegram-radarr-bot
