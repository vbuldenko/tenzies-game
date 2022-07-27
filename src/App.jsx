import React, { useEffect } from 'react'
import Die from './components/Die.jsx'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App() {

    // Creating hooks
    const[dices, setDices] = React.useState(allNewDice)
    const[tenzies, setTenzies] = React.useState(false)

    useEffect(() => {
        const sameValue = dices[0].value
        const evaluationResult = dices.every(dice => dice.isHeld && dice.value === sameValue ? true : false)
        if (evaluationResult){
            setTenzies(true)
            console.log("You won!")
        }
    }, [dices])

    // ------------------------------------------------------------Generating dice objects
    function allNewDice(){
        const randomArray = [];
        for(let i = 0; i < 10; i++){
            randomArray.push(generateNewDice())
        }
        return randomArray
    }

    function generateNewDice(){
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function hold(id){
        setDices(oldDices => oldDices.map(dice => 
            dice.id === id ?
            {...dice, isHeld: !dice.isHeld} : dice))

    }

    function rollDice(){
        if(!tenzies){
        setDices(oldDices => oldDices.map(dice => 
            dice.isHeld ? dice : generateNewDice()
        ))
        }
        else {
            setTenzies(false)
            setDices(allNewDice) 
        }
    }

    // ----------------------------------------------------Creating array of dice elements
    const diceEls = dices.map((dice) => (
        <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} handleClick={() => hold(dice.id)}/>
    ))

    // ------------------------------------------------Returning of the React app component
    return(
        <main className="container">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze
            it at its current value between rolls.</p>
            <div className="grid-container">   
                {diceEls}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        </main>
    )
}