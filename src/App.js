import React, { Component } from 'react';
import Layout from './hoc/Layout';
import ToDoApp from './containers/ToDoApp/ToDoApp';

class App extends Component {
  render() {
    return (
      <Layout>
        <ToDoApp />
      </Layout>
    );
  }
}

export default App;
