const {
  initiateDeveloperControlledWalletsClient,
} = require("@circle-fin/developer-controlled-wallets");

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_APIKEY,
  entitySecret: process.env.ENTITY_SECRET,
});

module.exports = circleDeveloperSdk;
