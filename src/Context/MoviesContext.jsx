import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext();

export default function MoviesContextProvider(props) {
  async function getMovies(params) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTUzMDA4OS43NzE1NDcsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIzhmh90ks9CzWZuGoBe69iy6a9MSCumLa_fvx5nkzM",
      },
    };

    return fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  //  -------------------------------------------------------trending
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function fetchTrendingMovies(mediaType, callBack) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/day`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTU5Mjg1Ny4zNTk1ODEsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IocNm0_QD8mhiIRrYhBBQeRTCy3oDGCzPN_3GDSUwAY",
          },
          params: {
            language: "en-US",
          },
        }
      );
      callBack(data.results.slice(0, 16));
    } catch (error) {
      console.error("Error fetching trending movies:" + { mediaType }, error);
    }
  }

  useEffect(() => {
    fetchTrendingMovies("movie", setTrendingMovies);
    fetchTrendingMovies("tv", setTrendingTv);
    fetchTrendingMovies("person", setTrendingPeople);
  }, []);

  // ------------------------------------------ add to watchlist

  async function addToWatchlist(mediaTypeId, mediaType) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        media_type: mediaType,
        media_id: mediaTypeId,
        watchlist: true,
      }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
      },
    };

    return fetch(
      "https://api.themoviedb.org/3/account/16163518/watchlist",
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => err);
  }
  // ---------------------------------------------------------------- remove movie

  async function removeMovieFromWatchlist(id) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        watchlist: false,
      }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
      },
    };

    return fetch(
      "https://api.themoviedb.org/3/account/16163518/watchlist",
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => err);
  }

  //  --------------------------------------------------------------- remove tv
  async function removeTvFromWatchlist(id) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        media_type: "tv",
        media_id: id,
        watchlist: false,
      }),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
      },
    };

    return fetch(
      "https://api.themoviedb.org/3/account/16163518/watchlist",
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => err);
  }
  // ----------------------------------------- getwatchlist
  async function getWatchlist(mediaType) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
      },
    };

    return fetch(
      `https://api.themoviedb.org/3/account/16163518/watchlist/${mediaType}?language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => err);
  }

  // ------------------------------------------------

  return (
    <MoviesContext.Provider
      value={{
        getMovies,
        trendingMovies,
        trendingTv,
        trendingPeople,
        addToWatchlist,
        getWatchlist,
        removeMovieFromWatchlist,
        removeTvFromWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
}
