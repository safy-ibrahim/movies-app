import React, { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../../Context/MoviesContext";
import style from "./TvWatchlist.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function TvWatchlist() {
  const [tvWatch, setTvWatch] = useState([]);
  const { getWatchlist, removeTvFromWatchlist } = useContext(MoviesContext);

  async function displayWatchlist(mediaType) {
    const res = await getWatchlist(mediaType);
    console.log(res.results);
    if (res && res.results) {
      setTvWatch(res.results);
    } else {
      callBack([]);
    }
  }

  async function deleteFromWatchList(id) {
    const res = await removeTvFromWatchlist(id);
    const filtrTv = [...tvWatch];
    const newFilterTv = filtrTv.filter((tv) => tv.id !== id);
    setTvWatch(newFilterTv);

    if (res.success == true) {
      toast.success("TV is removed ", {
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
    displayWatchlist("tv");
  }, []);

  return (
    <>
      <div className="py-4">
        <div className="row py-5">
          <div className="col-md-4 d-flex align-items-center">
            <div className="">
              <div className={`${style.borderLine} w-50 `}></div>
              <div className="py-2">
                <p className="h4 ">
                  Your <br /> TV <br /> WatchList
                </p>
              </div>
              <div className={`${style.borderLine} `}></div>
            </div>
          </div>
          {tvWatch && tvWatch.length > 0 ? (
            tvWatch.map((tv, i) => (
              <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                <div className="py-3 text-center">
                  <Link to={`/movieDetails/${tv.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                      alt=""
                      className=" w-100 rounded-2"
                    />
                    <h2 className=" fw-semibold fs-6 text-center d-flex align-items-center">
                      {tv.name}
                    </h2>
                  </Link>
                  <button
                    onClick={() => {
                      deleteFromWatchList(tv.id, "tv", setTvWatch);
                    }}
                    className="btn btn-danger w-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No TV shows in your watchlist.</p>
          )}
        </div>
      </div>
    </>
  );
}
