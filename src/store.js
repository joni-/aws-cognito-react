import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';

import AuthReducers from './Auth/Reducers';
import sagas from './Auth/sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(AuthReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

export default store;
