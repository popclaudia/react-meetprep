import './App.css';
import Main from './components/app';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import contactsReducer from './reducers';

function App() {

  const store = createStore(contactsReducer);

  return (
    <Provider store = {store}>
      <Main />
    </Provider>
  );
}

export default App;
