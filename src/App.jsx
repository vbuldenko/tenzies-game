import React from 'react'
import Die from './components/Die.jsx'

export default function App() {

    const[numbers, setNumbers] = React.useState(allNewDice)

    function allNewDice(){
        const randomArray = [];
        for(let i = 0; i < 10; i++){
            randomArray.push(Math.ceil(Math.random() * 6))
        }
        return randomArray
    }
    console.log(numbers)

    const dies = numbers.map((num, index) => <Die key={index + 1} value={num} />)

    return(
        <main className="container">
            <div className="grid-container">   
                {dies}
            </div>
            <button className="roll-dice" onClick={() => setNumbers(allNewDice)}>Roll</button>
        </main>
    )
}