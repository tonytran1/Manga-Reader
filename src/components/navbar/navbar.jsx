import React from 'react';
import classNames from 'classnames'
import styles from './navbar.scss';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className={ classNames("navbar navbar-inverse navbar-fixed-top", styles.navBar) }>
        <div className="container">
          <div className="navbar-header">
            <a><img className={ classNames('navbar-brand', styles.navBrand, styles.inline) } src="assets/logo.png" /></a>
            <form className={ classNames("navbar-menu navbar-form navbar-right", styles.inline) }>
              <div className="input-group">
                <input className={ classNames(styles.input, "form-control") } id="search-value" type="text" placeholder="Search"/>
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
