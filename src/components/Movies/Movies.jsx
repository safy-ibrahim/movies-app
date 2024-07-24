import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../../Context/MoviesContext";
import style from "./Movies.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const { getMovies, addToWatchlist } = useContext(MoviesContext);

  async function getMoviesToDisplay() {
    const res = await getMovies();
    if (res) {
      setMovies(res.results);
    }
  }

  async function addMovie(movieId, mediaType) {
    const response = await addToWatchlist(movieId, mediaType);
    if (response.success == true) {
      toast.success("Movie is added to watchlist", {
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
    getMoviesToDisplay();
  }, []);

  return (
    <>
      {movies ? (
        <div className="py-4">
          <div className="d-flex flex-wrap justify-content-center">
            {movies.map((movie, index) => {
              return (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                  <div className="py-3 px-3 text-center">
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
                        addMovie(movie.id, "movie");
                      }}
                      className="btn btn-primary w-100"
                    >
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className=" vh-100 d-flex align-items-center justify-content-center">
            <i className="fas fa-spinner"></i>
          </div>
        </>
      )}
    </>
  );
}
