import React,{ Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './Navbar.css'

class Navbar extends Component{
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
    componentDidMount(){
        var elem = document.querySelector(".sidenav");
            var instance = M.Sidenav.init(elem, {
                edge: "left",
                inDuration: 250
            });
      }
      logout(){
        this.props.cookies.remove('taskToken')
        this.props.cookies.remove('user')
      }
    render(){
      const links = !this.props.cookies.get('taskToken') ? <li><Link to='/login'>Login</Link></li> : <li><Link onClick={this.logout.bind(this)}>Logout</Link></li>
        return (
          <nav className='fixed nav-wrapper navlink container-fluid sticky-top'>
            <div className='row' id='navbar'>
                <div className="col" id='align-bars'>
                    <div className="nav-container">
                        <a className="sidenav-trigger navlink" id='bars' data-target="Contact Us-as">
                            <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
            <ul className="sidenav" id="Contact Us-as">
              {links}
            </ul>
          </nav>
        )
      }
    }
    

export default withCookies(Navbar)