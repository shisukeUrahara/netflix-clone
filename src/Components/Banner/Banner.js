import React, { useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useState(() => {
    console.log("**@ inside banner , usestate");
    const init = async () => {
      console.log("**@ banner init called");
      console.log("**@ request url is , ", requests.fetchTrending);

      const response = await axios.get(requests.fetchTrending);

      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );

      return response;
    };

    init();
  }, []);

  const truncate = (text, n) => {
    return text?.length > 0 ? text.substring(0, n - 1) + "..." : text;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {/* <h1>https://i.imgur.com/e1hLQ2m.png</h1> */}
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 120)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
