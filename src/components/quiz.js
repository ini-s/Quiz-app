import React, { useState, useEffect } from 'react';
import Option from './option'
import uuid from 'react-uuid'
import '../quiz.css'
import shapeTop from '../images/small-top-shape.png'
import shapeBottom from '../images/small-bottom-shape.png'
import { decode } from 'html-entities';
export default function Quiz({ question, correct, incorrect, click, setCount }) {
    const [options, setOptions] = useState([])

    const correctAnswer = { value: correct, id: uuid(), isCorrect: true, isHeld: false }
    const incorrectAnswers = incorrect.map(answer => {
        return { value: answer, id: uuid(), isCorrect: false, isHeld: false }
    })
    let allAnswers = [...incorrectAnswers]
    let randomNo = Math.floor(Math.random() * (incorrectAnswers.length + 1))
    allAnswers.splice(randomNo, 0, correctAnswer)

    useEffect(() => {
        setOptions(() => [...allAnswers])
    }, [])

    function handleClick(id) {
        setOptions(prev => prev.map(opt =>
            opt.id === id ? { ...opt, isHeld: true } : { ...opt, isHeld: false }
        ))
        options.map(opt => opt.id === id && opt.isCorrect === true ? setCount(prevCount => prevCount + 1) : null)
    }

    return (
        <div className='quiz'>
            <img className='top-shape' src={shapeTop} alt='top-shape' />
            <div className='text'>
                <h3>
                    {decode(question)}
                </h3>
                <div className='options'>
                    {options.map(ans => {
                        return <Option
                            key={ans.id}
                            id={ans.id}
                            value={ans.value}
                            isCorrect={ans.isCorrect}
                            select={() => handleClick(ans.id)}
                            isClicked={click}
                            isHeld={ans.isHeld}
                        />
                    })}
                </div>
                <div className='bottom-line'></div>
            </div>
            <img className='bottom-shape' src={shapeBottom} alt='bottom-shape' />
        </div>
    )
}