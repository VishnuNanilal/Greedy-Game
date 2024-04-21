import React, { useEffect, useState } from 'react'
import Die from './Die'
import { streak5, streak6, threePairs, comboCount } from '../utils/scoreCalcLogics'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

export default function GameScreen() {
    const [die, setDie] = useState(getNewRoundDieValues())
    const [totalScore, setTotalScore] = useState(0)
    const [roundScore, setRoundScore] = useState(0)

    const [lives, setLives] = useState(3)

    const [stopLeft, setStopLeft] = useState(16)
    const navigate = useNavigate()

    let winScore = 10000

    useEffect(()=>{
        setRoundScore(0)
        setTotalScore(0)
        setLives(3)

        while(!checkPossibleCombo()){
            setDie(getNewRoundDieValues())
        }
    }, [])

    useEffect(() => {
        if (die.every((dice) => dice.isUsed)) {
            setDie(getNewRoundDieValues())
            return
        }

        if (!checkPossibleCombo()) {
            Busted()
        }

    }, [die])

    //lOSE HANDLER
    useEffect(() => {
        if (lives === 0) {
            alert(`Game Ended. Your score is: ${totalScore}`)
            HandleHighScore()
            navigate('/')
        }
    }, [lives])

    //WIN HANDLER
    useEffect(() => {
        if (totalScore >= winScore) {
            alert(`You won with total score of ${totalScore}`)
            HandleHighScore()
            navigate('/')
        }
    }, [totalScore])

    function getRandDiceVal() {
        return Math.ceil(Math.random() * 6)
    }

    function getNewRoundDieValues() {
        let arr = []

        for (let i = 0; i < 6; i++) {
            arr.push({
                value: getRandDiceVal(),
                isHeld: false,
                isUsed: false
            })
        }

        return arr
    }

    function getNewUnusedDieValues() {
        return die.map((die) => {
            if (die.isUsed)
                return die
            else if (die.isHeld)
                return {
                    value: die.value,
                    isHeld: false,
                    isUsed: true
                }
            else
                return {
                    value: getRandDiceVal(),
                    isHeld: false,
                    isUsed: false
                }
        })
    }

    function checkPossibleCombo() {
        let freeDice = []

        for (let i = 0; i < die.length; i++) {
            if (!die[i].isUsed) {
                freeDice.push(die[i].value)
            }
        }

        if (freeDice.includes(1) || freeDice.includes(5))
            return true
        if (streakCheck(freeDice))
            return true
        if (threeCheck(freeDice))
            return true
        return false
    }

    function streakCheck(arr) {
        for (let i = 2; i <= 5; i++) {
            if (!arr.includes(i))
                return false
        }

        return arr.includes(1) || arr.includes(6)
    }

    function threeCheck(arr) {
        let freqArr = [0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < arr.length; i++) {
            freqArr[arr[i]]++
        }

        return freqArr.some((freq) => freq >= 3)
    }

    function toggleHeld(id) {
        if (die[id].isUsed)
            return

        setDie(die.map((die, index) => {
            if (index === id) {
                return {
                    value: die.value,
                    isHeld: !die.isHeld,
                    isUsed: die.isUsed
                }
            }
            else {
                return die
            }
        }))
    }

    function NewRoll() {
        let heldArr = []
        for (let i = 0; i < die.length; i++) {
            if (die[i].isHeld)
                heldArr.push(die[i].value)
        }

        // console.log("Held values : ", heldArr)

        if (heldArr.length === 0) {
            alert('At least select one possible die!')
            return -1
        }

        // calculate roundScore
        let currScore = calcScore(heldArr) //-1 if fails to find a combo in curr held values
        if (currScore < 0) {
            alert("No possible roll")
            return -1
        }

        //update roundScore
        setRoundScore(prev => prev + currScore)

        //mark used
        setDie(die.map((die) => {
            if (die.isHeld) {
                return {
                    value: die.value,
                    isHeld: false,
                    isUsed: true
                }
            }
            else {
                return die
            }
        }))

        setDie(getNewUnusedDieValues())
        return currScore
        //check for combo in the new die values in UseEffect
    }

    function calcScore(heldArr) {
        if (streak6(heldArr))
            return 2000

        if (threePairs(heldArr) !== -1)
            return 1000

        let halfCheckScore = streak5(heldArr)
        if (halfCheckScore > 0) {
            return halfCheckScore
        }

        let roundScore = 0
        for (let i = 1; i <= 6; i++) //also handles all 6 same value
        {
            let currScore = comboCount(heldArr, i)

            if (currScore < 0 && (i !== 1 && i !== 5))
                return -1 //checks if any [2, 3, 4, 6] has count < 3

            roundScore += currScore
        }
        return roundScore
    }

    function StopRound() {
        // Call NewRoll to calculate the current score

        if (stopLeft === 0)
            return

        let score = NewRoll()

        if (score < 0)
            return


        stopLeftReduce()

        score += roundScore
        // Use the updater function to ensure synchronous state updates
        // console.log(`Prev Total is ${totalScore} and curr score is ${score}`)
        setTotalScore(prev => prev + score)

        setRoundScore(0);
        // Reset the dice for the next round
        setDie(getNewRoundDieValues());
    }

    function Busted() {
        alert('BUSTED!!! You Lost all points in this round.')
        setLives(prevLife => prevLife - 1)
        setRoundScore(0)
        setDie(getNewRoundDieValues())
    }

    function HandleHighScore(gameEnd) {
        let highScoreList = localStorage.getItem('highscore')

        highScoreList = highScoreList != null ? JSON.parse(highScoreList) : []

        highScoreList.push({
            id: highScoreList.length,
            highscore: totalScore,
            date: new Date(Date.now()).toDateString()
        })

        // console.log(highScoreList)

        highScoreList = highScoreList.sort((x, y) => (y.highscore - x.highscore))
        if (highScoreList.length > 10) {
            highScoreList.pop()
        }

        localStorage.setItem('highscore', JSON.stringify(highScoreList))
    }

    function stopLeftReduce() {
        setStopLeft(prev => prev - 1)
    }

    return (
        <div className='center-cont'>
            <NavBar lives={lives} stopLeft={stopLeft} />
            <div className='game-cont'>
                <h3>Total Score</h3>
                <div className='score'>{totalScore}</div>
                <h3>Current Round Score</h3>
                <div className='score'>{roundScore}</div>
                <div className='dice-cont'>
                    {
                        die.map((die, index) => <Die key={index}
                            value={die.value}
                            isHeld={die.isHeld}
                            isUsed={die.isUsed}
                            toggleHeld={() => toggleHeld(index)} />)
                    }
                </div>
                <div>
                    <button onClick={NewRoll}>ROLL</button>
                    <button onClick={StopRound} className={stopLeft === 0 ? 'disabledButton' : ''}>STOP</button>
                </div>
            </div>
        </div>
    )
}

