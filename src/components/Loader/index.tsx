import { Html, useProgress } from '@react-three/drei'

import './index.scss'

function Loader() {
  const progressData = useProgress()

  return (
    <Html>
      <div className="loader">
        <div className="loader-inner">
          <div className="loader-title">
            Eric Liang
          </div>
          <div className="loader-subtitle">
            Web Developer
          </div>
          <div className="loading-text">
            <p>Loading...</p>
            <p>{progressData.progress >= 99 ? (Math.random() * 0.99 + 99).toFixed(2) : progressData.progress.toFixed(2)}% done.</p>
          </div>
        </div>
        <div className="simple">
          <a href="/EricLiangResume.pdf">
            View printable version
          </a>
        </div>
      </div>
    </Html>
  )
}

export default Loader
