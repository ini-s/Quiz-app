import React, { useEffect, useState } from 'react';
import './App.css';
import Intro from './components/intro'
import Quiz from './components/quiz'
import uuid from "react-uuid"

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const [count, setCount] = useState(0)
  const [playCount, setPlayCount] = useState(1)

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await res.json()
      setQuizData(data.results)
    }
    getData()
  }, [playCount])

  function startQuiz() {
    setGameStart(prevValue => !prevValue)
  }

  function restartQuiz() {
    setPlayCount(prevCount => prevCount + 1)
    setGameStart(false)
    setIsClicked(false)
    setCount(0)
  }

  function showAnswers() {
    setIsClicked(true)
  }

  return (
    <div className='app'>
      {
        gameStart ?
          <div className='quiz-box'>
            {quizData.map((ques, i) => {
              console.log(ques)
              return <Quiz
                key={i}
                id={uuid()}
                question={ques.question}
                correct={ques.correct_answer}
                incorrect={ques.incorrect_answers}
                click={isClicked}
                setCount={setCount}
              />
            })}
            {isClicked ?
              <div className='answers-msg'>
                <h3>
                  You scored {count}/5 correct answers
                </h3>
                <button className='play-again-btn' onClick={restartQuiz}>Play Again</button>
              </div>
              :
              <div className='bottom-btn'>
                <div className='check-answers-btn' onClick={showAnswers}>Check Answers</div>
              </div>
            }
          </div>
          :
          <Intro
            handleClick={startQuiz}
          />
      }
    </div>
  )
}

export default App;
