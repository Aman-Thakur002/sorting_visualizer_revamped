import { useState, useEffect } from 'react'
import SortingVisualizer from './components/SortingVisualizer'
import { FiMoon, FiSun } from 'react-icons/fi'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light-theme')
  
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme')
    
    setTheme(savedTheme)
    document.body.className = savedTheme
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme'
    setTheme(newTheme)
    document.body.className = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className="app-container">
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light-theme' ? <FiMoon /> : <FiSun color='white'/>}
      </button>
      <SortingVisualizer />
    </div>
  )
}

export default App