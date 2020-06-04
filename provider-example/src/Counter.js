import React from 'react'
import CounterProvider, { withConsumer, withProvider } from './CounterProvider'

// The following are simple functional components
// completely oblivious of where their state derives
// from. They know only that someone has 'given' them
// the state upon which they depend through their 'props'.

const Display = ({ count }) => {
  return <div>Count: {count}</div>;
};

const IncrementButton = ({ increment }) => {
  return <button onClick={increment}>+1</button>;
};

const DecrementButton = ({ decrement }) => {
  return <button onClick={decrement}>-1</button>;
};

// This is the combined UI for the Counter, which
// determines where state will ultimately come from
// for each of the constituent components.
const Counter = () => {

  // This is a mapping of state to keep the individual
  // UI Components somewhat ignorant of the actual layout
  // of application state.
  //
  const sliceOfState = state => ({
    count: state.count
  });
  
  // We now 'wrap' each individual UI Component that relies
  // on the state of the Counter, with an HOC that embeds access
  // to the provider of the Counter state.
  //
  const CounterDisplay = withConsumer(CounterProvider,sliceOfState)(Display);
  const CounterIncrementButton = withConsumer(CounterProvider)(IncrementButton);
  const CounterDecrementButton = withConsumer(CounterProvider)(DecrementButton);
  
  return (
    <div>
      <CounterDisplay />
      <CounterIncrementButton />
      <CounterDecrementButton />
    </div>
  )
}

export default withProvider(CounterProvider)(Counter)
