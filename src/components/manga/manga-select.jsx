import React from 'react';
// import $ from 'jquery';
// import query from 'json-query';

export default class MangaSelect extends React.Component {
  constructor() {
    super();
  }
  getTitle() {
    return this.props.title;
  }
  render() {
    return (
      <a>{ this.getTitle }</a>
    );
  }
}
