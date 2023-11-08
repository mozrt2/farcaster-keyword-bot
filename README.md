# Farcaster Keyword Bot

This Telegram bot sends notifications about recent [Farcaster](https://www.farcaster.xyz/) posts based on a set of keywords. It is built on top of the fantastic [Searchcaster API](https://searchcaster.xyz/docs).

## Setup

a. Clone this repository.

```bash
git clone <repository-url>
```


b. Navigate to the project directory.

```bash
cd farcaster-keyword-bot
```


c. Install the required dependencies.

```bash
yarn install
```


d. Create a `.env` file in the root directory of the project and add your Telegram Bot API token and Telegram Channel ID.

```env
TELEGRAM_API_TOKEN=your-telegram-bot-api-token
TELEGRAM_CHAT_ID=your-telegram-channel-id
```

To get the Telegram Bot API token, create a new bot on Telegram using @BotFather. [This guide](https://github.com/hosein2398/node-telegram-bot-api-tutorial#Creating+new+bot+with+BotFather) breaks down the step by step process. Make sure to also add the bot to the Telegram channel in which you want to receive the updates.

To get the Telegram Channel ID, open [web.telegram.org](web.telegram.org) on a desktop browser and navigate to the channel. The URL will have the following format `web.telegram.org/a/#TELEGRAM_CHAT_ID`.


e. Replace the `keywords` array in `index.js` with your own keywords.

```javascript
const keywords = [
  'wowow',
  'stated preference',
  'revealed preference',
];
```


f. Adjust the `checkEveryMin` variable in `index.js` to match your cron job schedule.

```javascript
const checkEveryMin = 30;
```

## Testing the Bot

To test the bot, use the following command:

```bash
node local-test.js
```

The bot will now fetch recent posts from Searchcaster based on your keywords and send these posts to your Telegram channel.

## Deploying the Bot

This project was set up and tested with (Vercel cron jobs)[https://vercel.com/docs/cron-jobs]. It should seamlessly work with other platforms.

## License

This project is open source and licensed under the MIT License.