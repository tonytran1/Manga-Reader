import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import MangaSearch from './components/manga/manga-search.jsx';
import Navbar from './components/navbar/navbar.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <MangaSearch />
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a className="btn btn-primary btn-lg">Enjoy!</a></p>
      </div>
    )
  }
}
