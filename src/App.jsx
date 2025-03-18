import { useState } from "react";
import { smsQuestions } from "./components/smsQuestions";
import { atrQuestions } from "./components/atrQuestions";
import { b738Questions } from "./components/b738Questions";
import { loginQuestion } from "./components/authenticateData";
import "./index.css";

function App() {

  const [ selectedCategory, setSelectedCategory ] = useState("sms");
  const [ query, setQuery ] = useState("");
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ randomNumber, setRandomNumber ] = useState(Math.floor(Math.random() * loginQuestion.length))

  const allQuestions = [...smsQuestions, ...atrQuestions, ...b738Questions];

  // --------LOGIN VALIDATION--------
  const handleSubmit = () => {
    console.log(`Input: ${document.getElementById("inputLogin").value.toLowerCase()}`)
    console.log(`Answer: ${loginQuestion[randomNumber].answer.toLowerCase()}`)
    if(document.getElementById("inputLogin").value.toLowerCase() === loginQuestion[randomNumber].answer.toLowerCase()) {
      setIsLoggedIn(true)
      document.getElementById("loginForm").classList.add("hide")
    } else {
      document.getElementById("inputLogin").value = "";
      setRandomNumber(Math.floor(Math.random() * loginQuestion.length));
    }
  }

  // --------SEARCH INPUT FILTER--------
  const handleInputChange = (e) => {
    setQuery(e.target.value)
    console.log(e.target.value)
  }

  // --------CATEGORY FILTER--------
  const handleChange = (e) => {
    setSelectedCategory(e.target.value)
  };

  const filteredQuestions = allQuestions.map((item) => {
    if (item.category.includes(selectedCategory) && item.question.toLowerCase().includes(query.toLowerCase())) {
      return (
        <div className="card card-border bg-base-100 w-96" key={item.question}>
          <div className="card-body">
            <h2 className="card-title">{item.question}</h2>
            {item.answer.map((answerItem) => {
              return (
                <li className="list-none" key={answerItem}>{answerItem}</li>
              )
            })}
          </div>
        </div>
      )
    }
  })

  return (
    <>
      <div id="loginForm" className="loginForm">
        <div className="loginQuestion">
          {loginQuestion[randomNumber].question}
        </div>
        
        <input 
          type="text"
          className="inputLogin"  
          id="inputLogin"
          placeholder="Answer"
          onChange={(e) => e.target.value}
        />
        <button className="btn" onClick={handleSubmit}>Submit</button>
      </div>

      {isLoggedIn && (<main>
        <h1 className="text-3xl">e-FUCKING learning!</h1>

        <div className="tabs tabs-box">
          <input type="radio" name="test_category" className="tab" value="sms" onChange={handleChange} aria-label="SMS" defaultChecked />
          <input type="radio" name="test_category" className="tab" value="atr" onChange={handleChange} aria-label="ATR" />
          <input type="radio" name="test_category" className="tab" value="b738" onChange={handleChange} aria-label="B738" />
        </div>

        <div className="searchbox">
          <label className="input">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" required placeholder="Search" value={query} onChange={handleInputChange} />
          </label>
        </div>

        <div className="answerListContainer">
          {/* {query === "" ? selectedCategoryQuestions : filteredQuestions} */}
          {filteredQuestions}
        </div>
      </main>)}
      
    </>
  )
}

export default App
