import React, { useState, useEffect } from 'react';
import data from './emoji.json';
import logo from './logo.png';

function App() {
  const [resultsElement, setresultsElement] = useState([]);
  const [query, setQuery] = useState("");
  const [skinTone, setSkinTone] = useState("1f3fa");
  const [showSkintones, setshowSkintones] = useState(false);
  const skinTones = [];
  ["1f3fa", "1f3fb", "1f3fc", "1f3fd", "1f3fe", "1f3ff"].forEach((s)=>{skinTones.push(<li key={s} className={`skintone-${s}`} onClick={()=>setSkinTone(s)}></li>)});
  let categoriesElement = [];
  const categories = {
    0: {
      name: "people",
      title: "Smileys & People"
    },
    1: {
      name: "nature",
      title: "Animals & Nature"
    },
    2: {
      name: "food",
      title: "Food & Drink"
    },
    3: {
      name: "activity",
      title: "Activity"
    },
    4: {
      name: "travel",
      title: "Travel & Places"
    },
    5: {
      name: "objects",
      title: "Objects"
    },
    6: {
      name: "symbols",
      title: "Symbols"
    },
    7: {
      name: "flags",
      title: "Flags"
    }
  }
  
  Object.entries(categories).forEach((cat)=>{
      const catEmojis = Object.entries(data).filter(emoji => emoji[1].category===cat[1].name);
      let catElement = [<h1 key={cat[1].title}>{cat[1].title}</h1>]
      catEmojis.forEach(emoji => {
        if(emoji[1].diversity===null && emoji[1].diversity_children.length===0){
          catElement.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-${emoji[1].category} _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }else if(emoji[1].diversity !== null && skinTone!=='1f3fa' && emoji[1].diversity.includes(skinTone)){
          catElement.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-diversity _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }else if(skinTone==='1f3fa' && emoji[1].diversity===null){
          catElement.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-${emoji[1].category} _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }
      });
      categoriesElement.push(catElement)
  });

  function copy(t){
    navigator.clipboard.writeText(String.fromCodePoint(parseInt (t, 16)))
  }
  useEffect(() => {
    if(query.length > 0){
      let r = [];
      const emojis = Object.entries(data).filter(emoji => emoji[1].keywords.includes(query.toLowerCase()));
      emojis.forEach(emoji => {
        if(emoji[1].diversity===null && emoji[1].diversity_children.length===0){
          r.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-${emoji[1].category} _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }else if(emoji[1].diversity !== null && skinTone!=='1f3fa' && emoji[1].diversity.includes(skinTone)){
          r.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-diversity _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }else if(skinTone==='1f3fa' && emoji[1].diversity===null){
          r.push(<span key={`${emoji[1].code_points.base}-${emoji[1].order}`} className={`joypixels-40-${emoji[1].category} _${emoji[1].code_points.base} _${emoji[1].code_points.fully_qualified}`} onClick={(e)=>{copy(emoji[1].code_points.base.split("-")[0])}}></span>)
        }
      });
      setresultsElement(r);
    }else{
      setresultsElement([]);
    }
  }, [query, skinTone]);

  return (
      <div>
        <nav>
          <div className='logo'>
            <img alt='' src={logo}></img>
          </div>
        </nav>
        <nav className='secondNav'>
          <div>
            <input autoComplete="off" placeholder="SEARCH" onChange={(e)=>{setQuery(e.target.value)}}/>
            <span className="joypixels-40-objects _1f50e"></span>
            <button onClick={()=>setshowSkintones(!showSkintones)}><span className={`skintone-${skinTone}`}></span></button>
            {showSkintones?<ul>{skinTones}</ul>:null}
          </div>
        </nav>

        <div className="wrapper">
          {resultsElement.length>0?<div id="results">{resultsElement}</div>:<div>{query.length>0&&resultsElement.length===0?<h1>No Matches</h1>:null}<div id="categories">{categoriesElement}</div></div>}
        </div>

      </div>
  );
}

export default App;
