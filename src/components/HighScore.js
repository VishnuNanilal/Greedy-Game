import React from "react"
import ExitButton from "./ExitButton"

export default function HighScore({ highscoreList, closeHSModal }) {
    console.log(highscoreList)
    let highScoreElem = highscoreList.map((elem, index) => {
        return <HighScoreItem id={index} highscore={elem.highscore} date={elem.date} />
    })

    return (
        <div className="highscore">
            <ExitButton action={closeHSModal} />
            <div className="table-cont">
                <table>
                    <thead>
                        <th>No.</th>
                        <th>Score</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {
                            highScoreElem
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function HighScoreItem({ id, highscore, date }) {
    return (
        <tr>
            {/* <div style={{width: '200px', display: 'flex', justifyContent: 'space-between'}}>
                <div className="highscore-index" style={{alignSelf:'center', color: 'white'}}>{id+1}</div>
                <div className="highscore-score" style={{alignSelf: 'center'}}>{highscore}</div>
            </div> */}
            <td className="highscore-index" style={{ color: 'white' }}>{id + 1}</td>
            <td className="highscore-score">{highscore}</td>
            <td className="highscore-date" style={{ color: 'white' }}>{date}</td>
        </tr>
    )
}