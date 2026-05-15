const { PrivyClient } = require("@privy-io/node");
const privy = new PrivyClient(
  process.env.PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET,
);

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    const verifiedClaims = await privy
      .utils()
      .auth()
      .verifyAccessToken(token);
    if (!verifiedClaims)
      return res.status(401).json({ message: "Invalid Privy token" });
    req.user = verifiedClaims;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "Unauthorized" });
  }
};
