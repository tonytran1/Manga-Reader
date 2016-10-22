import React from 'react';
import Chapters from './manga-chapters'
import styles from './manga.scss'
import classNames from 'classnames'
import $ from 'jquery';

export default class MangaSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "",
      image: "",
      loading: false
    }
  }

  onSelect(id) {
    if (this.state.loading) {
      return;
    } else if (this.state.chapters) {
      this.setState({ chapters: "", image: "" });
    } else {
      this.setState({ loading: true });
      $.getJSON("http://www.mangaeden.com/api/manga/" + id, JSON => {
        let chapters = [];
        chapters.push((<li key='-1' className={ styles.genre }>{ this.props.genre.join(",  ")}</li>));
        chapters.push(JSON.chapters.map(this.createLink));
        this.setState({ chapters: chapters,
                        loading: false });
        let y = $(window).scrollTop();
        $("html, body").animate({ scrollTop: y + 200 }, 350);
      });
    }
  }

  createLink(item, index) {
    return ( <Chapters key={ index } volume={ item[0] } id={ item[3] } /> )
  }

  render() {
    if (this.state.loading) {
      return (
        <div className={ styles.listGroup }>
          <li onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.selectionLink, 'list-group-item') } >
            <div className={ styles.title }>
              <h5><b>{ this.props.title }</b></h5>
            </div>
            <br/>
            { this.props.image }
            <span className='glyphicon glyphicon-chevron-down'></span>
          </li>
          <ul className={ styles.listGroup }>
            <img className={ classNames('img-responsive', styles.image) } src="assets/loading.gif" />
          </ul>
        </div>
      )
    } else {
      return (
        <div className={ styles.listGroup }>
          <li onClick={ this.onSelect.bind(this, this.props.id) } className={ classNames(styles.selectionLink, 'list-group-item img-rounded') } >
            <div className={ styles.title }>
              <h5><b>{ this.props.title }</b></h5>
            </div>
            <br/>
            { this.props.image }
            <span className='glyphicon glyphicon-chevron-down'></span>
          </li>
          <ul className={ styles.listGroup }>
            { this.state.chapters }
          </ul>
        </div>
      )
    }
  }
}
