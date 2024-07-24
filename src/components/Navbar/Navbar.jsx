import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import style from "./Navbar.module.css";

export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black text-white">
        <div className="container">
          <Link to="/" className="navbar-brand text-white fw-semibold fs-4">
            Movies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {userToken && (
              <ul className="navbar-nav mx-auto gap-2">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link active text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/movies" className="nav-link text-white">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/watchList" className="nav-link text-white">
                    Movies Watchlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/TvwatchList" className="nav-link text-white">
                    TV Watchlist
                  </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ms-auto">
              {!userToken ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="nav-link active text-white"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-white">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link text-white"
                    onClick={logOut}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
