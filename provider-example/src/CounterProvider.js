
// All Providers must export two functions
// 
// withConsumer(...)
// withProvider(...)
//
// Default implementations for both are provided
// from Provider.js, so Providers wishing to use
// the default implementations must export those
// from Provider.js
//
import { withDefaults, createProvider } from './Provider'
export { withProvider } from './Provider'

// Custom implementation of withConsumer(...), one that provides default mappings.
// We define this solely because we have default mappings we wish to include with
// every Consumer.
//
export const withConsumer = (provider, stateMapper, actionMapper) => {
  return withDefaults({},dispatcher)(provider.context,stateMapper,actionMapper)
}

// Reducer Actions
const INCREMENT = "increment";
const DECREMENT = "decrement";

// State Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// These provide simpler functional elements to the 
// UI Components that will be updating this particular
// state.
//
const dispatcher = dispatch => {
  return {
    increment: () => dispatch({ type: INCREMENT }),
    decrement: () => dispatch({ type: DECREMENT })
  }
}

export default createProvider(reducer,{ count: 0 })