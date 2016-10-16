import React from 'react';
import classNames from 'classnames'
import styles from './manga.scss'
import $ from 'jquery';

export default class MangaChapters extends React.Component {
  constructor() {
    super();
    this.state = {
      view: ""
    }
  }

  onSelect(id) {
    $.getJSON("http://www.mangaeden.com/api/chapter/" + id, JSON => {
      this.setState({ images: JSON.images.map(this.createImage) });
    })
  }

  createImage(image, index) {
    let baseURL = "https://cdn.mangaeden.com/mangasimg/"
    return (
      <img className={ classNames('img-responsive', styles.image) } key={ index } src={ baseURL + image[1] } />
    )
  }

  render() {
    return (
      <li>
        <a onClick={ this.onSelect.bind(this, this.props.id) } className={ styles.selectionLink }>{ 'Volume ' + this.props.volume }</a>
        { this.state.images }
      </li>
    );
  }
}
