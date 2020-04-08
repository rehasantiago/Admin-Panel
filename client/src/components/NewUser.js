import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class NewUser extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    this.setState({
        status:""
    })
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('http://127.0.0.1:8000/api/newUser',newUser,
    axios.defaults.headers.common['authorization'] = this.props.cookies.get('AdminToken'),
    {
      headers:{"Content-Type": "application/json"}
    })
    .then(res => {
      if(res.data.success){
        this.setState({
          name:"",
          email:"",
          password:"",
          errors: {},
        })
        this.setState({
            status: "User added successfully"
        })
      }
    })
    .catch(err => {
        console.log(err)
        if(err.response){
            this.setState({
                errors:err.response.data
              })
        }
    })
  };
  render() {
    if(!this.props.cookies.get('AdminToken')) return <Redirect to='/'/>
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row forms">
          <div className="col s8">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
                <span style={{color:"red"}}>{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
                <span style={{color:"red"}}>{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
                <span style={{color:"red"}}>{errors.password}</span>
              </div>
             
              <div className="col s12" style={{  }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add
                </button>
                <br/>
              </div>
            </form>
            <span style={{color:"green"}}>{this.state.status}</span>
            <Link to="/admin">Go back to admin page</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(NewUser)
