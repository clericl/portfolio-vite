import { ReactNode } from "react";
import { NavLink, To } from "react-router-dom";
import "./index.scss";

function NavigationLink({ children, to }: NavigationLinkProps) {
  return (
    <div className="navigation-link">
      <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {children}
      </NavLink>
    </div>
  );
}

export interface NavigationLinkProps {
  children: ReactNode;
  to: To;
}

export default NavigationLink;
