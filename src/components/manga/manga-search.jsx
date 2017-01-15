import React from 'react';
import $ from 'jquery';
import styles from './manga.scss'
import query from 'json-query';
import classNames from 'classnames'
import MangaSelect from './manga-select'

export default class MangaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.RESULTS_LIMIT = 150;
    this.state = {
      search: "",
      loading: false,
      currentSearch: false,
      results: {
        manga: []
      }
    }
  }

  componentWillReceiveProps(props) {
    this.parse(props.search);
  }

  parse(searchQuery) {
    if (this.state.currentSearch && this.state.currentSearch === searchQuery)
      return;
    this.setState({ loading: true });
    searchQuery = searchQuery.toLowerCase();
    $.getJSON("http://www.mangaeden.com/api/list/0/", JSON => {
      query(['manga[**]:select'], {
        data: JSON,
        locals: {
          select: input => {
            this.search(input, searchQuery);
          }
        }
      });
    })
  }

  search(input, searchQuery) {
    let index = 0;
    let rx = new RegExp(searchQuery.replace(/\s+/g, '').toLowerCase() + "(...)*", "g");
    let results = {
      manga: []
    };
    input.map(function(manga) {
      let baseURL = "https://cdn.mangaeden.com/mangasimg/";
      if (manga.h !== 0 && rx.test(manga.t.replace(/-|\s+/g, '').toLowerCase())) {
        results.manga[index] = {
          title: manga.t,
          id: manga.i,
          hits: manga.h,
          genre: manga.c,
          thumbnail: baseURL + manga.im
        }
        index++;
      }
    })
    results.manga.sort((a, b) => {
      return b.hits - a.hits;
    });
    if (results.manga.length > this.RESULTS_LIMIT)
      results.manga.splice(this.RESULTS_LIMIT);
    this.setState({ results: results,
                    currentSearch: searchQuery,
                    loading: false });
  }

  createSelection(manga, index) {
    let image = ( <img className={ classNames('img-responsive', styles.thumbnail) } src={ manga.thumbnail } /> );
    return (
      <MangaSelect key={ index } title={ manga.title } id={ manga.id } image={ image } genre={ manga.genre } />
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <img className={ classNames('img-responsive', styles.image) } src="assets/loading.gif" />
      )
    } else if (this.state.results.manga.length) {
      return (
        <div>
          <ul className={ styles.listGroup }>
            { this.state.results.manga.map(this.createSelection) }
          </ul>
        </div>
      )
    } else {
      return (
        <h5 className={ styles.center } >{ "Search for your next Manga Story." }</h5>
      )
    }
  }
}
