
import React from "react";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import "../assets/css/notfound.css";

const NotFound = () => {
    return (
        <div className="notfound">
            <title>404 - Page Not Found</title>
            <div className="notfound-content">
                <div className="error-icon">
                    <TbError404 />
                </div>
                <h1>Oops! Page Not Found</h1>
                <p>
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <Link to="/" className="btn">
                    Back to Home
                </Link>
            </div>

        </div>
    );
};

export default NotFound;
