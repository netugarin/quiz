import React, {useState} from 'react';
import Answer from "./Answer"
import {nanoid} from "nanoid"

const Question = ({data}) => {
    const answers = [
        data.correct_answer,
        ...data.incorrect_answers
    ]
    const [newAnswers, setNewAnswers] = useState(getNewAnswers())
   
    
    function getNewAnswers() {
        const newArray = []
        shuffle(answers)
        for (let i = 0; i < answers.length; i++) {
            newArray.push({
                answer: answers[i],
                isHeld: false,
                id: nanoid()
            })
        }
        return newArray
    }

    function updateAnswer(id) {
        setNewAnswers(prevAnswers => prevAnswers.map(answer => {
            return answer.id === id
                ? {...answer, isHeld : !answer.isHeld}
                : answer
        }
        ))
    }

    const decodeEntities = ( () => {
        // this prevents any overhead from creating the object each time
        let element = document.createElement('div');

        function decodeHTMLEntities (str) {
            if (str && typeof str === 'string') {
                // strip script/html tags
                str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
                str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
                element.innerHTML = str;
                str = element.textContent;
                element.textContent = '';
            }
            return str;
        }
        return decodeHTMLEntities;

    })();

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const answersArray = newAnswers.map(answer =>
        <Answer
            answer={answer}
            updateAnswer={updateAnswer}
            key={answer['answer']}
        />

    )
    
    return (
        <div className="question">
            <h1 className="question--content" id="content">{decodeEntities(data.question)}</h1>
            <div className="answers">
                {answersArray}
            </div>
            <hr/>
        </div>
    );
};

export default Question;