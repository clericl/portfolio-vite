import NavigationLink from "../NavigationLink"

import './index.scss'

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/skills">Skills</NavigationLink>
        <NavigationLink to="/work">Work</NavigationLink>
        <NavigationLink to="/contact">Contact</NavigationLink>
      </nav>
    </div>
  )
}

export default Navigation
