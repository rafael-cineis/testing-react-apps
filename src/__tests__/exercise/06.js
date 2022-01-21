// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', () => {
  let setMockState
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setMockState = setState
    return state
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  const fakePosition = {
    coords: {
      latitude: 10,
      longitude: 20,
    }
  }
  
  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  act(() => {
    setMockState([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

test('show error message when there is an error to get user location', () => {
  let setMockState
  const useMockCurrentPosition = () => {
    const [state, setState] = React.useState([])
    setMockState = setState
    return state
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  
  const error = {message: 'Unable to load user location'}
  act(() => {
    setMockState([undefined, error])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(error.message)
})
