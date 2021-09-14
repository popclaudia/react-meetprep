import './App.css';
import Main from './components/app';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import contactsReducer from './reducers';
import createSagaMiddleware from '@redux-saga/core';
import mySaga from './sagas/mySaga';
import thunk from 'redux-thunk';

function App() {

  const sagaMiddleware = createSagaMiddleware();

  const middleWares = [sagaMiddleware, thunk];

  const store = createStore(contactsReducer, applyMiddleware(...middleWares));

  sagaMiddleware.run(mySaga);

  return (
    <Provider store = {store}>
      <Main />
    </Provider>
  );
}

export default App;
