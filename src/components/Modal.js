import React from "react";
import { useNavigate } from "react-router-dom";
export default function Modal({openHSModal}) {
    const navigate = useNavigate()

    function handleNewGameBtn() {
        navigate('/game-screen')
    }

    return (
        <div className="modal">
            <div className="game-title">
                GREEDY
            </div>
            <div className="modal-btn">
                <button onClick={handleNewGameBtn}>
                    NEW GAME
                </button>
                <button onClick={openHSModal}>
                    HIGHSCORE
                </button>
            </div>
        </div>
    )
}