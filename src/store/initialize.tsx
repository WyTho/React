import { combineReducers, compose, createStore } from 'redux';
import themeReducer from './reducers/theme/index';
import dataReducer from './reducers/data/index';
import middlewares from './middlewares';

const rootReducer = combineReducers({
    theme: themeReducer,
    data: dataReducer
});

// const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, composeEnhancers(middlewares));
