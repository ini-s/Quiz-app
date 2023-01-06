import React from 'react'
import '../option.css'
import { decode } from 'html-entities';
export default function Option({ isCorrect, select, isClicked, isHeld, value }) {
    const heldStyle = {
        backgroundColor: isHeld && '#D6DBF5',
        border: isHeld && 'none'
    }
    const correctStyle = {
        backgroundColor: isCorrect ? '#94d7a2' : isHeld ? '#f8bcbc' : 'none',
        border: isCorrect && 'none'
    }
    return (
        <div className='option-box' style={isClicked ? correctStyle : heldStyle} onClick={select}>
            {decode(value)}
        </div>
    )
}