import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Admin extends Component{
    componentDidMount() {
        const socket = socketIOClient("http://127.0.0.1:5000");
        console.log(socket)
        socket.emit("initial_data");
        socket.on("get_data", (users) =>{
            console.log(users)
        })
    }
    render(){
        return (
            <div>
                Good
            </div>
        )
    }
}

export default Admin