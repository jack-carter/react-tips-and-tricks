import React from 'react'

const NO_STATE_MAPPINGS = {}
const NO_ACTION_MAPPINGS = {}

export function createProvider(reducer,initialState,context = React.createContext()) {
  return {
    context: context,
    useReducer: () => React.useReducer(reducer, initialState)
  }  
}

export const withProvider = provider => Component => props => {
  const [state, dispatch] = provider.useReducer()
  return (
    <provider.context.Provider value={{ state, dispatch }}>
      <Component />
    </provider.context.Provider>
  )
}

export const withConsumer = (provider, stateMapper, actionMapper) => {
  return withContext(provider.context,stateMapper,actionMapper)
}

export const withContext = (context,stateMapper,actionMapper) => Component => props => {
  return withDefaults(NO_STATE_MAPPINGS,NO_ACTION_MAPPINGS)(context,stateMapper,actionMapper)
}

export const withActions = (defaultActions) => (context,stateMapper,actionMapper) => Component => props => {
  return withDefaults(NO_STATE_MAPPINGS,defaultActions)(context,stateMapper,actionMapper)
}

export const withDefaults = (defaultStateMappings,defaultActionMappings) => (context,stateMapper,actionMapper) => Component => props => (
  <context.Consumer>
  {({ state, dispatch }) => {
    const remappedState = stateMapper ? stateMapper(state) : defaultStateMappings;
    const remappedActions = actionMapper ? actionMapper(dispatch) : defaultActionMappings(dispatch);
    const combinedStates = { ...props, ...remappedState, ...remappedActions };
    return <Component {...combinedStates}>{props.children}</Component>;
  }}
  </context.Consumer>
)


