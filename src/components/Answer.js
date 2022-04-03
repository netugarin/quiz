import React from 'react';
import decodeEntities from "../utils/decodeEntities";


const Answer = (props) => {
    let style = {}
    if (props.isChecked) {
        switch (true) {
            case (props.answer.isCorrect):
                style = {
                    backgroundColor: "#94D7A2",
                    transition: "0.2s",
                    border:"2px solid #94D7A2",
                    color: "#293264"
                }
                break
            case (props.answer.isHeld && props.answer.isCorrect === false):
                style = {
                    backgroundColor: "#F8BCBC",
                    transition: "0.2s",
                    border:"2px solid #F8BCBC",
                    color: "#A1A9CC"
                }
                break
            case (props.answer.isHeld === false):
                style = {
                    backgroundColor: "#F5F7FB",
                    transition: "0.2s",
                    border:"2px solid #A1A9CC",
                    color: "#A1A9CC"
                }
                break
            default:
                break
        }

    } else {
        style = {
            backgroundColor: props.answer.isHeld ? "#D6DBF5" : "#F5F7FB",
            transition: "0.2s",
            border: props.answer.isHeld ? "2px solid #D6DBF5" : "2px solid #4D5B9E"
        }

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