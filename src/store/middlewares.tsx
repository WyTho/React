import thunk from 'redux-thunk';
import {Action, applyMiddleware} from 'redux';

const logger: any = (store: any) => {
    return (next: any) => {
        return (action: Action) => {
            const result = next(action);
            console.log(`[Middleware] Dispatching '${action.type}', resulting state:`, store.getState());
            return result;
        }
    }
};

export default applyMiddleware(logger, thunk);
