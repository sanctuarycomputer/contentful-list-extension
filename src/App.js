import React, { Component } from 'react';
import { contentful } from "./lib/contentful";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: {},
      newItem: '',
      items: []
    };
  }

  componentDidMount() {
    contentful(api => {
      api.window.startAutoResizer();
      this.setState({
        items: api.field.getValue().split(','),
        api: api
      });
    });
  }

  addNewItem = () => {
    const { items, newItem } = this.state;
    items.push(newItem);

    this.setState({ items, newItem: '' }, this.updateContentful);
  };

  updateNewItem = newItem => {
    this.setState({ newItem });
  };

  removeItem = item => {
    const { items } = this.state;
    items.splice(item, 1);

    this.setState({ items }, this.updateContentful);
  };

  updateContentful = () => {
    const { api, items } = this.state;
    api.field.setValue(items.join(','));
  };

  renderList() {
    const { items } = this.state;
    if (!items.length) return null;

    return items.map((item, i) => (
      <li key={i}>
        <span>{item} </span>
        <button onClick={() => this.removeItem(i)}>x</button>
      </li>
    ));
  }

  render() {
    return (
      <div className="App">
        {this.renderList()}
        <div className="Form">
          <label>Add new item:</label>
          <input type="text" value={this.state.newItem} onChange={e => this.updateNewItem(e.target.value)} />
          <button type="button" onClick={this.addNewItem}>Add</button>
        </div>
      </div>
    );
  }
}

export default App;
