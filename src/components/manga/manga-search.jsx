import React from 'react';
import $ from 'jquery';
import styles from './manga.scss'
import query from 'json-query';
import MangaSelect from './manga-select'

export default class MangaSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: {
        manga: []
      }
    }

  }
  componentWillReceiveProps(props) {
    this.parse(props.search);
  }

  parse(searchQuery) {
    console.log("Parsing");
    searchQuery = searchQuery.toLowerCase();
    $.getJSON("http://www.mangaeden.com/api/list/0/", JSON => {
      this.setState({ download: "http://www.mangaeden.com/api/list/0/",
                      loading: "true"});
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
    let regExpressions = [];
    let searchTerms = searchQuery.split(" ");
    let results = {
      manga: []
    };
    regExpressions.push(new RegExp(searchQuery + "\\s*\\w*", "g"))
    searchTerms.forEach(function(term) {
      regExpressions.push(new RegExp(term + "\\s*\\w*", "g"))
    });
    input.map(function(manga) {
      let baseURL = "https://cdn.mangaeden.com/mangasimg/"
      if (manga.h !== 0 && regExpressions.some(rx => rx.test(manga.t.toLowerCase()))) {
        results.manga[index] = {
          title: manga.t,
          id: manga.i,
          genre: manga.c,
          thumbnail: baseURL + manga.im
        }
        index++;
      }
    })
    this.setState({results: results});
  }

  createSelection(manga, index) {
    return ( <MangaSelect key={ index } title={ manga.title } id={ manga.id } /> )
  }

  render() {
    return (
      <div>
        <ul className={ styles.listGroup }>
          { this.state.results.manga.map(this.createSelection) }
        </ul>
      </div>
    );
  }
}
