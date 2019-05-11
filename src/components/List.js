import React, { Component } from 'react';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import operations from '../redux/operations';


class List extends Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        this.props.getAllTodos();
    }

    render() {
        if (!this.props.receiving) {
            if (this.props.todos.length > 0) {
                return (
                    <ul className="todo-list">
                        {this.props.todos.map(({ id, task, isComplete }) => {
                            return <ListItem key={id} taskId={id} task={task} isComplete={isComplete} />;
                        })}
                    </ul>
                );
            } else {
                return (
                    <ul className="todo-list">
                        <li className="todo-item">
                            <input type="checkbox" style={{ "opacity": 0 }} />
                            <p>Hoooray! Nothing left to do...</p>
                            <i className="far fa-trash-alt" style={{ "opacity": 0 }} />
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
}

const mapStateToProps = state => ({
    receiving: state.receiving,
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    getAllTodos: () => dispatch(operations.getAllTodos())
})


export default connect(mapStateToProps, mapDispatchToProps)(List);