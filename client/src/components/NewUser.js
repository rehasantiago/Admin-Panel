import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import url from "./url";

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      errors: {},
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    this.setState({
      status: ""
    })
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
    };
    axios.post(`${url}/users/add`, newUser,
      {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            name: "",
            email: "",
            errors: {},
          })
          this.setState({
            status: "User added successfully"
          })
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          this.setState({
            errors: err.response.data
          })
        }
      })
  };
  render() {
    const { errors } = this.state;
    return (
      <Container style={{
        display: "grid",
        placeItems: "center",
        height: "80vh"
      }}>
        <div className="row forms">
          <div className="col s8">
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <TextField
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  label="Name"
                />

                <span style={{ color: "red" }}>{errors.name}</span>
              </div>
              <div>
                <TextField
                  fullWidth
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  label="Email"

                />

                <span style={{ color: "red" }}>{errors.email}</span>
              </div>

              <div className="col s12" style={{}}>
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
                <br />
              </div>
            </form>
            <span style={{ color: "green" }}>{this.state.status}</span>
            <br />
            <Link to="/">Go back to admin page</Link>
          </div>
        </div>
      </Container>
    );
  }
}

export default NewUser
