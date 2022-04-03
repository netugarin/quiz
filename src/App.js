import React, {useState, useEffect} from 'react';
import Question from "./components/Question";
import {nanoid} from "nanoid";
import shuffle from "./utils/shuffle";

const App = () => {
    const [isQuiz, setIsQuiz] = useState(true)
    const [data, setData] = useState([])
    const [questions, setQuestions]  = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)


    useEffect(() => {
        getData()
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        getQuestions()
            .catch(err => console.log(err))
    }, [data])

    async function getQuestions() {
        const questionsArray = []
        data.map(question => questionsArray.push({
            question: question.question,
            answers: []
        }))
        for (let i = 0; questionsArray.length > i; i++) {
            data.map(element => {
                if (questionsArray[i].question === element.question) {
                    questionsArray[i].answers.push({
                            answer: element.correct_answer,
                            isHeld: false,
                            id: nanoid(),
                            isCorrect: true
                        }
                    )
                    for (let j = 0; element.incorrect_answers.length > j; j++) {
                        questionsArray[i].answers.push({
                            answer: element.incorrect_answers[j],
                            isHeld: false,
                            id: nanoid(),
                            isCorrect: false
                        })
                    }
                }
            })
            shuffle(questionsArray[i].answers)
        }
        setQuestions(questionsArray)
    }

    async function getData() {
        const data = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        const questions = await data.json()
        setData(questions.results)
    }

    function restartQuiz() {
        getData()
        setIsChecked(prevIsChecked => !prevIsChecked)
    }

    function updateAnswer(id) {
        setQuestions(prevQuestions => prevQuestions.map(question => {
            return {...question,
                    answers: question.answers.map(answer => {
                        return answer.id === id ? {...answer, isHeld: !answer.isHeld} : {...answer}
                    })}
        }))
    }

    function checkAnswers() {
        let count = 0
        for (let i = 0; questions.length > i; i++) {
            for (let j = 0; questions[i].answers.length > j; j++) {
               if (questions[i].answers[j].isCorrect === true && questions[i].answers[j].isHeld === true) {
                  count++
               }
            }
        }
        setCorrectCount(count)
        setIsChecked(prevIsChecked => !prevIsChecked)
    }

    const questionsArray = questions.map(element => <Question
        question={element}
        key={element.question}
        checkAnswers={checkAnswers}
        updateAnswer={updateAnswer}
        isChecked={isChecked}
    />
    )

    return (
        <main>
            <img src="images/orange_blob.svg" alt="" className="orange-blob"/>
            {isQuiz
            ?
                <div className="start">
                    <h1 className="start--title">Quizzical</h1>
                    <h2 className="start--description">Some description if needed</h2>
                    <button className="start--btn" onClick={() => setIsQuiz(prevIsQuiz => !prevIsQuiz)}>Start quiz</button>
                </div>
            :
                <div className="quiz--container">
                    {questionsArray}
                    {isChecked
                        ? <div className="quiz--again">
                            <h2 className="quiz--correct-answers">You scored {correctCount}/5 correct answers</h2>
                            <button className="start--btn again-btn" onClick={() => restartQuiz()}>Play again</button>
                          </div>
                        : <button className="start--btn quiz--btn" onClick={() => checkAnswers()}>Check answers</button>
                    }

                </div>
            }
            <img src="images/blue_blob.svg" alt="" className="blue-blob"/>
        </main>
    );
};

export default App;