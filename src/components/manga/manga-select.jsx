import React from 'react';
import Chapters from './manga-chapters'
import styles from './manga.scss'
import $ from 'jquery';

export default class MangaSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      view: ""
    }
  }

  onSelect(id) {
    if (this.state.chapters) {
      this.setState({chapters: ""});
    } else {
      $.getJSON("http://www.mangaeden.com/api/manga/" + id, JSON => {
        console.log(JSON);
        this.setState({ chapters: JSON.chapters.map(this.createLink) });
      });
    }
  }

  createLink(item, index) {
    return ( <Chapters key={ index } volume={ item[0] } id={ item[3] } /> )
  }

  render() {
    return (
      <div>
        <li className='list-group-item' >
          <a className={ styles.selectionLink } onClick={ this.onSelect.bind(this, this.props.id) }><b>{ this.props.title }</b></a>
        </li>
        <ul className={ styles.listGroup }>
          { this.state.chapters }
        </ul>
      </div>
    );
  }
}
