import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeartBroken, faHeart} from '@fortawesome/free-solid-svg-icons'

export default function NavBar({lives, stopLeft})
{
    let heartAliveStyle = {
        margin: '0 5px',
        color: 'red', 
        fontSize: '20px'
    }

    let heartDeadStyle = {
        ...heartAliveStyle,
        color: 'white'
    }

    let hearts = []
    for(let i=1; i<=3; i++)
    {
        if(i<=lives)
        {
            hearts.push(<FontAwesomeIcon key={i} icon={faHeart} style={heartAliveStyle}/>)  
        }
        else
        {
            hearts.push(<FontAwesomeIcon key={i} icon={faHeartBroken} style={heartDeadStyle}/>)
        }
    }

    return (
        <nav>
            <div className="stopleft-cont">
                Stops Left : {stopLeft}
            </div>
            <div className="health-cont">
                {hearts}
            </div>
        </nav>
    )
}