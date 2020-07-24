import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import logger from 'redux-logger';

import rootSaga from './modules/cart/sagas';
import rootReducer from './modules/combineReducer';

//create the saga middleware 
const sagaMiddlWare = createSagaMiddleWare();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddlWare,logger)
);

//then run the saga
sagaMiddlWare.run(rootSaga);
export default store;