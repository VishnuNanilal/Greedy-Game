import React from "react";

export default function ExitButton({ action }) {
    return (
        <div className="highscore-close-btn-cont">
            <button className="close-btn" onClick={action}>X</button>
        </div>
    )
}