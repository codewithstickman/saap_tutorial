const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { PrivyClient } = require("@privy-io/node");
const circleDeveloperSdk = require("../utils/circleInit");
const { networkMap } = require("../utils/constatnt");
const auth = require("../middleware/auth");
const privy = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET,
);

router.post("/sync-user", async (req, res) => {
  try {
    const { privyToken } = req.body;
    // console.log(privyToken);

    if (!privyToken)
      return res.status(400).json({ message: "Privy token is required" });
    const verifiedClaims = await privy
      .utils()
      .auth()
      .verifyAccessToken(privyToken);
    // console.log(verifiedClaims);
    if (!verifiedClaims)
      return res.status(401).json({ message: "Invalid Privy token" });
    const user = await User.findOne({ privyId: verifiedClaims.user_id });
    if (user) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      const newUser = new User({
        privyId: verifiedClaims.user_id,
      });
      await newUser.save();
      return res.status(201).json({ message: "User synced successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/setup",auth, async (req, res) => {
  try {

    console.log(req.user);
    // return;
    const { username, protocol } = req.body;

    if (!username || !protocol) {
      return res
        .status(400)
        .json({ message: "Username and protocol are required" });
    }
    const blockchain = networkMap[protocol];
    const accountType = "SCA";
    const {
      data: { walletSet },
    } = await circleDeveloperSdk.createWalletSet({ name: username });
    console.log("walletSet", walletSet);
    const walletSetId = walletSet.id;
    const {
      data: { wallets },
    } = await circleDeveloperSdk.createWallets({
      blockchains: [blockchain],
      count: 1,
      walletSetId: walletSetId,
      accountType: accountType,
    });
    console.log("wallets", wallets);
    const { id: walletId, address: walletAddress } = wallets[0];
    console.log(walletId, walletAddress);

    const updatedUser = await User.findOneAndUpdate(
      { privyId: req.user.user_id },
      {
        username,
        protocol,
        walletId,
        walletSetId,
        walletAddress,
      },
      { new: true }
    );
    console.log("updatedUser", updatedUser);

    return res.status(200).json({ message: "Setup completed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
