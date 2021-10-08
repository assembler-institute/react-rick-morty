import React from "react";
import { NavLink } from "react-router-dom";

import * as routes from "../../constants/routes";

function AppHeader({ logo = "https://occ-0-1068-92.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABcb0yL8KdS3lxlB7w7kD6GfBTivnVVTfpiW0ZQTi6nvwWZIEpS5rU5iFeO_kJxGzEDnOaLx7iq0zM3FJc5e1gGqEGcaCkNotiOAl.png?r=d7f", ...props }) {
  return (
    <header className="bg-primary mb-4  bg-dark" {...props}>
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand navbar-dark">
            <div><img src={logo} alt="logo" width={200} /></div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to={routes.HOME}
                >
                  HOME
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
