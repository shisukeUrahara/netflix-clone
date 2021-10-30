import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const baseUrl = `https://image.tmdb.org/t/p/original/`;

  useEffect(() => {
    const init = async () => {
      const response = await axios.get(fetchUrl);

      setMovies(response.data.results);
      console.log("**@ each row title  is , ", title);
      console.log("**@ each row movies are , ", movies);

      return response;
    };

    init();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie, index) =>
            ((movie.isLargeRow && movie.poster_path) ||
              (!movie.isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${baseUrl}${
                  isLargeRow ? movie?.poster_path : movie?.backdrop_path
                }`}
                key={movie.id}
                alt={movie?.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
