import React , {useState} from 'react';
import './App.css';
import Button from './button'
import MessageBox from './messageBox'
import Contact from './Contact/Contact'

  function App(){
    const [name, setName] = useState("")
    const [Utext , setUserText] = useState("")
    const [Btext , setBotText] = useState("")
  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)()
    recognition.lang = 'en-US';
   recognition.interimResults = false;
   recognition.maxAlternatives = 5;
    function onButtonClick() {
        recognition.start();
        console.log('Ready to receive a color command.');
      }
  function getName(result) {
    var command = result.split(" ")
    var nameIndex = command.indexOf("is") + 1
    return command[nameIndex]
  }
   recognition.onresult = (event) => {
      
      setUserText( event.results[0][0].transcript)
      if(event.results[0][0].transcript.includes("hello")) answer("Hiii")
      else if(event.results[0][0].transcript.includes("how are you")) answer("Fine :)")
      else if(event.results[0][0].transcript.includes("f*** you")) answer("Nope, with all due respects, FUCK YOU")
      else if(event.results[0][0].transcript.includes("what is your name")) answer("My name is KBot! I am a voice chat bot developed by Kamal Nanda Ji")
      else if(event.results[0][0].transcript.includes("search" )){
        answer("Searching.....")
          var url
          var command = event.results[0][0].transcript.split(" ")
          command.shift()
          var query = command.join("+")
          if(event.results[0][0].transcript.includes("YouTube")){
           let newQuery = query.replace("+on+YouTube","")
             url = `https://www.youtube.com/results?search_query=${newQuery}`
          }
          else if(event.results[0][0].transcript.includes("Google")){
             url = `https://www.google.com/search?q=${query}`
          }
          else url = `https://www.google.com/search?q=${query}`
          window.open(url , "_blank")
      }
      else if(event.results[0][0].transcript.includes("what is my name")){
          if(name === ""){
            answer("I didn't get your name earlier, tell me now and try again")
          }
          else {
            var uname = name
            answer(uname)
          }
      }
      else if(event.results[0][0].transcript.includes("my name is")){ 
        let name = getName(event.results[0][0].transcript)
        setName(name)
        answer("Hiii " + name + " I am KBot")
      }
      else answer("You said " + event.results[0][0].transcript) 
    };
    function answer(ans){
      setTimeout(()=> setBotText(ans) , 1000)
      setTimeout(()=> {
        var msg = new SpeechSynthesisUtterance(ans);
      window.speechSynthesis.speak(msg);
      }, 1500)
    }
    recognition.onspeechend = function() {
      recognition.stop();
      console.log("STOPPED")
    }
    return (
      <div className="App">
        <Button onButtonClick={onButtonClick} />
        <MessageBox text = {Utext} className="userBox"/>
        <MessageBox text = {Btext} className="botName"/>
        <Contact />
      </div> 
    );
}

export default App;
