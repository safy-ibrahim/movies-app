import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PeopleDetails() {
  const [peopleDetails, setPeopleDetails] = useState(null);
  const param = useParams();

  async function getPeopleDetails(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2RmMDI5MTMxOGRjYmE1ZGM0MGQzN2IyYWRkOTFlMiIsIm5iZiI6MTcyMTYxOTYxMi4wMjU2MTgsInN1YiI6IjYzODM2NTRlZmI4MzQ2MDBiMjk0N2Q4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ol883UPgjJhMduk4eNy6RredVXmo2WpQ1jNd-pBmk",
          },
        }
      );
      setPeopleDetails(data);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }
  useEffect(() => {
    getPeopleDetails(param.id);
  }, []);

  return (
    <>
      {peopleDetails ? (
        <div className="row py-5">
          <div className="col-md-3">
            <div className="">
              <img
                src={
                  `https://image.tmdb.org/t/p/w500` + peopleDetails.profile_path
                }
                alt={peopleDetails.name}
                className="w-100 rounded-2"
              />
            </div>
          </div>
          <div className="col-md-9 d-flex align-items-center">
            <div>
              <h2>{peopleDetails.name}</h2>
              <div className="py-3">
                <p>Also known as:</p>
                <h6>{peopleDetails.also_known_as}</h6>
              </div>

              <ul className="d-flex flex-column gap-2">
                <li>Place of birth : {peopleDetails.place_of_birth}</li>
                <li>Birthday : {peopleDetails.birthday}</li>
                <li>popularity : {peopleDetails.popularity}</li>
                <li>
                  known for department : {peopleDetails.known_for_department}
                </li>
              </ul>
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
