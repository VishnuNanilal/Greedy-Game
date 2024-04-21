import React from 'react'

export default function Die({value, isHeld, isUsed, toggleHeld})
{
    let newcolor = ""
    if(isHeld)
        newcolor = '#48c268'
    else if(isUsed)
        newcolor = '#6e6e6e'
    else
        newcolor = 'white'

    return (
        <button className='die' onClick={toggleHeld} 
        style={{backgroundColor: newcolor}}>
            {value}
        </button>
    )
}