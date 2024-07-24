import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./Context/UserContext";
import MoviesContextProvider from "./Context/MoviesContext";
import WatchList from "./components/WatchList/WatchList";
import Movies from "./components/Movies/Movies";
import "./App.css";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import TvDetails from "./components/TvDetails/TvDetails";
import PeopleDetails from "./components/PeopleDetails/PeopleDetails";
import { Toaster } from "react-hot-toast";
import TvWatchlist from "./components/TvWatchlist/TvWatchlist";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute/AuthProtectedRoute";

function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "watchList",
          element: (
            <ProtectedRoute>
              {" "}
              <WatchList />
            </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute>
              <Movies />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              <Login />
            </AuthProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />{" "}
            </AuthProtectedRoute>
          ),
        },
        {
          path: "movieDetails/:id",
          element: (
            <ProtectedRoute>
              <MovieDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "tvDetails/:id",
          element: (
            <ProtectedRoute>
              <TvDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "peopleDetails/:id",
          element: (
            <ProtectedRoute>
              <PeopleDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "TvwatchList",
          element: (
            <ProtectedRoute>
              <TvWatchlist />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <MoviesContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster></Toaster>
        </MoviesContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
