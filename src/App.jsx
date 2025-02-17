import { useState } from 'react'
import Github from './assets/github-mark.png'
import './App.css'

function App() {
  const [searchtxt, setSearchTxt]= useState(null);

  const searchHandler= ()=>{
    console.log(searchtxt);
  }

  return (
    <>
      <div className="title-container">
        <img className='github-logo' src={Github}></img>
        <h1 className="title-name">Github Repository Finder</h1>
      </div>
      <div className="search-container">
        <input type="text" className="search-box" placeholder='Search Respository' onChange={(e)=>{setSearchTxt(e.target.value)}}/>
        <button className="search-btn" onClick={searchHandler}>Search</button>
      </div>
    </>
  )
}

export default App
