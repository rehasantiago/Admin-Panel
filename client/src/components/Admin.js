import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Admin extends Component{
    constructor(){
        super()
        const socket = socketIOClient("http://127.0.0.1:8000");
    }
    // componentDidMount() {
    //     socket.emit("initial_data");
    //     socket.on("get_data", (users) =>{
    //         console.log(users)
    //     })
    // }
    render(){
        return (
            <div>
                Good
            </div>
        )
    }
}

export default Admin