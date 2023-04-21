import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Greeter from './Greeter'

const user = userEvent.setup()

describe('Greeter', () => {
    it('renders', () => {
        render(<Greeter />)
        const example = screen.getByTestId('greeter')
        expect(example).toBeInTheDocument()
    })
})
