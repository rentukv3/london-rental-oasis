import React from 'react'
import { colors } from '../theme/colors'

const Card = ({ title, value, color = "primary" }) => (
  <div style={{
    background: colors.card,
    borderRadius: 12,
    boxShadow: '0 2px 8px #eee',
    padding: 24,
    margin: 8,
    minWidth: 180,
    color: colors.text,
    borderLeft: `6px solid ${colors[color]}`
  }}>
    <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 28, marginTop: 8 }}>{value}</div>
  </div>
)
export default Card 