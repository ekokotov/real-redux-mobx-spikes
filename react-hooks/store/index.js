import React from 'react';
import reducers from "./reducer";

const INIT = 'INIT';

export const Store = React.createContext();

export function StoreProvider(props) {
    const [state, storeDispatch] = React.useReducer(reducers);

    function dispatch(action) { //own dispatch
        if (typeof action === 'function') {
            return action(dispatch);
        }
        return storeDispatch(action)
    }

    if (!state) {
        dispatch({type: INIT}); // to init all initial states of reducers;
    }
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}

export function connect(mapStateToProps, mapActions) {
    return Component => React.memo(() => {
        const {state, dispatch} = React.useContext(Store);
        const mappedActions = {};

        for (const key in mapActions) {
            if (mapActions.hasOwnProperty(key)) {
                mappedActions[key] = args => dispatch(mapActions[key](args))
            }
        }
        // rewrite componentWillReceiveProps ?
        // componentWillReceiveProps(nextProps) {
        //     console.log('Current props: ', this.props);
        //     console.log('Next props: ', nextProps);
        // }

        // Wraps the input component in a container, without mutating it. Good!
        return <Component {...mapStateToProps(state)}
                          {...mappedActions}
        />;
    })
}
