import React, { useEffect, useState } from "react";
import "../assets/css/merchantpay.css";
import {
  BadgeCheck,
  DollarSign,
  Copy,
  CheckCircle,
  CheckCheck,
  Mail,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function MerchantPay() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState({
    name: "base",
    logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
  });
  const [copied, setCopied] = useState(false);

  const [protocols, setProtocols] = useState([
    {
      name: "base",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png",
    },
    {
      name: "ethereum",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
    },
    {
      name: "polygon",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png",
    },
    {
      name: "solana",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
    },
    {
      name: "tron",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png",
    },
    {
      name: "bsc",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png",
    },
    {
      name: "avalanche",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/avalanchec/info/logo.png",
    },
    {
      name: "arbitrum",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png",
    },
    {
      name: "optimism",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png",
    },
  ]);

  useEffect(() => {
    setProtocols(protocols.filter((p) => p.name === "base")); //hand coding the selection
  }, []);

  const fullMockAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAmountSubmit = () => {
    if (Number(amount) > 0) setStage(1);
  };

  const handleProtocolSubmit = () => {
    if (selectedProtocol) setStage(2);
  };

  const handlePaymentComplete = () => {
    setStage(3);
  };

  return (
    <div className="setup_section">
      <div className="child">
        {/* STAGE 0: Enter Amount */}
        {stage === 0 && (
          <div className="usu-card">
            <div className="usu-header">
              <h2 className="usu-title">Pay @{username}</h2>
              <p className="usu-subtitle">
                Enter the amount in USDC you wish to send.
              </p>
            </div>
            <div className="usu-form">
              <div className="usu-field">
                <label className="usu-label" htmlFor="amount">
                  Amount (USDC)
                </label>
                <div className="usu-input-wrap">
                  <DollarSign className="usu-at" />
                  <input
                    id="amount"
                    className="usu-input"
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="usu-btn"
                onClick={handleAmountSubmit}
                disabled={!amount || Number(amount) <= 0}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STAGE 1: Select Protocol */}
        {stage === 1 && (
          <div className="usu-selectBox">
            <div className="usu-header">
              <h2 className="usu-title">Select Network</h2>
              <p className="usu-subtitle">
                Choose the blockchain to send your USDC on.
              </p>
            </div>
            <div className="usu-protocol-row merchant">
              {protocols.map((protocol) => (
                <div
                  key={protocol.name}
                  className={`usu-protocol-card ${selectedProtocol === protocol.name ? "active" : ""}`}
                  onClick={() => setSelectedProtocol(protocol.name)}
                >
                  {selectedProtocol === protocol.name && (
                    <BadgeCheck className="icon" />
                  )}
                  <img src={protocol.logo} alt={protocol.name} />
                  <p className="merchant-text-capitalize">{protocol.name}</p>
                </div>
              ))}
            </div>
            <button
              className="usu-btn"
              onClick={handleProtocolSubmit}
              disabled={!selectedProtocol}
              type="button"
            >
              Continue
            </button>
          </div>
        )}

        {/* STAGE 2: Display Address & QR */}
        {stage === 2 && (
          <div className="usu-card merchant-card-center">
            <div className="usu-header">
              <h2 className="usu-title">Make Payment</h2>
              <p className="usu-subtitle">
                Send exactly <strong>{amount} USDC</strong> on{" "}
                <strong>
                  <span className="merchant-text-capitalize">
                    {selectedProtocol}
                  </span>
                </strong>{" "}
                to the address below.
              </p>
            </div>

            <div className="merchant-qr-container">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${fullMockAddress}`}
                alt="QR Code"
                className="merchant-qr-img"
              />
            </div>

            <div className="usu-form">
              <div className="usu-field">
                <label className="usu-label merchant-label-left">
                  Wallet Address
                </label>
                <div className="merchant-input-group">
                  <div className="usu-input-wrap merchant-input-wrap">
                    <input
                      className="usu-input merchant-input-padded"
                      type="text"
                      readOnly
                      value={copied ? "Copied" : fullMockAddress}
                    />
                    <Copy onClick={handleCopy} className="merchant-copy-icon" />
                  </div>
                </div>
              </div>
              <button
                className="usu-btn merchant-btn-mt"
                onClick={handlePaymentComplete}
                type="button"
              >
                I have sent the payment
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: Success */}
        {stage === 3 && (
          <div className="usu-card merchant-card-center">
            <div className="merchant-success-icon-container">
              <CheckCheck size={80} color="#2b8055" />
            </div>
            <div className="usu-header">
              <h2 className="usu-title">Payment Processing</h2>
              <p className="usu-subtitle">
                Your payment of <strong>{amount} USDC</strong> to{" "}
                <strong>@{username}</strong> is being processed.
              </p>
            </div>
            <button
              className="usu-btn merchant-btn-mt"
              onClick={() => navigate("/")}
              type="button"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MerchantPay;
