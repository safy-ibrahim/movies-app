import React, { useContext, useEffect, useState } from "react";
import style from "./MovieDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { MoviesContext } from "../../Context/MoviesContext";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  const param = useParams();
  const { addToWatchlist } = useContext(MoviesContext);

  async function getMovieDetails(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
          },
        }
      );
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  async function addMovie(movieId) {
    const response = await addToWatchlist(movieId, "movie");
    if (response.success == true) {
      toast.success("Movie is added to watchlist", {
        position: "top-right",
        duration: 1500,
      });
    } else {
      toast.error("Error occur", {
        position: "top-right",
        duration: 1500,
      });
    }
  }
  useEffect(() => {
    getMovieDetails(param.id);
  }, []);

  return (
    <>
      {movieDetails ? (
        <div className="row py-5">
          <div className="col-md-3">
            <div className="">
              <img
                src={
                  `https://image.tmdb.org/t/p/w500` + movieDetails.poster_path
                }
                alt={movieDetails.title}
                className="w-100 rounded-2"
              />
            </div>
          </div>
          <div className="col-md-9 d-flex align-items-center">
            <div>
              <h2>{movieDetails.title}</h2>
              <div className="py-3">
                <h6>Over View</h6>
                <p className="text-muted">{movieDetails.overview}</p>
              </div>
              <ul className="d-flex flex-column gap-2">
                <li>budget : {movieDetails.budget}</li>
                <li>vote : {movieDetails.vote_average}</li>
                <li>popularity : {movieDetails.popularity}</li>
                <li>vote_count : {movieDetails.vote_count}</li>
              </ul>
              <div className="w-50 mx-auto mt-3">
                <button
                  onClick={() => {
                    addMovie(movieDetails.id);
                  }}
                  className="btn btn-primary w-100"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
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
