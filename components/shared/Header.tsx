import React from 'react'
import { colors } from '../theme/colors'

const Header = ({ title, notifications, userProfile }) => (
  <header style={{ background: colors.card, color: colors.text, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h1>{title}</h1>
    <div>
      {notifications && <span style={{ marginRight: 16 }}>🔔</span>}
      {userProfile && <span>👤</span>}
    </div>
  </header>
)
export default Header 