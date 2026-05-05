import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {PrivyProvider} from "@privy-io/react-auth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrivyProvider appId={import.meta.env.VITE_APP_PRIVY_APP_ID}>
      <App />
    </PrivyProvider>
  </StrictMode>,
);
