import React from 'react';
import Answer from "./Answer"
import decodeEntities from "../utils/decodeEntities";


const Question = (props) => {
    const answersArray = props.question.answers.map(answer =>
        <Answer
            answer={answer}
            updateAnswer={props.updateAnswer}
            key={answer.id}
            isChecked={props.isChecked}
        />
    )

    return (
        <div className="question">
            <h1 className="question--content" id="content">{decodeEntities(props.question.question)}</h1>
            <div className="answers">
                {answersArray}
            </div>
            <hr/>
        </div>
    );
};

export default Question;