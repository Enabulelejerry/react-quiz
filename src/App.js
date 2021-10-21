 
import React, {useState, useEffect} from 'react';
import {Questionaaire}  from './components'
const APT_URL = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'; 

function App() {
  const [ questions, setQuestion]  = useState([]);
const [currentIndex, setcurrentIndex] =useState(0);
const [score, setScore] = useState(0);
const [showAnswers, setShowAnswers] = useState(false);



  const getQuiz = async () => {
    const response = await fetch(APT_URL)
    const data = await response.json();
     //setQuestion(data.results); 
     const questions = data.results.map((question) => 
  ({
     ...question,
     answers:[
       question.correct_answer,
       ...question.incorrect_answers
     ].sort(() => Math.random() - 0.5)
  })
     )
     setQuestion(questions)
  }
 
  useEffect(() => {
    getQuiz();
  }, []);


  const handleAnswer =(answer) => {
    // prevent double answers
    if(!showAnswers){
          // check for the answer
   if(answer === questions[currentIndex].correct_answer){
    // increase the score
    setScore(score + 1);
  }


    }
     // show another question
   

   setShowAnswers(true)

    //const newIndex = currentIndex + 1
    //tcurrentIndex(newIndex)
   
  //if(newIndex >= questions.length){
  //  setGameEnded(true)
  //}

    

  // chnage score if correct
  }

 
  const handleNextQuestion =  () => {
     setShowAnswers(false)
     setcurrentIndex(currentIndex + 1)
  }

  
 
 

  return  questions.length > 0 ? (
    <div className="container">  
    {currentIndex >= questions.length ? (
      <h1 className="text-3xl text-white font-bold">
   End of game ! Your Score is : {score}
 
   </h1>
    ):(
            <Questionaaire 
            data ={questions[currentIndex]} 
            showAnswers={showAnswers}
            handleNextQuestion ={handleNextQuestion}
            handleAnswer = {handleAnswer}
         
            />   
            )} 
    </div>
    
      
  )
  : (
    <h1 className ="text-2xl text-white"> Loading.....</h1>
  )
 
}

export default App;
