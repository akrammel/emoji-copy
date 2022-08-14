import React, { useState, useEffect } from 'react';
import data from './emoji.json';

function App() {
  const [query, setQuery] = useState(false);

  useEffect(() => {
    const resultsel = document.getElementById("results");
    let emojis = {};
    if(query.length > 0){
      emojis = Object.entries(data).filter(emoji => emoji[1].keywords.includes(query));
      resultsel.innerHTML = "";
      emojis.forEach(emoji => {
        let span = document.createElement("span");
        if(emoji[1].diversity==null){
          span.className = "joypixels-40-" + emoji[1].category + " _" + emoji[1].code_points.base + " _" + emoji[1].code_points.fully_qualified;
        }else{
          span.className = "joypixels-40-diversity" + " _" + emoji[1].code_points.base + " _" + emoji[1].code_points.fully_qualified;
        }
        span.innerHTML = "&#x" + emoji[1].code_points.base.split("-")[0] + ";";
        resultsel.appendChild(span);
        if(resultsel.innerHTML!==""){
          document.querySelectorAll("span").forEach((e)=>e.addEventListener("click", (t)=>navigator.clipboard.writeText(t.target.innerHTML)));
        }
      });
    }else if(query!==false && query.length === 0){
      resultsel.innerHTML = "";
    }
  }, [query]);

  return (
    <div className="App">
      <div className="screenCenter">
        <input autoComplete="off" type="text" placeholder="Search emoji" onChange={(e)=>{setQuery(e.target.value)}}></input>
        <div id="results"></div>
      </div>
    </div>
  );
}

export default App;
