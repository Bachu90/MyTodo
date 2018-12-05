import React, {Component} from 'react';
import firebase from '../config/dbconfig';

class ListItem extends Component {
    state = {
        id: this.props.taskId,
        task: this.props.task,
        isComplete: this.props.isComplete
    }

    render(){

        const handleClick = (e) => {
            let status = this.state.isComplete;
            this.setState({isComplete: !status})
        }

        const handleDelete = () => {
            firebase.firestore().collection('tasks').doc(this.state.id).delete();
        }

        return(
            <li className="todo-item">
                <input type="checkbox" checked={this.state.isComplete ? "checked" : ""} onChange={handleClick} />
                <p>{this.state.task}</p>
                <i className="far fa-trash-alt" onClick={handleDelete}></i>
            </li> 
        );
    }
}

export default ListItem;