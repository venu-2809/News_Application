import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Newslist.css";
 
const News = () => {
  const [news, setnews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/news")
      .then((res) => {
        // handle success
        console.log(res.data);
        setnews(res.data);
        //  console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  return (
    <>
      <div className="container my-5">
        <div className="row text-center">
          {news.map((val) => {
            return (
              <div className="col my-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={val.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{val.headline}</h5>
                    <p className="card-text">{val.description}</p>
                    <a
                      href={val.link}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
 
export default News;