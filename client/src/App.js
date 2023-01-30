import HeaderBox from './components/headerFooter/header.js'
import RoutePage from './pages/routing/map/index.js';
import { Provider } from 'react-redux';
import configureStore from "./store";

const store = configureStore();

function App() {
  return (
    <>
      <header>
        <HeaderBox />
      </header>
      <Provider store={store}>
        <RoutePage />
      </Provider>
      <footer></footer>
    </>
  );
}

export default App;
