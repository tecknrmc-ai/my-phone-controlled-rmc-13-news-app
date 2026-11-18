# RMC13 Live Daily News Feed

Edit `daily_news.json` on GitHub, commit, then pull-to-refresh in the News tab.

## Live HTTPS URL

https://raw.githubusercontent.com/tecknrmc-ai/my-phone-controlled-rmc-13-news-app/main/RemoteNews/daily_news.json

## Update any news tab

Set `category` (and optional `tabs`) to one of:

- All
- Teckn
- Movies
- TV
- Music
- Culture
- India
- Gaming
- AI
- SpaceX
- RMC13
- LOG
- InlandEmpire Artist
- 4KNM

Use `"showOnAll": true` or include `"All"` in `tabs` to also show the card on the All tab.

Optional fields: `article`, `kicker`, `byline`, `readTime`, `imageName` (asset catalog), `imageURL` (HTTPS), `appLink`, `isHero`, `isFeatured`.
