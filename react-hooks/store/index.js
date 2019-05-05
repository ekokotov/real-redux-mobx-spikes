import React from 'react';
import reducers from "./reducer";

const INIT = 'INIT';

export const Store = React.createContext();

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducers);
    if (!state) {
        dispatch({type: INIT}); // to init all initial states of reducers;
    }
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}
