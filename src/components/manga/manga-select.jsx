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
      numberOfVolumes: 50,
      order: 'Ordered by Latest',
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
      this.createVolumes(id, this.state.order);
    }
  }

  changeOrder(id) {
    if (this.state.order.includes('Latest')) {
      this.setState({ order: 'Ordered by Oldest' });
    } else {
      this.setState({ order: 'Ordered by Latest' });
    }
    this.setState({ loading: true });
    this.createVolumes(id, this.state.order);
  }

  createVolumes(id, order) {
    $.getJSON("http://www.mangaeden.com/api/manga/" + id, JSON => {
      let chapters = [];
      // let volumes = JSON.chapters.slice(0, this.state.numberOfVolumes);
      chapters.push((<li key='-2' className={ styles.genre }>{ this.props.genre.join(",  ") }</li>));
      chapters.push((<br />));
      chapters.push((<li key='-1' onClick={ this.changeOrder.bind(this, id) } className={ styles.toggle }>{ order }</li>));
      if (order.includes('Oldest')) {
        chapters.push(JSON.chapters.reverse().map(this.createLink));
      } else {
        chapters.push(JSON.chapters.map(this.createLink));
      }
      // chapters.push(this.showMore());
      this.setState({ chapters: chapters,
                      loading: false });
    });
  }

  // showMore() {
  //   return ( <button className={ styles.showMoreButton } onClick={ this.showMore }> Show More</button> );
  // }

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
