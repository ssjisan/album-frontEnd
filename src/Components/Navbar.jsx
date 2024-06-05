import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const path = useLocation()
    const LinkStyle ={
        textDecoration:"none"
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" style={LinkStyle}>
              <p className="nav-link" style={{color: path.pathname === "/" ? "#000914" : "#959CA5"}}>
                Add Album
              </p>
            </Link>
            <Link to="/album-list" style={LinkStyle}>
              <p className="nav-link" style={{color: path.pathname === "/album-list" ? "#000914" : "#959CA5"}}>
                Album List
              </p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
