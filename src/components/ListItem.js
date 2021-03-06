import React from 'react';
import { connect } from 'react-redux';
import middleware from '../redux/middleware';

const ListItem = props => {

    const handleUpdate = (e) => {
        props.updateTodo(props.taskId, props.task, props.isComplete, props.added);
    }

    const handleDelete = () => {
        props.deleteTodo(props.taskId);
    }
    return (
        <li className="todo-item">
            {
                props.updating === props.taskId ?
                    <i className="fas fa-spinner loader-spinner checkbox"></i> :
                    <input type="checkbox" checked={props.isComplete ? "checked" : ""} onChange={handleUpdate} />
            }

            <p>{props.task}</p>
            {
                props.deleting === props.taskId ?
                    <i className="fas fa-spinner loader-spinner"></i> :
                    <i className="far fa-trash-alt" onClick={handleDelete}></i>
            }
        </li>
    );

}

const mapStateToProps = state => ({
    deleting: state.deleting,
    updating: state.updating
})

const mapDispatchToProps = dispatch => ({
    deleteTodo: (id) => dispatch(middleware.deleteTodo(id)),
    updateTodo: (id, task, isComplete, added) => dispatch(middleware.updateTodo(id, task, isComplete, added))
})


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);