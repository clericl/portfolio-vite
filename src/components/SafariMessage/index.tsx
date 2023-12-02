import { MouseEventHandler } from 'react'

import './index.scss'

function SafariMessage({ dismiss }: SafariMessageProps) {
  return (
    <div className="safari-message">
      <div className="text">
        This website is best viewed on Chrome or Firefox.
      </div>
      <button onClick={dismiss} className="continue">Continue anyway</button>
      <div className="simple">
        <a href="/EricLiangResume.pdf">
          View printable version
        </a>
      </div>
    </div>
  )
}

interface SafariMessageProps {
  dismiss: MouseEventHandler<HTMLButtonElement>
}

export default SafariMessage
