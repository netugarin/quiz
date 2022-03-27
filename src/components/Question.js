import React, {useState} from 'react';

const Question = ({data}) => {
    const [isClicked, setIsClicked] = useState(false)
    const answers = [
        data.correct_answer,
        ...data.incorrect_answers
    ]

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
    shuffle(answers)

    const answersArray = answers.map(answer =>
        <button className="answer--btn" >
            <h2 className="answer--value" >{decodeEntities(answer)}</h2>
        </button>
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