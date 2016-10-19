import React from 'react';
import styles from './manga.scss';
import classNames from 'classnames';
import $ from 'jquery';
import { Carousel } from '../carousel/carousel';

export default class MangaChapters extends React.Component {
  constructor() {
    super();
    this.state = {
      images: '',
      loading: false
    }
    $(document).on('click', '.close-btn', () => {   this.setState({ images: '' }); });
  }

  onSelect(id) {
    if (this.state.images) {
      this.setState({ images: '' });
    } else {
      this.setState({ loading: true });
      $.getJSON("http://www.mangaeden.com/api/chapter/" + id, JSON => {
        this.createView(JSON.images);
      })
    }
  }

  createView(images) {
    let render = [];
    for (let i = 0; i < images.length; i++ ) {
      render.push(this.createImage(images[i], i, images.length))
    }
    this.setState({ images: render, loading: false });
  }

  createImage(image, index, length) {
    let baseURL = "https://cdn.mangaeden.com/mangasimg/"
    if (this.divideCloseButtons(index, length))  {
      return (
        <div className='manga-images' key={ index } >
          <img className={ classNames('img-responsive', styles.image) } src={ baseURL + image[1] } />
          <p className={ styles.page }>{ "Page " + (index + 1) }</p>
          <a className={ classNames('close-btn', styles.selectionLink, styles.close) }>{ 'Close' }</a>
          <hr />
        </div>
      )
    } else {
      return (
        <div className='manga-images' key={ index } >
          <img className={ classNames('img-responsive', styles.image) } src={ baseURL + image[1] } />
          <p className={ styles.page } >{ "Page " + (index + 1) }</p>
          <hr />
        </div>
      )
    }
  }

  divideCloseButtons(index, length) {
    return index === (length - 1)
        || index === Math.floor(length * 0.25)
        || index === Math.floor(length * 0.50)
        || index === Math.floor(length * 0.75)

  }

  render() {
    if (this.state.loading) {
      return (
        <li className={ styles.li }>
          <a onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.volume, styles.selectionLink) }>{ 'Volume ' + this.props.volume }</a>
          <br />
          <img className={ classNames('img-responsive', styles.image) } src="assets/loading.gif" />
        </li>
      )
    } else {
      return (
        <div>
          <a onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.volume, styles.selectionLink) }>{ 'Volume ' + this.props.volume }</a>
          <Carousel>
            { this.state.images }
          </Carousel>
        </div>
      )
    }
  }
}
