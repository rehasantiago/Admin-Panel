import React,{Component} from "react"
import { instanceOf } from 'prop-types';
import { Redirect } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    render(){
        if(!this.props.cookies.get('user')) return <Redirect to='/'/>
        const {name, email} = this.props.cookies.get('user')
        return (
            <div style={{fontFamily: 'Teko, sans-serif'}}>
                <center><h4>Name: {name}</h4>
                <br/>
                <h4>Email: {email}</h4></center>
            </div>
        )   
    }
}

export default withCookies(Dashboard)