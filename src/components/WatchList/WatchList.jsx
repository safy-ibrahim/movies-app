import React, { useContext, useEffect, useState } from "react";
import style from "./WatchList.module.css";
import { MoviesContext } from "../../Context/MoviesContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function WatchList() {
  const [moviesWatch, setMoviesWatch] = useState([]);
  const { getWatchlist, removeMovieFromWatchlist } = useContext(MoviesContext);

  async function displayWatchlist(mediaType) {
    const res = await getWatchlist(mediaType);
    console.log(res.results);
    if (res && res.results) {
      setMoviesWatch(res.results);
    } else {
      callBack([]);
    }
  }

  async function deleteFromWatchList(id) {
    const res = await removeMovieFromWatchlist(id);
    console.log(res);
    const filtrMovies = [...moviesWatch];
    const newFilterMovies = filtrMovies.filter((movie) => movie.id !== id);
    setMoviesWatch(newFilterMovies);

    if (res.success == true) {
      toast.success("Movie is removed ", {
        position: "top-right",
        duration: 1500,
      });
    } else {
      toast.error("Error occur", {
        position: "top-right",
        duration: 1000,
      });
    }
  }

  useEffect(() => {
    displayWatchlist("movies");
  }, []);

  return (
    <>
      <div className="py-4">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div className="">
              <div className={`${style.borderLine} w-50 `}></div>
              <div className="py-2">
                <p className=" py-2 h4">
                  Your <br /> Movies <br /> Watchlist
                </p>
              </div>
              <div className={`${style.borderLine} `}></div>
            </div>
          </div>
          {moviesWatch && moviesWatch.length > 0 ? (
            moviesWatch.map((movie, i) => (
              <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                <div className="py-3 text-center">
                  <Link to={`/movieDetails/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                      className=" w-100 rounded-2"
                    />
                    <h2 className=" fw-semibold fs-6 text-center d-flex align-items-center">
                      {movie.title}
                    </h2>
                  </Link>
                  <button
                    onClick={() => {
                      deleteFromWatchList(movie.id);
                    }}
                    className="btn btn-danger w-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No movies in your watchlist.</p>
          )}
        </div>
      </div>
    </>
  );
}
