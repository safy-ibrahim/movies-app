import style from "./Home.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../Context/MoviesContext";

export default function Home() {
  const { trendingMovies, trendingTv, trendingPeople } =
    useContext(MoviesContext);

  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-md-4 d-flex align-items-center">
            <div className="">
              <div className={`${style.borderLine} w-50 `}></div>
              <div className="py-2">
                <h2 className="h4 mb-3">
                  Trending <br /> Movies <br /> To Watch Right Now
                </h2>
                <p className="mt-5 py-1 text-muted">
                  Top trending movies by day
                </p>
              </div>

              <div className={`${style.borderLine} `}></div>
            </div>
          </div>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="py-3">
                <Link to={`/movieDetails/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className=" w-100 rounded-2"
                  />
                  <h3 className="h6 text-center">{movie.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* -----------------tv */}
        <div className="row py-5">
          <div className="col-md-4 d-flex align-items-center">
            <div className="">
              <div className={`${style.borderLine} w-50 `}></div>
              <div className="py-2">
                <h2 className="h4 mb-3">
                  Trending <br /> TV <br /> To Watch Right Now
                </h2>
                <p className="mt-5 py-1 text-muted">Top trending tv by day</p>
              </div>

              <div className={`${style.borderLine} `}></div>
            </div>
          </div>
          {trendingTv.map((tv) => (
            <div key={tv.id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="py-3">
                <Link to={`/tvDetails/${tv.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    alt={tv.name}
                    className=" w-100 rounded-2"
                  />
                  <h3 className="h6 text-center">{tv.name}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------- people */}
        <div className="row pb-4">
          <div className="col-md-4 d-flex align-items-center">
            <div className="">
              <div className={`${style.borderLine} w-50 `}></div>
              <div className="py-2">
                <h2 className="h4 mb-3">
                  Trending <br /> People <br /> To Watch Right Now
                </h2>
                <p className="mt-5 py-1 text-muted">
                  Top trending people by day
                </p>
              </div>
              <div className={`${style.borderLine} `}></div>
            </div>
          </div>
          {trendingPeople.map((person) =>
            person.profile_path ? (
              <div key={person.id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="py-3">
                  <Link to={`/peopleDetails/${person.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      className=" w-100 rounded-2"
                    />
                    <h3 className="h6 text-center">{person.name}</h3>
                  </Link>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
