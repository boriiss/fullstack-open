import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const points = new Array(7).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(points);
 
  let maxVote = vote.indexOf(Math.max(...vote));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  const handleClick = () => {
    setSelected(getRandomInt(7));
  }

  const handleVote = () => {
    let copy = [...vote];
    // increment the value in position 2 by one
    copy[selected] += 1;
    setVote(copy);
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
        <p>
          has {vote[selected]} votes
        </p>
      </div>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <div>
        <h2>
          Аnecdote with most votes
        </h2>
         <div>
          {anecdotes[maxVote]}
         </div>
      </div>
    </div>
  )
}

export default App
// import { useState } from 'react';

// const spanStyle = {
//   width: '65px',
//   display: 'inline-block'
// };

// const StatisticLine = (props) => {
//   return (
//     <div>
//       <span style={spanStyle}>{props.text}: </span>{props.value}
//     </div>
//   )
// }

// const Button = (props) => {
//   return (
//     <button onClick={props.click}>
//         {props.text}   
//     </button>
//   )
// }

// const Statistics = (props) => {
//   if(props.info['all']) {
//   return (
//     <div>
//       <StatisticLine text="good" value={props.info['good']} />
//       <StatisticLine text="neutral" value={props.info['neutral']} />
//       <StatisticLine text="bad" value={props.info['bad']} />
//       <StatisticLine text="all" value={props.info['all']} />
//       <StatisticLine text="averate" value={props.info['averate']} />
//       <StatisticLine text="positive" value={props.info['positive']} />
//     </div>
//   )
//   } else {
//     return <div>No feedback given</div>
//   }

// }

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [sum, setSum] = useState(0);

//   const all = good + neutral + bad;
//   const positive = good / (all / 100);
//   const averate = sum / all;

//   const info = {
//     good: good,
//     neutral: neutral,
//     bad: bad,
//     sum: sum,
//     all: all,
//     positive: positive,
//     averate: averate
//   }

//   const handleClickGood = () => {
//     setGood(good + 1);
//     setSum(sum + 1);
//   }

//   const handleClickNeutral = () => {
//     setNeutral(neutral + 1);
//   }

//   const handleClickBad = () => {
//     setBad(bad + 1);
//     setSum(sum - 1);
//   }

//   return (
//     <div>
//       <h2>give feedback</h2>
//       <div>
//         <Button click={handleClickGood} text="good" />
//         <Button click={handleClickNeutral} text="neutral" />
//         <Button click={handleClickBad} text="bad" />
//       </div>
//       <h2>
//         statistics
//       </h2>
//         <Statistics info={info} />
//     </div>
//   )
// }

// export default App;

// import { useState } from 'react';

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   });

//   const handleLeftClick = () => {
//     const newClicks = { 
//       ...clicks, 
//       left: clicks.left + 1 
//     }
//     setClicks(newClicks)
//   }
  
//   const handleRightClick = () => {
//     const newClicks = { 
//       ...clicks, 
//       right: clicks.right + 1 
//     }
//     setClicks(newClicks)
//   }

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

// export default App;
