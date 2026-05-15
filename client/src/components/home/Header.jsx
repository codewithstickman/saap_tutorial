import React from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { getAccessToken, useLogin, usePrivy } from "@privy-io/react-auth";
import {
  useSaapStore,
  syncUserSelector,
  getLoadingSelector,
} from "../../store/saapStore";

function Header() {
    // const authenticated = false; // Placeholder for authentication state
  const navigate = useNavigate();

  const {ready, user, authenticated, logout} = usePrivy();

    const syncUser = useSaapStore(syncUserSelector);
    const loading = useSaapStore(getLoadingSelector);

  const { login } = useLogin({
     onComplete(user) {
       if (user.isNewUser) {
         syncUserFunc();
         navigate("/setup");
       }
     },
   });

        const syncUserFunc = async () => {
      try {
        const privyToken = await getAccessToken();
        console.log(privyToken);
        await syncUser(privyToken);
      } catch (err) {
        console.log("Error getting access token", err);
      }
    };


    return (
        <header className="hero">
            <div className="trusted-pill">
                <div className="avatar-group">
                    <img className="avatar" src="https://i.pravatar.cc/100?img=11" alt="User" />
                    <img className="avatar" src="https://i.pravatar.cc/100?img=12" alt="User" />
                    <img className="avatar" src="https://i.pravatar.cc/100?img=13" alt="User" />
                    <img className="avatar" src="https://i.pravatar.cc/100?img=14" alt="User" />
                </div>
                <span className="trusted-text">Trusted by Local Businesses</span>
            </div>

            <h1 className="hero-title">
                One Tap. One Gateway.<br />
                <span className="text-yellow">One Seamless Flow</span>
            </h1>

            <p className="hero-subtitle">
                Saap connects businesses, customers, and global markets<br />
                for lightning-fast digital payments.
            </p>

            {authenticated ? (
                <Link to="/dashboard" className="get-started-btn" >
                    Get Started
                </Link>
            ) : (

                <button className="get-started-btn">
                    Create account
                </button>
            )}


            <svg className="floating-crown" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 19L5 7l5 5 2-7 2 7 5-5 3 12H2z" />
                <circle cx="2" cy="19" r="1" fill="#000" />
                <circle cx="5" cy="7" r="1" fill="#000" />
                <circle cx="12" cy="5" r="1" fill="#000" />
                <circle cx="19" cy="7" r="1" fill="#000" />
                <circle cx="22" cy="19" r="1" fill="#000" />
            </svg>

            <div className="phone-container">
                <div className="phone-mockup">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                        <div className="phone-header">
                            <span>9:41</span>
                            <div className="phone-status">
                                <svg width="40" height="12" viewBox="0 0 40 12" fill="currentColor">
                                    <rect x="0" y="2" width="10" height="8" rx="1" />
                                    <rect x="12" y="0" width="10" height="10" rx="1" />
                                    <rect x="24" y="2" width="16" height="8" rx="2" />
                                </svg>
                            </div>
                        </div>
                        <div className="map-placeholder">
                        </div>
                    </div>
                </div>

                <div className="phone-mockup partial">
                    <div className="phone-notch"></div>
                    <div className="phone-screen">
                        <div className="phone-header">
                            <span>9:41</span>
                        </div>
                        <div className="map-placeholder" style={{ backgroundColor: '#E5F3E7' }}>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header