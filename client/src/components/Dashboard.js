import React,{Component} from "react"
import { instanceOf } from 'prop-types';
import { Redirect } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    render(){
        console.log(this.props.cookies.get('user'))
        if(!this.props.cookies.get('user')) return <Redirect to='/login'/>
        const {name, email} = this.props.cookies.get('user')
        return (
            <div>
                Name: {name}
                <br/>
                Email: {email}
            </div>
        )   
    }
}

export default withCookies(Dashboard)