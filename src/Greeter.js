import React, {useRef, useState} from 'react'

const Greeter = () => {
    const [message, setMessage] = useState('')
    const inputRef = useRef(null)

    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event.target.elements)

        setMessage(inputRef.current.value)
        inputRef.current.value = ''
    }

    return (
        <div data-testid="greeter">
            <form className="greeter" onSubmit={submitHandler}>
                <label>
                    Enter your message<br />
                    <input type="text" ref={inputRef} />
                </label>
                <button>
                    <span>Submit</span>
                </button>
            </form>
            <div id="results" role="status">
                {message}
            </div>
        </div>
    )
}

export default Greeter
