import React from "react";
import "./Banner.css";

function Banner() {
  const truncate = (text, n) => {
    return text?.length > 0 ? text.substring(0, n - 1) + "..." : text;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png)`,
        backgroundPosition: "center center",
      }}
    >
      {/* <h1>https://i.imgur.com/e1hLQ2m.png</h1> */}
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(
            `This is a test description.This is a test description.This is a test
          description.This is a test description.This is a test description.This
          is a test description.This is a test description.This is a test
          description.This is a test description.This is a test description.This
          is a test description.`,
            120
          )}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
