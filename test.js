const axios = require("axios");

const getBtcPrice = async () => {
  const bitcoin = await axios.get(
    "https://api.coingecko.com/api/v3/coins/bitcoin"
  );
  delete bitcoin;
  console.log(bitcoin.data.market_data.current_price.usd);
};

getBtcPrice();
