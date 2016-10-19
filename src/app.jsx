import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';
import $ from 'jquery';
import MangaSearch from './components/manga/manga-search.jsx';
import Navbar from './components/navbar/navbar.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "false"
    }
    if (document.location.protocol === ("https:"))
      document.location = "http://manga-readers.herokuapp.com/"
    $(document).on('click', '#search-btn', () => {
      this.search();
    });
    $(document).on('keypress', (event) => {
      if (event.which === 13) {
        event.preventDefault();
        this.search();
      }
    });
  }

  search() {
    let value = $('#search-value')[0].value;
    if (!value || !value.length)
      return;
    this.setState({ search: value });
  }

  render() {
    return (
      <div>
        <Navbar />
        <MangaSearch search={ this.state.search } />
      </div>
    )
  }
}
