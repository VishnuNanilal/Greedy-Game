import React from "react";
import ExitButton from "./ExitButton";

export default function Help({ closeHelp }) {
    return (
        <div className="help-cont">
            <ExitButton action={closeHelp} />
            <div className="help-text">
                <h3 id="aim-of-the-game">Aim Of The Game</h3>
                <p>To reach the winning score of 10000 with at most 16 <em>stops</em> and 3 lives.</p>
                <br/>
                <br/>
                <h3 id="the-greed-dice-game-rules">The Greedy Dice Game Rules</h3>
                <p>The greed dice game rules are straightforward. These are the main steps in the game:</p>
                <br/>
                <p>A player play by rolling all six dice – the following scenarios then exist:</p>
                <ol>
                    <br/>
                    <li><p>The player did not roll any 1’s, 5’s or scoring combination (see further below for an overview of most scoring combinations): the turn of that player ends with losing all points of the round and a life.</p>
                    </li>
                    <br/>
                    <li><p>The player rolled a scoring combination:
                        <br/>
                        <br/>
                        i) He can choose to keep that score and add it to this overall score. In that case, the player uses up one <em>stop</em> count.
                        <br/>
                        <br/>
                        ii) He can choose to set aside the dice of the scoring combination and roll the remaining dice again to try and get additional points. The dice set aside cannot be used again to make a combination with the dice rolled. If the player rolls the remaining dice again and the combination of the remaining dice has no score, they lost a life along with all the points of the current round.</p>
                        <br/>
                        <p><b>When and if all the dice are used, the player will have a new set of 6 dice without losing a stop.</b></p>
                    </li>
                </ol>
                <br/>
                <p>The game ends when a player has reached 10,000 points or run out of three lives.</p>
                <br/>
                <br/>
                <h3 id="greed-dice-game-scoring-combinations">Greedy Dice Game Scoring Combinations</h3>
                <p>The scoring combinations are the essential part of the greed dice game rules.</p>
                <br/>
                <ul>
                    <li>Each 1 that you roll is worth 100 points</li>
                    <br/>
                    <li>Each 5 that you roll is worth 50 points</li>
                    <br/>
                    <li>Three of a kind is worth 100 points multiplied by the number on the dice. So, for example, three of a kind of 5’s is worth 500 points. Each additional dice will then double the score, so for example, if you roll four 5’s then you will have 1000 (500×2) points. If you roll five 5’s them you have 2000 (1000×2) points</li>
                    <br/>
                    <li>Three of a kind of 1’s is worth 1000 points.</li>
                    <br/>
                    <li>Three pairs is worth 1000 points</li>
                    <br/>                   
                    <li>A five dice straight (1-2-3-4-5 or 2-3-4-5-6) is worth 1000 points, while a six dice straight is worth 2000 points</li>
                </ul>
            </div>
        </div>
    )
}