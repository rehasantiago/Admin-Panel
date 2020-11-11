import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import url from "./url";

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            users: null,
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                { title: 'Todos Link', field: 'link', render: rowData => <Link to={{ pathname: "/todos", query: { _id: rowData._id, todos: rowData.todos } }}>Go to todos</Link>, editable: 'never' },
            ],
            data: null
        }
        this.updateData = this.updateData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }

    componentWillMount() {
        axios.get(`${url}/users/users`,
            {
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                console.log(res, "res.data.users");
                let users = res.data.users;
                users = users.map((user) => {
                    return {
                        ...user,
                        link: { _id: user._id, todos: user.todos }
                    }
                })

                this.setState({
                    data: users
                })
            })
    }

    async updateData(data) {
        await axios.post(`${url}/users/update`,
            data,
            {
                headers: { "Content-Type": "application/json" }
            })
    }

    async deleteData(data) {
        await axios.post(`${url}/users/delete`,
            data,
            {
                headers: { "Content-Type": "application/json" }
            })
    }

    render() {
        const { data } = this.state
        if (!data) return <div>Loading...</div>
        return (

            <Container style={{marginTop: "4%"}}>
                <div className='' style={{ overflowX: 'auto' }}>
                    <MaterialTable
                        title="Mentors"
                        columns={this.state.columns}
                        data={this.state.data}
                        search={false}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        this.setState({
                                            data: [...dataUpdate]
                                        })
                                        this.updateData({
                                            id: newData._id,
                                            name: newData.name,
                                            email: newData.email
                                        })

                                        resolve();
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        this.setState({
                                            data: [...dataDelete]
                                        })
                                        this.deleteData({ id: oldData._id })

                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </div>
                <br />
                <Button variant="contained" color="primary">
                    <Link to='/newUser' style={{color:"white", textDecoration: "none"}}>New Mentor</Link>
                </Button>

            </Container>
        )
    }
}

export default Admin