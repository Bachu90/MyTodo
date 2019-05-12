import React, { Component } from 'react';
import { connect } from 'react-redux';
import middleware from '../redux/middleware';

class Form extends Component {
    state = {
        draft: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.draft, this.props.todos);
        this.setState({ draft: '' });
    }

    handleUpdate = (e) => {
        let draft = '';
        draft += e.target.value;
        this.setState({ draft });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button type="submit"><i className={this.props.sending ? "fas fa-spinner loader-spinner" : "fas fa-plus"}></i></button>
                <input type="text" id="input-field" value={this.state.draft} onChange={this.handleUpdate} autoComplete="off" required />
            </form>
        );
    }
}

const mapStateToProps = state => ({
    sending: state.sending,
    todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
    addTodo: (task, todos) => {
        dispatch(middleware.addTodo(task, todos));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);