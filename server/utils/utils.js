const crypto = require("crypto");
const publicKeyCache = new Map();

async function getCirclePublicKey(keyId) {
    if (publicKeyCache.has(keyId)) {
        return publicKeyCache.get(keyId);
    }

    const response = await fetch(
        `https://api.circle.com/v2/notifications/publicKey/${keyId}`,
        {
            headers: {
                'accept': 'application/json',
                'authorization': `Bearer ${process.env.CIRCLE_APIKEY}`
            }
        }
    );

    const data = await response.json();
    const publicKeyBase64 = data.data.publicKey;
    const publicKeyBytes = Buffer.from(publicKeyBase64, "base64");
    const publicKey = crypto.createPublicKey({
        key: publicKeyBytes,
        format: "der",
        type: "spki",
    });

    publicKeyCache.set(keyId, publicKey);
    return publicKey;
}

// Function to verify Circle signature
function verifyCircleSignature(message, signatureBase64, publicKey) {
    const signatureBytes = Buffer.from(signatureBase64, "base64");
    const messageBytes = Buffer.from(message);

    return crypto.verify(
        "sha256",
        messageBytes,
        publicKey,
        signatureBytes
    );
}

module.exports = {
    getCirclePublicKey,
    verifyCircleSignature
};