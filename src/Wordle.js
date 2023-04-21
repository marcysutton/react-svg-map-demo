import React, {useState} from 'react'

/*
EARTH
⬜🟩🟨🟨🟨
*/

const Wordle = () => {
    const wordOfTheDay = 'earth'
    const [winning, setIsWinning] = useState(false)

    const changeHandler = (event) => {
        const userInput = Array.from(event.target.value)

        if (userInput.length === 5) {
            userInput.forEach((letter, index) => {
                if (wordOfTheDay.indexOf(letter) !== -1) {
                    setIsWinning(true)
                } else {
                    setIsWinning(false)
                }
            })
        }
    }
    return (
        <>  
            <h2>Wordle</h2>
            <p>(in progress)</p>
            <div onChange={changeHandler}>
                <input type="text" aria-label="Type a word" />
            </div>
            <div id="wordle-results" className={winning ? 'winning' : null}>
            🟩🟩🟩🟩🟩
            </div>
        </>
    )
}

export default Wordle
