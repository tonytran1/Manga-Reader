import React from 'react';
import $ from 'jquery';
export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="player"><img className='navbar-brand logo responsive' src="assets/logo.png" /></a>
            <form className="navbar-form navbar-right">
              <div className="input-group">
                <input id="search-value" type="text" placeholder="Search" className="form-control" />
                <div className="input-group-btn">
                  <a id="search-btn" className="btn btn-md btn-block btn-secondary"><span className="glyphicon glyphicon-search"></span></a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
