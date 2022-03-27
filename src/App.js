import React, {useState, useEffect} from 'react';


import Question from "./components/Question";

const App = () => {
    const [isQuiz, setIsQuiz] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        async function getData() {
            const data = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            const questions = await data.json()
            setData(questions.results)
        }
        getData()
            .catch(console.error)
    }, [])
    console.log(data)

    const questionsArray = data.map(element => <Question data={element}/>)

    return (
        <main>
            {questionsArray}
        </main>
    );
};

export default App;