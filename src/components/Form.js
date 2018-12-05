import React, { Component } from 'react';
import firebase from '../config/dbconfig';

class Form extends Component {
    state = {
        draft: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const timestamp = new Date();
        firebase.firestore().collection('tasks').add({
            task: this.state.draft,
            isComplete: false,
            added: timestamp
        })
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
                <button type="submit"><i className="fas fa-plus"></i></button>
                <input type="text" id="input-field" value={this.state.draft} onInput={this.handleUpdate} />
            </form>
        );
    }
}

export default Form;