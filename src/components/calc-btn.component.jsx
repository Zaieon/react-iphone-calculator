import React from 'react'
import './calc-btn.style.scss'

export const CalcBtn = (props) => {
  return (
      <div>
          <button onClick={() => props.displayValue(props.value)}>{props.value}</button>
      </div>
  )
}
