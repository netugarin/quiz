import React, {useState, useEffect} from 'react';
import {unescape} from "underscore";

import Question from "./components/Question";
import Answer from "./components/Answer";
import question from "./components/Question";

const App = () => {
    const [isQuiz, setIsQuiz] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            const data = await fetch("https://opentdb.com/api.php?amount=5")
            const questions = await data.json()
            setData(questions.results)
        }
        getData()
            .catch(console.error)
    }, [])
    console.log(data)
    const questionsArray = data.map(question => <Question content={question.question}/>
    )
    return (
        <main>
            {questionsArray}
        </main>
    );
};

export default App;