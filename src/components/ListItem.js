import React, { Component } from 'react';
import firebase from '../config/dbconfig';

class ListItem extends Component {
    state = {
        id: this.props.taskId,
        task: this.props.task,
        isComplete: this.props.isComplete
    }

    handleClick = (e) => {
        let status = this.state.isComplete;
        this.setState({ isComplete: !status })
        firebase.firestore().collection('tasks').doc(this.state.id).update({
            isComplete: !status
        });
    }

    handleDelete = () => {
        firebase.firestore().collection('tasks').doc(this.state.id).delete().catch(function (err) {
            console.log("Error removing document: ", err);
        });
    }

    render() {
        return (
            <li className="todo-item">
                <input type="checkbox" checked={this.state.isComplete ? "checked" : ""} onChange={this.handleClick} />
                <p>{this.state.task}</p>
                <i className="far fa-trash-alt" onClick={this.handleDelete}></i>
            </li>
        );
    }
}

export default ListItem;