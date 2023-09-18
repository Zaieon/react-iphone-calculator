import React from 'react'
import './calc-btn.style.scss'

export const CalcBtn = (props) => {
  return (
      
    <button style={props.style} onClick={() => props.displayValue(props.value)}>{props.value}</button>
    
  )
}
