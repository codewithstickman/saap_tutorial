import React, { useState, useEffect } from "react";
import "../assets/css/setup.css";
import { AtSign, BadgeCheck, Circle, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArcLogo from "../assets/images/arc.svg";
import {
  useSaapStore,
  setupUserSelector,
  getLoadingSelector,
} from "../store/saapStore";

function Setup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [stage, setStage] = useState(0);

  const isAvailable = username.trim().length > 0;
  const charCount = username.length;

  //
  const setupUser = useSaapStore(setupUserSelector);
  const loading = useSaapStore(getLoadingSelector);

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
      name: "arc",
      logo: ArcLogo,
    },
    {
      name: "monad",
      logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/monad/info/logo.png",
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

  const [protocolsSelected, setProtocolsSelected] = useState(null);

  const selectProtocolsFunc = (txt) => {
    console.log(txt, "txt");

    setProtocolsSelected((prev) => (prev === txt ? null : txt));
  };

  const MAX_LENGTH = 20;
  const handleSubmit = () => {
    if (username.trim()) setStage(1);
  };

  const proceed = () => {
    if (protocolsSelected.length > 0 && username.trim() !== "") {
      console.log("Proceeding with setup...");
      console.log(protocolsSelected, username);
      setupUser({ username, protocol: protocolsSelected });
      //   navigate("/dashboard");
    }
  };

  return (
    <div className="setup_section">
      {/* <h1>Onboarding</h1> */}
      <div className="child">
        {stage == 0 ? (
          <div className="usu-card">
            {/* Header */}
            <div className="usu-header">
              <h2 className="usu-title">Choose your unique username</h2>
              <p className="usu-subtitle">
                This is how friends will find you on the platform.
              </p>
            </div>

            {/* Form */}
            <div className="usu-form">
              <div className="usu-field">
                <label className="usu-label" htmlFor="username">
                  Username
                </label>
                <div className="usu-input-wrap">
                  <AtSign className="usu-at" />
                  <input
                    id="username"
                    className="usu-input"
                    type="text"
                    placeholder="alex_design"
                    value={username}
                    maxLength={MAX_LENGTH}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {isAvailable && <BadgeCheck className="usu-check-icon" />}
                </div>
                <div className="usu-meta">
                  <span className="usu-counter">
                    {charCount} / {MAX_LENGTH}
                  </span>
                </div>
              </div>

              <button
                className="usu-btn"
                onClick={handleSubmit}
                disabled={!username.trim()}
                type="button"
              >
                Finish Setup
              </button>
            </div>
          </div>
        ) : (
          <div className="usu-selectBox">
            <h1 className="usu-title">Welcome {username}</h1>
            <p className="usu-subtitle">Choose 3 protocols to support</p>
            <div className="usu-protocol-row">
              {protocols.map((protocol) => (
                <div
                  key={protocol.name}
                  // className="usu-protocol-card"
                  className={
                    protocolsSelected === protocol.name
                      ? "usu-protocol-card active"
                      : "usu-protocol-card"
                  }
                  onClick={() => selectProtocolsFunc(protocol.name)}
                >
                  <BadgeCheck className="icon" />
                  <img src={protocol.logo} alt={protocol.name} />
                  <p>{protocol.name}</p>
                </div>
              ))}
            </div>

            <button
              className="usu-btn"
              onClick={proceed}
              disabled={!protocolsSelected}
              type="button"
            >
              Confirm Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Setup;
