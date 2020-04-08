import React, { Component } from "react";
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Moment from 'react-moment';

class Admin extends Component{
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(){
        super()
        this.state = {
            users: null
        }
    }

    componentWillMount(){
        axios.get('http://127.0.0.1:8000/api/users',
        axios.defaults.headers.common['authorization'] = this.props.cookies.get('AdminToken'),
        {
            headers:{"Content-Type": "application/json"}
          }).then(res => {
            this.setState({
                users:res.data.users
            })
          })
    }

    onChange = async(e) => {
        const email = e.target.value
        const checked = e.target.checked
        console.log(email, checked)
        await axios.post('http://127.0.0.1:8000/api/disable',{email, checked},
        axios.defaults.headers.common['authorization'] = this.props.cookies.get('AdminToken'),
        {
            headers:{"Content-Type": "application/json"}
        })
    }

    render(){
        if(!this.props.cookies.get('AdminToken')) return <Redirect to="/"/>
        const { users } = this.state
        if(!users) return <div>Loading...</div>
        return (
            <div className="container">
                <div className='' style={{overflowX: 'auto'}}>
                    <table className='table table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Last Active</th>
                                <th scope="col">Disable Login?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,index) => {
                                    const date = new Date(user.lastActive)
                                    const d = !user.lastActive ? "User has not logged in yet" : <Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment>
                                    return(
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td>{d}</td>
                                            <td><input type="checkbox" id={index} value={user.email} onChange={this.onChange} defaultChecked={user.disableLogin}/>
                                            <label htmlFor={index}>Yes</label>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </div>
                <br/>
                <Link className="btn btn-outline-dark" to='/newUser'>New User</Link>
            </div>
        )
    }
}

export default withCookies(Admin)