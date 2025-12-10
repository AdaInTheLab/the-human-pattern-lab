import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <div className="notfound-wrapper">
            <div className="notfound-card">
                <img
                    src="/public/assets/labteam/carmel.png"
                    alt="Carmel confused"
                    className="notfound-carmel"
                />

                <h1 className="notfound-title">Uh-oh… wrong hallway.</h1>

                <p className="notfound-text">
                    Carmel checked the Lab’s floor plan and… this page doesn’t exist.<br />
                    Pretty sure you just slipped into a side dimension. Happens to the best of us.
                </p>

                <Link className="notfound-button" to="/">
                    🔙 Back to Safety
                </Link>
            </div>
        </div>
    );
}
