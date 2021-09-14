import './App.css';
import Main from './components/app';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import contactsReducer from './reducers';
import createSagaMiddleware from '@redux-saga/core';
import mySaga from './sagas/mySaga';

function App() {

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(contactsReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(mySaga);

  return (
    <Provider store = {store}>
      <Main />
    </Provider>
  );
}

export default App;
