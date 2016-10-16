import React from 'react';
import styles from './manga.scss'
import $ from 'jquery';

export default class MangaSelect extends React.Component {
  constructor() {
    super();
  }

  onSelect(id) {
    $.getJSON("http://www.mangaeden.com/api/manga/" + id, JSON => {
      console.log(JSON);
    })
  }

  render() {
    return (
      <li className={ styles.selectionLink } >
        <a onClick={ this.onSelect.bind(this, this.props.id) }>{ this.props.title }</a>
      </li>
    );
  }
}
