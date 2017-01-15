import React from 'react';
import styles from './manga.scss';
import classNames from 'classnames';
import $ from 'jquery';
//import { Carousel } from '../carousel/carousel';

export default class MangaChapters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      images: '',
      loading: false,
    }
  }

  onClose(id, page) {
    this.setState({ images: '' });
    window.scrollTo(0, 0);
    localStorage.setItem(id, "Page " + page);
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
      render.push(this.createImage(images[i], i));
      // render.push(this.createImage(images[i], i, images.length))
    }
    this.setState({ images: render, loading: false });
  }

  createImage(image, index) {
    let baseURL = "https://cdn.mangaeden.com/mangasimg/";
    // if (this.divideCloseButtons(index, length))  {
    return (
      <div className='manga-images' key={ index } >
        <img className={ classNames('img-responsive', styles.image) } src={ baseURL + image[1] } />
        <a onClick={ this.onClose.bind(this, this.props.id, index + 1) } className={ classNames('close-btn', styles.selectionLink, styles.close) }>
          <p>Close Volume</p><p className={ styles.small }>Page { (index + 1) }</p>
        </a>
        <hr />
      </div>
    )
    // } else {
    //   return (
    //     <div className='manga-images' key={ index } >
    //       <img className={ classNames('img-responsive', styles.image) } src={ baseURL + image[1] } />
    //       <p className={ styles.page } >{ "Page " + (index + 1) }</p>
    //       <hr />
    //     </div>
    //   )
    // }
  }

  // divideCloseButtons(index, length) {
  //   return index === (length - 1)
  //       || index === Math.floor(length * 0.25)
  //       || index === Math.floor(length * 0.50)
  //       || index === Math.floor(length * 0.75)
  // }

  render() {
    if (this.state.loading) {
      return (
        <li className={ styles.li }>
          <a onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.volume, styles.selectionLink) }>{ 'Volume ' + this.props.volume }</a>
          <br />
          <img className={ classNames('img-responsive', styles.image) } src="assets/loading.gif" />
        </li>
      )
    }
    else if (localStorage.getItem(this.props.id)) {
      return (
        <li className={ styles.li }>>
          <a onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.volume, styles.selectionLink) }>
            <p>{ 'Volume ' + this.props.volume }</p>
            <p className={ styles.small }>{ localStorage.getItem(this.props.id) }</p>
          </a>

          { this.state.images }
        </li>
      )
    }
    else {
      return (
        <li className={ styles.li }>>
          <a onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.volume, styles.selectionLink) }>
            <p>{ 'Volume ' + this.props.volume }</p>
          </a>

          { this.state.images }
        </li>
      )
    }
  }
}
