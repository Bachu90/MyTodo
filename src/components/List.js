import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import middleware from '../redux/middleware';


const List = props => {

    useEffect(() => {
        props.getAllTodos();
    }, []);

    if (!props.receiving) {
        if (props.todos.length > 0) {
            return (
                <ul className="todo-list">
                    {props.todos.map(({ id, task, isComplete, added }) => {
                        return <ListItem key={id} taskId={id} task={task} isComplete={isComplete} added={added} />;
                    })}
                </ul>
            );
        } else {
            return (
                <ul className="todo-list">
                    <li className="todo-item">
                        <input type="checkbox" style={{ "opacity": 0, "cursor": "auto" }} disabled />
                        <p>Hoooray! Nothing left to do...</p>
                        <i className="far fa-trash-alt" style={{ "opacity": 0, "cursor": "auto" }} />
                    </li>
                </ul>
            );
        }
    } else {
        return (
            <ul className="todo-list">
                <li className="todo-item">
                    <input type="checkbox" style={{ "opacity": 0 }} />
                    <p>Loading...</p>
                    <i className="far fa-trash-alt" style={{ "opacity": 0 }} />
                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    receiving: state.receiving,
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    getAllTodos: () => dispatch(middleware.getAllTodos())
})


export default connect(mapStateToProps, mapDispatchToProps)(List);