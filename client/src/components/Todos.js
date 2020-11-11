import React, { Component } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import url from "./url";

export class Todos extends Component {
    constructor(props) {

        super()
        this.state = {
            todos: props.location.query.todos,
            id: props.location.query._id,
            item: ""
        }
    }

    changeHandler = (event) => {
        this.setState({ item: event.target.value })
    }

    clickHandler = async (event) => {
        event.preventDefault()
        console.log(this.state.item);
        let todos = this.state.todos;

        await axios.post(`${url}/todos/add`,
            {
                id: this.state.id,
                todo: this.state.item,
            },
            {
                headers: { "Content-Type": "application/json" }
            })

        todos.push(this.state.item)
        this.setState({ item: '', todos })
    }


    render() {

        return (
            <Container style={{
                display: "grid",
                placeItems: "center",
                marginTop: "4%"
              }}>
                <TextField type="text" onChange={this.changeHandler} value={this.state.item}/>
                <br/>
                <Button type="submit" variant="contained" color="primary" onClick={this.clickHandler}>Add</Button>

                <div>
                    <ul>{this.state.todos.map((todo, index) => 
                        <li key={index}>
                            {todo}
                        </li>
                    )}</ul>
                </div>
            </Container>
        )
    }
}

export default Todos
