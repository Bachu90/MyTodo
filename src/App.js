import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Form from './components/Form';


class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Header title="Todo List" />
        <main>
          <List />
          <Form />
        </main>

      </div>
    );
  }
}

export default App;
