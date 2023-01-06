import React from 'react';
import '../intro.css';
import shapeTop from '../images/top-shape.png'
import shapeBottom from '../images/bottom-shape.png'
export default function Intro({ handleClick }) {
    return (
        <div className='intro'>
            <img className='top-shape' src={shapeTop} alt='top-shape' />
            <div className='text'>
                <h1>Quizzical</h1>
                <p>Answer the questions to test your knowledge</p>
                <button onClick={handleClick}>Start Quiz</button>
            </div>
            <img className='bottom-shape' src={shapeBottom} alt='bottom-shape' />
        </div>
    )
}