require("dotenv").config({ path: __dirname + "/.env" });
const { App } = require("@slack/bolt");
const axios = require("axios");
const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.BOT_TOKEN,
});
app.message(":wave:", async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
});

app.command("/bitcoin", async ({ ack, respond }) => {
  const bitcoin = await axios.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin"
  );
  const price = bitcoin.data.market_data.current_price.usd;
  await ack();
  await respond("Hello :smiley: Bitcoin is now at " + price + "$");
});
// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      // The token you used to initialize your app
      token: process.env.BOT_TOKEN,
    });

    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;

        // Print result
        console.log("Found conversation ID: " + conversationId);
        // Break from for loop
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Find conversation with a specified channel `name`
findConversation("testing-bots");

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
