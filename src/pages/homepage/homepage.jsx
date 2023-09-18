import React, { Component } from 'react'
import Calculator from '../../components/calculator.component'
import './homepage.scss'
import { FaCalculator } from 'react-icons/fa6'

export default class Homepage extends Component {
    constructor() {
      super()
    
      this.state = {
         first: <FaCalculator />
      }
    }

  runCalculator = (val) => {
    val.classList.add('activate')
    this.setState({first: <Calculator />})
  }
  render() {
    return (
      <div>
        <h1>The Iphone Calculator</h1>
        <div className="icon" onClick={() => { this.runCalculator(document.querySelector('.icon')) }}>{this.state.first}</div>
      </div>
    )
  }
}
