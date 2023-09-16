import React, { Component } from 'react'
import { CalcBtn } from './calc-btn.component'
import './calculator.style.scss'

export default class Calculator extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            num: '',
            numArr: [],
            sign: '',
            signArr: [],
            answer: 0
        }
   
    }

    displayValue = (value) => {
        console.log('B')
        if (value !== '+' && value !== '-' && value !== '/' && value !== '*' && value !== '%' && value !== '=' && value !== 'C') {
            if (this.state.answer) {
                this.setState({ num: '', answer: 0 })
            }
            this.setState({ num: this.state.num + value })
                
            if (this.state.sign.length > 0) {
                this.setState({ signArr: [...this.state.signArr, this.state.sign] })
                this.setState({ sign: '' })
            }
        }
        else if ((value === '+' || value === '-' || value === '/' || value === '*'  || value === '%')) {
            this.setState({ numArr: [...this.state.numArr, this.state.num] })
            this.setState({ num: '' })
            this.setState({ sign: value })
        }
        else if ((value === 'C')) {
            this.setState({ answer: 0, numArr: [], num: '', sign: '', signArr: []}, () => this.displayAnswer())
        }
        else if (value === '=') {
            console.log(this.state.numArr, this.state.signArr)
            this.setState({ numArr: [...this.state.numArr, this.state.num] }, () => {
                console.log(this.state.numArr)
                console.log(this.state.signArr)
                this.setState({num: ''})
                if (this.state.numArr.length > 1) {
                    var xy = Number(this.state.numArr[0])
                    for (var i = 0; i < this.state.numArr.length; i++) {
                        if (this.state.signArr[i] === '+') {
                            this.setState({ answer: xy += Number(this.state.numArr[i + 1]) })
                        }
                        else if (this.state.signArr[i] === '-') {
                            this.setState({ answer: xy -= Number(this.state.numArr[i + 1]) })
                        }
                        else if (this.state.signArr[i] === '/') {
                            this.setState({ answer: xy /= Number(this.state.numArr[i + 1]) })
                        }
                        else if (this.state.signArr[i] === '*') {
                            this.setState({ answer: xy *= Number(this.state.numArr[i + 1]) })
                        }
                        else if (this.state.signArr[i] === '%') {
                            this.setState({ answer: xy %= Number(this.state.numArr[i + 1]) })
                        }
                    }
                    
                }
                else {
                    console.log('You Missed!')
                }
                // console.log('A')
                this.setState({ numArr: [], signArr: [] }, () => console.log(this.state.numArr))
                // console.log('B')
            })
            
        }
    }

    displayAnswer = () => {
       
        if (this.state.answer > 0) {
            return this.state.answer
        }
        else if (this.state.num.length > 0 || this.state.sign.length > 0) {
            return this.state.num
        }
        else return '0'
    }
    
    render() {
        return (
            <div className='calc'>
                {/* <div>{this.state.answer}</div> */}
                <div className="calc-interface">
                    <div className="calc-display">
                        {/* <input className='view' type="text" /> */}
                        <div id='view' ref={this.myElementRef} className="view">
                            {this.displayAnswer()}</div>
                 
                    </div>
                    <div className="calc-btns">
                        <CalcBtn displayValue={this.displayValue} value='C' />
                        <CalcBtn displayValue={this.displayValue} value='+/-' />
                        <CalcBtn displayValue={this.displayValue} value='%' />
                        <CalcBtn displayValue={this.displayValue} value='/' /> <br />
                        <CalcBtn displayValue={this.displayValue} value='7' />
                        <CalcBtn displayValue={this.displayValue} value='8' />
                        <CalcBtn displayValue={this.displayValue} value='9' />
                        <CalcBtn displayValue={this.displayValue} value='*' /> <br />
                        <CalcBtn displayValue={this.displayValue} value='4' />
                        <CalcBtn displayValue={this.displayValue} value='5' />
                        <CalcBtn displayValue={this.displayValue} value='6' />
                        <CalcBtn displayValue={this.displayValue} value='-' />
                        <CalcBtn displayValue={this.displayValue} value='1' />
                        <CalcBtn displayValue={this.displayValue} value='2' />
                        <CalcBtn displayValue={this.displayValue} value='3' />
                        <CalcBtn displayValue={this.displayValue} value='+' />
                        <CalcBtn displayValue={this.displayValue} value='0' />
                        <CalcBtn displayValue={this.displayValue} value='.' />
                        <CalcBtn displayValue={this.displayValue} value='=' />
                    </div>
                </div>
            </div>
        )
    }
}
