import React from 'react';
import styles from './manga.scss'
import classNames from 'classnames'
import $ from 'jquery';

export default class MangaChapters extends React.Component {
  constructor() {
    super();
    this.state = {
      view: ""
    }
  }

  onSelect(id) {
    if (this.state.images) {
      this.setState({images: ""});
    } else {
      $.getJSON("http://www.mangaeden.com/api/chapter/" + id, JSON => {
        this.setState({ images: JSON.images.map(this.createImage) });
      })
    }
  }

  createImage(image, index) {
    let baseURL = "https://cdn.mangaeden.com/mangasimg/"
    return (
      <div key={ index } >
        <img className={ classNames('img-responsive', styles.image) } src={ baseURL + image[1] } />
        <p>{ "Page " + (index + 1) }</p>
        <hr />
      </div>
    )
  }

  render() {
    return (
      <li className={ styles.volume } >
        <a onClick={ this.onSelect.bind(this, this.props.id) } className={ styles.selectionLink }>{ 'Volume ' + this.props.volume }</a>
        <br />
        { this.state.images }
      </li>
    );
  }
}
