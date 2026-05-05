import React, { useState, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken, useLogin, usePrivy } from "@privy-io/react-auth";

function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { ready, user, authenticated, logout } = usePrivy();

  // const authenticated = false; // Placeholder for authentication state

  const { login } = useLogin({
    onComplete(user) {
      // console.log("User logged in:", user);
      // console.log(user.isNewUser);
    },
  });

  const syncUserFunc = async () => {
    try {
      const privyToken = await getAccessToken();
      console.log(privyToken);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/sync-user`, {
        privyToken,
      });
      console.log("User synced successfully", response.data);
    } catch (err) {
      console.log("Error getting access token", err);
    }
  };

  useEffect(() => {
    if (authenticated) {
      syncUserFunc();
    }
  }, [authenticated]);

  useEffect(() => {
    if (
      pathname.includes("setup") ||
      pathname.includes("dashboard") ||
      pathname.includes("notfound") ||
      pathname.includes("merchant")
    ) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  return showNav ? (
    <nav className="navbar">
      <Link to="/" className="logo">
        <svg
          className="logo-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 8C24 8 8 7 8 15C8 23 24 17 24 25C24 33 8 32 8 32"
            stroke="#1A3C34"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <circle cx="26" cy="28" r="3" fill="#F2C037" />
        </svg>
      </Link>

      <div className="nav-links">
        <a href="#how">How it Works</a>
        <Link to="#">Features</Link>
        <Link to="#">Testimonials</Link>
        <Link to="#">FAQ</Link>
      </div>

      {authenticated ? (
        <button className="sign-btn" onClick={logout}>
          Disconnect
        </button>
      ) : (
        <button className="sign-btn" onClick={login}>
          Sign Up
        </button>
      )}
    </nav>
  ) : (
    <></>
  );
}

export default Navbar;
