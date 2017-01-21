import React, { Component } from 'react'

export const CustomizedLabel = (props) => {
  const { x, y, stroke, payload } = props
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {payload.value}
    </text>
  )
}

export const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-15)">
        {props.payload.value}
      </text>
    </g>
  )
}