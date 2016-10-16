import React from 'react';
import $ from 'jquery';
import query from 'json-query';
import MangaSelect from './manga-select'

export default class MangaSearch extends React.Component {
  constructor() {
    super();
    this.parse("naRuto shippuden");
    this.state = {
      download: false,
      loading: "false",
      results: "Loading"
    }
  }

  parse(searchQuery) {
    let string = "";
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
      for (let i = 0; i < 10; i++)
        string += (JSON.manga[i].t + " ");
    })
    return string;
  }

  search(input, searchQuery) {
    let index = 0;
    let regExpressions = [];
    let searchTerms = searchQuery.split(" ");
    let results = {
      manga: {
      }
    };
    regExpressions.push(new RegExp(searchQuery + "\\s*\\w*", "g"))
    searchTerms.forEach(function(term) {
      regExpressions.push(new RegExp(term + "\\s*\\w*", "g"))
    });
    input.map(function(manga) {
      let baseURL = "https://cdn.mangaeden.com/mangasimg/"
      //manga.t.match(reg)
      if (regExpressions.some(rx => rx.test(manga.t.toLowerCase()))) {
        results.manga[index] = {
          title: manga.t,
          id: manga.i,
          genre: manga.c,
          thumbnail: baseURL + manga.im
        }
        index++;
      }
    })
  //  console.log(results);
    this.setState({results: results});
    console.log(this.state.results);
  }

  createSelection() {
    return (
      <MangaSelect title={ this.state.results[{index}].title } />
      )
  }

  render() {
    return (
      <div>
        <div onChange={ this.createSelection }>{this.state.results}</div>
        <a href={ this.state.download }>{ this.state.loading }</a>
      </div>
    );
  }
}
