import React from "react";

export default function Modal({ toggleModal, startNewGame, openHSModal}) {
    
    function handleModal() {
        toggleModal()
        startNewGame()
    }

    return (

        <div className="modal">
            <div className="game-title">
                GREEDY
            </div>
            <div className="modal-btn">
                <button onClick={handleModal}>
                    NEW GAME
                </button>
                <button onClick={openHSModal}>
                    HIGHSCORE
                </button>
            </div>
        </div>
    )
}