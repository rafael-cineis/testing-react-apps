// testing custom hooks
// http://localhost:3000/counter-hook

import useCounter from '../../components/use-counter'
import { act, renderHook } from '@testing-library/react-hooks'

test('exposes the count and increment/decrement functions', () => {
  const { result } = renderHook(useCounter)
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const { result } = renderHook(useCounter, { initialProps: { initialCount: 5 } })
  
  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of the step', () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 3 } })
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const { result, rerender } = renderHook(useCounter, { initialProps: { step: 3 } })
  
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({ step: 2 })
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
