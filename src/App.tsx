import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import background from './assets/background.jpg'
import logo from './assets/logo.jpg'

function App() {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => navigate('/home'), 300) // Optional delay for smoothness
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center bg-cover bg-center bg-no-repeat transition-all duration-300 overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Logo at Top Center */}
      <div className="logo-container mt-10 mb-6">
        <img
          src={logo}
          alt="Logo"
          className="logo-image"
        />
      </div>

      {/* Spacer to push progress bar to lower portion */}
      <div className="flex-grow" />

      {/* Progress Bar (shifted up from bottom) */}
      <div className="progress-wrapper">
        <div className="progress-oval">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default App;