import React from 'react'
import { colors } from '../theme/colors'

const Sidebar = ({ navigation }) => (
  <aside style={{ background: colors.sidebar, color: '#fff', width: 80, minHeight: '100vh', padding: 16 }}>
    <nav>
      {navigation.map((item, idx) => (
        <div key={idx} style
</rewritten_file> 