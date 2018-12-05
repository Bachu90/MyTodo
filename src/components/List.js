import React, { Component } from 'react';
import ListItem from './ListItem';
import firebase from '../config/dbconfig';

class List extends Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        const db = firebase.firestore();
        db.collection("tasks").orderBy("added", "asc").onSnapshot((data) => {
            const tasks = [];
            data.forEach((doc) => {
                tasks.push({
                    id: doc.id,
                    task: doc.data().task,
                    isComplete: doc.data().isComplete
                })
            });
            this.setState({ tasks });
        });
    }

    render() {
        return (
            <ul className="todo-list">
                {this.state.tasks.map(({ id, task, isComplete }) => {
                    return <ListItem key={id} taskId={id} task={task} isComplete={isComplete} />;
                })}
            </ul>
        );
    }
}

export default List;