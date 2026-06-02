const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const { PrivyClient } = require("@privy-io/node");
const circleDeveloperSdk = require("../utils/circleInit");
const { networkMap, networkMapReverse } = require("../utils/constatnt");
const auth = require("../middleware/auth");
const { getCirclePublicKey, verifyCircleSignature } = require("../utils/utils");
const privy = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET,
);

router.post("/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-circle-signature"];
    const keyId = req.headers["x-circle-key-id"];

    if (!signature || !keyId) {
      console.warn("❌ Missing signature headers");
      return res
        .status(400)
        .json({ success: false, message: "Missing signature" });
    }

    // Get the raw body as properly formatted JSON string
    const rawBody = JSON.stringify(req.body);

    // Fetch and verify with public key
    const publicKey = await getCirclePublicKey(keyId);
    const isValid = verifyCircleSignature(rawBody, signature, publicKey);

    if (!isValid) {
      console.warn("❌ Invalid signature");
      return res
        .status(401)
        .json({ success: false, message: "Invalid signature" });
    }
    console.log("passed verificaion");
    const { notificationType, notification } = req.body;
    console.log(notificationType, notification);
    if (notificationType === "transactions.inbound") {
      const walletId = notification.walletId;
      const tokenId = notification.tokenId;
      const amount =
        notification.amounts.length > 0 ? Number(notification.amounts?.[0]) : 0;
      const txHash = notification.txHash;
      const chain = networkMapReverse[notification.blockchain];
      const walletAddress = notification.sourceAddress;

      const user = await User.findOne({ walletId: walletId });

      const transactionModel = new Transaction({
        privyId: user.privyId,
        walletId: walletId,
        amount: amount,
        tokenId: tokenId,
        chain: chain,
        transactionType: notification.transactionType,
        address: walletAddress,
        txHash: txHash,
      });
      await transactionModel.save();

      await User.findOneAndUpdate(
        { walletId: walletId },
        { $inc: { balance: amount } },
        { new: true },
      );
    }

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/tx", auth, async (req, res) => {
  try {
    const tx = await Transaction.find({ privyId: req.user.user_id }).sort({
      createdAt: -1,
    });
    if (!tx) {
      res.status(400).json({ message: "No tx found for this user" });
    }
    res.status(200).json({ message: tx });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }).select(
      "-walletId -walletSetId -privyId",
    );
    if (!user) {
      res.status(400).json({ message: "No user found" });
    }
    res.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
