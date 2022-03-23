import React from 'react';

const Question = (props) => {
    let decodeEntities = ( function() {
        // this prevents any overhead from creating the object each time
        let element = document.createElement('div');

        function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
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

    return (
        <div className="question">
            <h1 className="question--content" id="content">{decodeEntities(props.content)}</h1>
        </div>
    );
};

export default Question;