import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

const API_END_POINT = "https://api.themoviedb.org/3/";

const API_KEY = "api_key=25885e72395d5c928b3ef5707902daff";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [movieDescription, setMovieDescription] = useState({});
  const [movieNotExist, setMovieNotExist] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchURL]);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const searchText =
        movie?.original_title ||
        movie?.original_name ||
        movie?.name ||
        movie?.title;

      setMovieDescription(movie);
      if (searchText) {
        // Apply Video to current movie
        axios
          .get(
            `${API_END_POINT}movie/${movie.id}?${API_KEY}&append_to_response=videos&include_adult=true`
          )
          .then((response) => {
            const youtubeKey = response.data.videos.results[0]?.key || "";
            let newCurrentMovieState = movie;
            newCurrentMovieState.videoId = youtubeKey;
            setMovieNotExist(false);
            setTrailerUrl(youtubeKey);
            if (youtubeKey === "") setMovieNotExist(true);
          });
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      <div className="vid__container">
        {trailerUrl && (
          <YouTube
            className="youtube__video"
            videoId={trailerUrl}
            opts={opts}
          />
        )}
        {trailerUrl && (
          <div className="video__description">
            <h2 className="movie__title">
              <span>Title: </span>{" "}
              {movieDescription?.original_title || movieDescription?.title}
            </h2>
            <p className="movie__description">
              <span>Description:</span> <br />
              {movieDescription?.overview}
            </p>
            <p className="movie__date">
              <span>Date: </span>
              {movieDescription?.release_date}
            </p>
            <p className="movie__vote_count">
              <span>Vote Count: </span>
              {movieDescription?.vote_count}
            </p>
            <p className="movie__vote_average">
              <span>Vote Average: </span>
              {movieDescription?.vote_average}/10
            </p>
          </div>
        )}

        {movieNotExist === true ? (
          <div className="video__description">
            Sorry NETFLIX won't allow us to put this trailer for free But those
            are some information about this movie (this is genereal for all
            NETFLIX ORIGINALS )
            <h2 className="movie__title">
              <span>Title: </span>
              {movieDescription?.original_name}
            </h2>
            <p className="movie__description">
              <span>Description:</span> <br />
              {movieDescription?.overview}
            </p>
            <p className="movie__date">
              <span>Date: </span>
              {movieDescription?.release_date || "we cannot get the date"}
            </p>
            <p className="movie__vote_count">
              <span>Vote Count: </span>
              {movieDescription?.vote_count}
            </p>
            <p className="movie__vote_average">
              <span>Vote Average: </span>
              {movieDescription?.vote_average}/10
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Row;
