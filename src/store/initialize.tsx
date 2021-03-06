import { combineReducers, compose, createStore } from 'redux';
import themeReducer from './reducers/theme/index';
import dataReducer from './reducers/data/index';
import popupReducer from './reducers/popup/index';
import middlewares from './middlewares';

const rootReducer = combineReducers({
    theme: themeReducer,
    data: dataReducer,
    popup: popupReducer,
});

// const windowIfDefined = typeof window === 'undefined' ? null : window as any;
let composeEnhancers;
if (!(typeof window === 'undefined')) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}

export default createStore(rootReducer, composeEnhancers(middlewares));
