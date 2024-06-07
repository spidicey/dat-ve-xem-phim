import React from 'react'
import { VeType } from '../../types'

export default function Ticket(ve : VeType) {
  return (
    <div>{ve.suatChieu.gioBatDau}</div>
  )
}
