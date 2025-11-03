import React, { Component } from 'react'

export default class Header extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       count: 0,
    }
  }

    increment = () => {
      this.setState(prevState => ({count: prevState.count + 1}))
    }

    decrement = () => {
      this.setState(prevState => ({count: prevState.count - 1}))
    }


  render() {
    return (
      <div>
        <p>this is a Class Component {this.props.value}</p>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState(prevState => ({count: prevState.count + 1}))}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={() => this.setState({count: 0})}>Reset</button>
      </div>
    )
  }
}
