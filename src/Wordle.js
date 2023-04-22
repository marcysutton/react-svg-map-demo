import React, {forwardRef, useRef, useState} from 'react'

import './wordle.css'

/*
EARTH
⬜🟩🟨🟨🟨
*/

const Cell = forwardRef(({index, state}, ref) => {
    return (
        <input
            aria-label={`letter ${index}`}
            className="cell"
            data-answer={state}
            maxLength="1"
            pattern="[A-Za-z]{1}"
            ref={ref}
            type="text"
        />
    )
})
const Wordle = () => {
    const wordOfTheDay = 'earth'
    const wordMaxLength = wordOfTheDay.length
    const wordArray = wordOfTheDay.split('')
    const [userArray, setUserArray] = useState([])
    const cells = useRef([])

    const submitHandler = (event) => {
        event.preventDefault()
    }
    const changeHandler = (event) => {
        // if less than the max number of characters, accept the value
        if (userArray.length <= wordMaxLength) {
            const userInput = event.target.value.toLowerCase()
            const cellIndex = cells.current.indexOf(event.target)

            setUserArray(userArray => [...userArray, userInput])

            const letterPosition = wordOfTheDay.indexOf(userInput)
            if (letterPosition === -1 ) {
                // if cell is not in array:
                // - state=incorrect
                console.log('answer is incorrect')
            } else {
                // if cell value is in array:
                if (letterPosition === cellIndex) {
                    // - in correct position, state=correct
                    console.log('answer is correct')
                } else {
                    // - in wrong position, state=partial
                    console.log('answer is partially correct')
                }
            }
            // if currently focused element is within bounds, move ahead
            if (document.activeElement !== cells.current[wordMaxLength - 1]) {
                cells.current[cellIndex + 1].focus()
            }
        }
    }

    return (
        <>  
            <h2>Wordle</h2>
            <form
                className="wordle"
                onChange={changeHandler}
                onSubmit={submitHandler}
            >
                <fieldset>
                    <legend>Type in a word.</legend>
                    { wordArray.map((l, i) => {
                        return (
                            // TODO: implement readonly after filling
                            // disable shift tab
                            <Cell
                                key={`l${i}`}
                                index={i}
                                ref={(ref) => cells.current.push(ref)}
                                state={''}
                            />
                        )
                    })}
                    </fieldset>
                <button><span>Submit</span></button>
            </form>
        </>
    )
}

export default Wordle
