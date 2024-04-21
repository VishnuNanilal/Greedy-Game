import React, { useState } from 'react'
import Modal from './Modal'
import HighScore from './HighScore'

export default function MenuScreen() {
    const [displayHSModal, setDisplayHSModal] = useState(false)
    const [highScores, setHighScores] = useState([])
    function HandleHighScore() {
        setDisplayHSModal(true)
        let highScoreList = localStorage.getItem('highscore')

        //convert to array from JSON and if not present assign to an empty array.
        highScoreList = highScoreList!=null ? JSON.parse(highScoreList) : []
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
            <Modal openHSModal={() => HandleHighScore()} />
        </div>
    )
}

