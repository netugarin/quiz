import React from 'react';
import decodeEntities from "../utils/decodeEntities";


const Answer = (props) => {

    const style = {
        backgroundColor: props.answer.isHeld ? "#D6DBF5" : "#F5F7FB",
        transition: "0.2s",
        border: props.answer.isHeld ? "2px solid #D6DBF5" : "2px solid #4D5B9E"
    }
    return (
            <button
                className="answer--btn"
                onClick={() => props.updateAnswer(props.answer.id)}
                style={style}
            >
                <h2 className="answer--value" >{decodeEntities(props.answer.answer)}</h2>
            </button>
    );
};

export default Answer;