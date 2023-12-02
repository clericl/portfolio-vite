import Modal, { ModalController } from '../Modal'
import Navigation from '../Navigation'
import Scene from '../Scene'

import './index.scss'

function Layout() {
  return (
    <ModalController>
      <div className="layout">
        <Navigation />
        <Scene />
        <Modal />
      </div>
    </ModalController>
  )
}

export default Layout
