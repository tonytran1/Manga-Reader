import React from 'react';
import $ from 'jquery';
import styles from './manga.scss'
import query from 'json-query';
import classNames from 'classnames'
import MangaSelect from './manga-select'

export default class MangaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      loading: false,
      results: {
        manga: []
      }
    }
  }

  componentWillReceiveProps(props) {
    this.parse(props.search);
  }

  parse(searchQuery) {
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
    let regExpressions = this.getRegExpressions(searchQuery);
    let results = {
      manga: []
    };
    input.map(function(manga) {
      let baseURL = "https://cdn.mangaeden.com/mangasimg/"
      if (manga.h !== 0 && regExpressions.some(rx => rx.test(manga.t.toLowerCase()))) {
        results.manga[index] = {
          title: manga.t,
          id: manga.i,
          hits: manga.h,
          thumbnail: baseURL + manga.im
        }
        index++;
      }
    })
    results.manga.sort((a, b) => {
      if (a.hits < b.hits)
        return 1;
      return 0;
    })
    this.setState({ results: results,
                    loading: false });
  }

  getRegExpressions(searchQuery) {
    let regExpressions = [];
    let searchTerms = searchQuery.split(" ");
    let length = searchTerms.length;
    regExpressions.push(new RegExp(searchQuery + "(...)*", "g"));
    regExpressions.push(new RegExp(searchQuery.replace(/\s+/g, '') + "(...)*", "g"));
    regExpressions.push(new RegExp(searchTerms[0] + "(...)*", "g"));
    regExpressions.push(new RegExp("(...)*" + searchTerms[length], "g"));
    return regExpressions;
    // searchTerms.forEach(function(term) {
    //   regExpressions.push(new RegExp(term + "(...)*", "g"));
    // });
  }

  createSelection(manga, index) {
    let image = ( <img className={ classNames('img-responsive', styles.image) } src={ manga.thumbnail } /> );
    return ( <MangaSelect key={ index } title={ manga.title } id={ manga.id } image={ image } /> )
  }

  render() {
    let length = this.state.results.manga.length;
    if (this.state.loading) {
      return (
        <img className={ classNames('img-responsive', styles.image) } src="assets/loading.gif" />
      )
    } else if (length >= 300) {
      return (
        <h4 className={ styles.center } >{ "Too many results. Try narrowing your search" }</h4>
      )
    } else if (length === 0) {
      return (
        <h4 className={ styles.center } >{ "No current results for search field." }</h4>
      )
    } else {
      return (
        <div>
          <ul className={ styles.listGroup }>
            { this.state.results.manga.map(this.createSelection) }
          </ul>
        </div>
      )
    }
  }
}
