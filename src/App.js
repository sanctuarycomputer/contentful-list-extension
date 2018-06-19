import React, { Component } from "react";
import "./App.css";
import { initApi } from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {},
      items: [],
      newItem: ""
    };
  }

  componentWillMount() {
    initApi(api => {
      api.window.startAutoResizer();
      this.setState({
        value: api.field.getValue(),
        api: api
      });
    });
  }

  addNewItem = () => {
    const { items, newItem } = this.state;
    items.push(newItem);

    this.setState({ items, newItem: "" }, this.updateContentful);
  };

  updateNewItem = e => {
    this.setState({ newItem: e.target.value });
  };

  removeItem = item => {
    const { items } = this.state;
    items.splice(item, 1);

    this.setState({ items }, this.updateContentful);
  };

  updateContentful = () => {
    const { api, items } = this.state;
    api.field.setValue(items.join(","));
  };

  renderList() {
    const { items } = this.state;
    if (!items.length) return null;

    return items.map((item, i) => (
      <li key={i}>
        <span>{item} </span>
        <button
          className="update-button cf-btn-secondary"
          onClick={() => this.removeItem(i)}
        >
          remove
        </button>
      </li>
    ));
  }

  render() {
    const { newItem } = this.state;

    return (
      <div className="App">
        {this.renderList()}
        <input
          className="cf-form-input"
          type="text"
          value={newItem}
          onChange={this.updateNewItem}
        />
        <button
          className="update-button cf-btn-primary"
          onClick={this.addNewItem}
        >
          Add
        </button>
      </div>
    );
  }
}

export default App;
