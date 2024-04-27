import React, { useState } from 'react'
import HighScore from '../components/HighScore'
import { useNavigate } from 'react-router-dom'

export default function MenuScreen() {
    const [displayHSModal, setDisplayHSModal] = useState(false)
    const [highScores, setHighScores] = useState([])
    const navigate = useNavigate()

    function HandleHighScore() {
        setDisplayHSModal(true)
        let highScoreList = localStorage.getItem('highscore')

        //convert to array from JSON and if not present assign to an empty array.
        highScoreList = highScoreList != null ? JSON.parse(highScoreList) : []
        highScoreList = highScoreList.sort((x, y) => (y.highscore - x.highscore))
        if (highScoreList.length > 10) {
            highScoreList.pop()
        }

        localStorage.setItem('highscore', JSON.stringify(highScoreList))
        setHighScores(() => highScoreList)
    }

    return (
        <div className='center-cont'>
            {displayHSModal && <HighScore highscoreList={highScores} closeHSModal={() => setDisplayHSModal(false)} />}
            <div className="modal">
                <div className="game-title">
                    GREEDY
                </div>
                <div className="modal-btn">
                    <button onClick={() => navigate('/game-screen')}>
                        NEW GAME
                    </button>
                    <button onClick={HandleHighScore}>
                        HIGHSCORE
                    </button>
                </div>
            </div>
        </div>
    )
}

