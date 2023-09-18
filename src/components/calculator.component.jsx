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
        if (value !== '+' && value !== '-' && value !== '/' && value !== '*' && value !== '%' && value !== '=' && value !== 'C') {
            if (this.state.answer !== 0) {
                this.setState({ num: '', answer: 0 }, () => {
                    if (this.state.num.length < 15) {
                        this.setState({num:this.state.num + value}, () => console.log(this.state.num))
                    }
                    
                } )
            }
            else if (this.state.answer === 0) {
                if (this.state.num.length < 15) {
                    this.setState({ num: this.state.num + value }, () => console.log(this.state.num))
                }
                console.log(this.state.num, 'BB')
                
            }
             
            if (this.state.sign.length > 0) {
                this.setState({ signArr: [...this.state.signArr, this.state.sign] })
                this.setState({ sign: '' })
            }
        }
        else if ((value === '+' || value === '-' || value === '/' || value === '*' || value === '%')) {
            if (this.state.num.length > 0) {
                this.setState({ numArr: [...this.state.numArr, this.state.num] }, () => {
                    this.setState({ num: '' })
                })
                
                    this.setState({ sign: value })
                

            }
            
        }
        else if ((value === 'C')) {
            this.setState({ answer: 0, numArr: [], num: '', sign: '', signArr: []}, () => this.displayAnswer())
        }
        else if (value === '=') {
            this.setState({ numArr: [...this.state.numArr, this.state.num] }, () => {
                this.setState({ num: '' })
                if (this.state.numArr.length > 1) {
                    var xy = Number(this.state.numArr[0])
                    for (var i = 0; i < this.state.numArr.length; i++) {
                        if (this.state.signArr[i] === '+') {
                            xy += Number(this.state.numArr[i + 1])
                        }
                        else if (this.state.signArr[i] === '-') {
                            xy -= Number(this.state.numArr[i + 1])
                        }
                        else if (this.state.signArr[i] === '/') {
                            xy /= Number(this.state.numArr[i + 1])
                        }
                        else if (this.state.signArr[i] === '*') {
                            xy *= Number(this.state.numArr[i + 1])
                        }
                        else if (this.state.signArr[i] === '%') {
                            xy %= Number(this.state.numArr[i + 1])
                        }
                    }

                    this.setState({ numArr: [] }, () => {
                     this.setState({ answer: Number.isInteger(xy) ? xy : xy.toFixed(4) }, () => {
                        this.setState({ num: this.state.answer.toString(), signArr: [] })
                    })
                       
                    })
                    
                    
                }
                else {
                    console.log('You Missed!')
                }
            })
            
        }
    }

    displayIf = (val) => {
        if (val.length > 3 && val.length < 7) {

                    console.log('AA')
                    val = val.substring(val.length - val.length, val.length - 3) + ',' + val.substring(val.length - 3, val.length)
                }
                else if (val.length > 6 && val.length < 10) {
                    console.log('BB')
                    val = val.substring(val.length - val.length, val.length - 6) + ',' + val.substring(val.length - 6, val.length - 3) + ',' + val.substring(val.length - 3, val.length)
                }
                else if (val.length > 9 && val.length < 13) {
                    console.log('BB')
                    val = val.substring(val.length - val.length, val.length - 9) + ',' + val.substring(val.length - 9, val.length - 6) + ',' + val.substring(val.length - 6, val.length - 3) + ',' + val.substring(val.length - 3, val.length)
                }
                else if (val.length > 12 && val.length < 16) {
                    console.log('BB')
                    val = val.substring(val.length - val.length, val.length - 12) + ',' + val.substring(val.length - 12, val.length - 9) + ',' + val.substring(val.length - 9, val.length - 6) + ',' + val.substring(val.length - 6, val.length - 3) + ',' + val.substring(val.length - 3, val.length)
        }
                else if (val.length > 15 && val.length < 19) {
                    console.log('BB')
                    val = val.substring(val.length - val.length, val.length - 15) + ',' +  val.substring(val.length - 15, val.length - 12) + ',' + val.substring(val.length - 12, val.length - 9) + ',' + val.substring(val.length - 9, val.length - 6) + ',' + val.substring(val.length - 6, val.length - 3) + ',' + val.substring(val.length - 3, val.length)
        }
        return val
    }

    displayAnswer = () => {
        let val;
        if (this.state.answer > 0) {
            val = this.state.answer;
            
            if (Number.isInteger(val)) {
                val = val.toString()
               val = this.displayIf(val)

            }

            else {
                val = val.toString()
                const [a, b] = val.split('.')
                var c = this.displayIf(a)
                val = c + '.' + b

            }
           
            return val
        }
        else if (this.state.num.length > 0 || this.state.sign.length > 0) {
            val = this.state.num;
            // val = val.toString();
            //    return this.displayIf(val)
            
              if (Number.isInteger(Number(val))) {
               val = this.displayIf(val)

            }

            else {
                const [a, b] = val.split('.')
                var d = this.displayIf(a)
                val = d + '.' + b

            }
           
            return val
        }
        else return '0'
    }
    
    render() {
        return (
            <div className='calc'>
                <div className="calc-interface">
                    <div className="calc-display">
                        {/* <div id='view' ref={this.myElementRef} className="view">
                            {this.displayAnswer()}
                        </div> */}
                        <input readOnly type="text"  ref={this.myElementRef} value={this.displayAnswer()} className="view"/>
                 
                    </div>
                    <div className="calc-btns">
                        <CalcBtn displayValue={this.displayValue} value='C' />
                        {/* <CalcBtn displayValue={this.displayValue} value='+/-' /> */}
                        <CalcBtn displayValue={this.displayValue} value='.' />
                        <CalcBtn displayValue={this.displayValue} value='%' />
                        <CalcBtn displayValue={this.displayValue} value='+' />
                        <CalcBtn displayValue={this.displayValue} value='9' />
                        <CalcBtn displayValue={this.displayValue} value='8' />
                        <CalcBtn displayValue={this.displayValue} value='7' />
                        <CalcBtn displayValue={this.displayValue} value='-' /> 
                        <CalcBtn displayValue={this.displayValue} value='6' />
                        <CalcBtn displayValue={this.displayValue} value='5' />
                        <CalcBtn displayValue={this.displayValue} value='4' />
                        <CalcBtn displayValue={this.displayValue} value='*' />
                        <CalcBtn displayValue={this.displayValue} value='3' />
                        <CalcBtn displayValue={this.displayValue} value='2' />
                        <CalcBtn displayValue={this.displayValue} value='1' />
                        <CalcBtn displayValue={this.displayValue} value='/' />
                        <CalcBtn displayValue={this.displayValue} value='0' />
                        <CalcBtn style={{flexShrink: 0, width: '15rem', borderRadius: '10px' }} displayValue={this.displayValue} value='=' />
                    </div>
                </div>
            </div>
        )
    }
}
