import React from 'react';


const Answer = (props) => {
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
                <h2 className="answer--value" >{decodeEntities(props.answer['answer'])}</h2>
            </button>
    );
};

export default Answer;