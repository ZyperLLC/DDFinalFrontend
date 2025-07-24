import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import background from './assets/background3.png'

function DrawLoader() {
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => navigate('/home'), 300)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-300"
      style={{ backgroundImage: `url(${background})` }}
    >
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

export default DrawLoader
