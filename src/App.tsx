import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThesisPage from './pages/ThesisPage'
import './styles/App.css'

function App() {
  const isThesisPage = window.location.pathname === '/thesis'

  return (
    <BrowserRouter>
      <div className="App">
        {!isThesisPage && (
          <nav className="nav">
            <div className="nav-container">
              <a href="/" className="nav-logo">
                <svg className="nav-logo-icon" viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 16h16M16 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="4" fill="currentColor"/>
                </svg>
                brandval
              </a>
              <div className="nav-links">
                <a href="/thesis">Thesis</a>
                <a href="https://github.com">GitHub</a>
                <a href="mailto:hello@brandval.ai">Contact</a>
              </div>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thesis" element={<ThesisPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
