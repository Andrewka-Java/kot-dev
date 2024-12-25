import './app.scss';

import { Component } from 'react';
import SideBar from '../side-bar/side-bar'
import TodoHeader from '../todo-header/todo-header';
import TodoList from '../todo-list/todo-list';
import TodoItemService from '../../service/services/TodoItemService';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      burger: true
    }
    this.service = new TodoItemService()
  }

  onBurger = () => {
    this.setState(state => ({ burger: !state.burger }))
  }

  render() {
    const cross = <img src="/cross.svg" alt="cross" />
    const burger = <img src="/burger.svg" alt="burger" />

    let overlay = ""
    switch (this.state.burger) {
      case false: overlay += "overlay"; break
      default: overlay += ""; break
    }

    return (
      <div className="app">
        <div id="burger" onClick={this.onBurger}>
          {this.state.burger ? burger : cross}
        </div>
        <div className={overlay}></div>
        <TodoHeader rgba={this.state.burger ? "" : "rgba"} />
        <SideBar active={this.state.burger} />
        <TodoList service={this.service} />
        <footer>
          All rights reserved 2024
        </footer>
      </div>
    )
  }

}

export default App;
