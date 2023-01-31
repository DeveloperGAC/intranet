import React, { createContext, useState } from 'react'

export const DataContext = createContext();

const dataFixed = localStorage.getItem('theme') || 'dark';

export const ThemeProvider = ( {children}) => {
  const [theme, setTheme] = useState(dataFixed)
  return (
    <DataContext.Provider value={{
      theme,
      setTheme
    }}>
      {children}
    </DataContext.Provider>
  )
}