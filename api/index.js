require('dotenv').config();
const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');

// Add the token you receive from @BotFather below.
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN);

// Add the chatId of the channel you want to post to below (the bot must be added to the channel).
const chatId = process.env.TELEGRAM_CHAT_ID;

// The keywords to search for in new posts, replace with your own.
const keywords = [
  'wowow',
  'stated preference',
  'revealed preference',
];

// The timespan to check for in minutes. This should match your cron job schedule.
const checkEveryMin = 30;

module.exports = async (req, res) => {
  const timespan = Date.now() - checkEveryMin * 60 * 1000;
  const sentPosts = new Set();

  console.log(chatId);

  for (const keyword of keywords) {
    const site = `https://searchcaster.xyz/api/search?text=${keyword}`;
    const response = await fetch(site);
    const data = await response.json();

    const recentPosts = data.casts.filter(post => {
      const postDate = post.body.publishedAt;
      return postDate > timespan;
    });

    const output = recentPosts.map(post => ({
      displayname: post.meta.displayName,
      username: post.body.username,
      text: post.body.data.text,
      keyword: keyword,
      link: `https://warpcast.com/${post.body.username}/${post.merkleRoot.slice(0, 10)}`,
    }));

    console.log(output);

    for (const post of output) {
      if (!sentPosts.has(post.link)) {
        bot.sendMessage(
          chatId,
          `<b>${post.displayname}</b> · ${post.username} · <i>#${post.keyword}</i>\n\n${post.text}\n\n${post.link}`,
          { 
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }
        );
        sentPosts.add(post.link);
      }
    }
  }

  const response = {
    status: 200,
    message: JSON.stringify('Bot run completed.'),
  };

  res.send(response);
};
