import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MoviesContext } from "../../Context/MoviesContext";
import toast from "react-hot-toast";

export default function TvDetails() {
  const [tvDetails, setTvDetails] = useState(null);
  const param = useParams();
  const { addToWatchlist } = useContext(MoviesContext);

  async function getTvDetails(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
          },
        }
      );
      setTvDetails(data);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  async function addTv(tvId) {
    const response = await addToWatchlist(tvId, "tv");
    if (response.success == true) {
      toast.success("TV is added to watchlist", {
        position: "top-right",
        duration: 1000,
      });
    } else {
      toast.error("Error occur", {
        position: "top-right",
        duration: 1000,
      });
    }
  }

  useEffect(() => {
    getTvDetails(param.id);
  }, []);

  return (
    <>
      {tvDetails ? (
        <div className="row py-5">
          <div className="col-md-3">
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/w500` + tvDetails.poster_path}
                alt={tvDetails.name}
                className="w-100 rounded-2"
              />
            </div>
          </div>
          <div className="col-md-9 d-flex align-items-center">
            <div>
              <h2>{tvDetails.name}</h2>
              <div className="py-3">
                <h6>Over View</h6>
                <p className="text-muted">{tvDetails.overview}</p>
              </div>
              <ul className="d-flex flex-column gap-2">
                <li>budget : {tvDetails.budget}</li>
                <li>vote : {tvDetails.vote_average}</li>
                <li>popularity : {tvDetails.popularity}</li>
                <li>vote_count : {tvDetails.vote_count}</li>
              </ul>
              <div className="w-50 mx-auto mt-3">
                <button
                  onClick={() => {
                    addTv(tvDetails.id);
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
