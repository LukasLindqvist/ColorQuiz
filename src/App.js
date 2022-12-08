import './App.css';
import { useEffect, useState } from 'react';
function App() {

  const [message , setMessage] = useState("Guess the color!");
  const [color, setColor] = useState("")
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [totalGuesses, setTotalGuesses] = useState(0)
  //not always working sometimes throws color that does not exist
const randomColor = () => {
 return Math.floor(Math.random()*16777215).toString(16);
}

function colorToElements(){
  const buttons = document.querySelectorAll(".selectColor button")
  let getRandomColor = randomColor()
  setColor("#" + getRandomColor)

  for (const button of buttons){
    button.innerText = "#" + randomColor()
    //reset wrongButtonId
    button.id = ""
  }

  let random = Math.floor(Math.random() * buttons.length)

  let correctButton = buttons[random]
  correctButton.innerText = "#" + getRandomColor
}


//check if correct color picked or not
function checkCorrectValue(button){
  let resultMsg = document.getElementsByClassName("message")
  //need to remove class so animation can run again on class add
  resultMsg[0].classList.remove("correct")
  resultMsg[0].classList.remove("wrong")
  if(button.target.innerText === color){
    colorToElements()
    setMessage("Correct Answer")
    resultMsg[0].classList.remove("wrong")
    resultMsg[0].classList.add("correct")
    setCorrectGuesses(correctGuesses + 1)
    setTotalGuesses(totalGuesses + 1)
  }else{
    setMessage("Wrong Answer")
    resultMsg[0].classList.remove("correct")
    resultMsg[0].classList.add("wrong")
    button.target.id = "wrongButton"
    setTotalGuesses(totalGuesses + 1)
  }
}

useEffect(() => {
  colorToElements()
},[])

//Wrong and correct answer popup message
  return (
    <>
    <div className='pageWrapper'>
      <div className='pageContainer'>
        <div className='spacer'>
          <div className='header'>
            <h3>Color Quiz</h3>
          </div>
          <div className='currentScore'>
            <span>Score: </span>
            <span className='correct'>{correctGuesses} / </span>
            <span className='wrong'>{totalGuesses} </span> 
          </div>
          <div className='message'>
            <p>{message}</p>
          </div>
          <div className='color' style={{background: color}}></div>
          <div className='selectColor'>
            <button onClick={(e) => checkCorrectValue(e)} id=""></button>
            <button onClick={(e) => checkCorrectValue(e)} id=""></button>
            <button onClick={(e) => checkCorrectValue(e)} id=""></button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
