import { useEffect } from 'react';
import io from 'socket.io-client';
import { API_URL } from './api/local-api';
import './styles/app.css';
import { useDispatch } from 'react-redux';
import { connect, disconnect } from './store/reducers/socket/socket-slice';
import Shares from './feature/shares/shares';
import Search from './feature/search/search';
import Favorites from './feature/favorites/favorites';
import Settings from './feature/settings/settings';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io.connect(API_URL);
    dispatch(connect(socket));
    return () => {
      socket.disconnect();
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className="app">
      <section className="app-top-bar">
        <Search />
        <Favorites />
        <Settings />
      </section>
      <Shares />
    </main>
  );
}

export default App;
