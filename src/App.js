import React, { Component, useLayoutEffect, useEffect, useRef, useState } from 'react'
import './App.css';
const App = () => {
  const data = {
    topScorer: [{
    name: 'anchal',
    score: 120
    }, {
    name: 'anchal',
    score: 120
    },
    {
    name: 'anchal',
    score: 120
    }],
    me: {
    score: 200,
    rank: 10
    }
  };
  return (
    <>      
    <div className="flex flex-column">
      <div className="flex flex-column">
        <span className="f5">Your Score</span>
        <div className="border text-align border-radius flex flex-row pad-lr-30 pad-tb-15 justify-between top-margin-15">
          <div className="flex flex-column">
            <span className="gray-text-color f6-3">Rank</span>
            <span className="top-margin-10 bold f5-7">{data.me.rank}</span>
          </div>
          <div className="flex flex-column">
            <span className="gray-text-color f6-3">Your score</span>
            <span className="top-margin-10 bold f5-7">{data.me.score}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-column top-margin-50">
        <span className="f5">Top Scorer</span>
        <div className="border text-align border-radius flex flex-row pad-lr-30 pad-tb-15 justify-between top-margin-15">
          {data.topScorer.map((score, idx) => (
             <div className="flex flex-column">
              <span className="gray-text-color f6-3 text-capitialize">{score.name}</span>
              <span className="top-margin-10 bold f5-7">{score.score}</span>
           </div>
          ))}
        </div>
      </div>
    </div>
    </>  
  );
}

export default App;
