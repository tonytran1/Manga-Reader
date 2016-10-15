import React from 'react';
import $ from 'jquery';
import query from 'json-query';

export default class Manga extends React.Component {
  constructor() {
    super();
    this.parse();
  }
  parse() {
    let string = "";
    $.getJSON("http://www.mangaeden.com/api/list/0/", JSON => {
      query('manga[**][*t=?]', 'Flower Dream', {data: JSON});
      for (let i = 0; i < 10; i++)
        string += (JSON.manga[i].t + " ");
    })
    return string;
  }
  render() {
    return (
      <div>
        { this.parse() }
      </div>
    );
  }
}
