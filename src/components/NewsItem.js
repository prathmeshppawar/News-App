import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewsItem extends Component {
  static defaultProps = {
    mode: "dark",
  };
  static propTypes = {
    mode: PropTypes.string,
  };


  render() {
    let { title, description, imageUrl, newsUrl, source, date, author } =
    this.props;
    let txtColor, bgColor;

    if(this.props.mode==="dark"){
      txtColor= "white";
      bgColor= "#13466e"
    }
    if(this.props.mode==="light"){
      txtColor= "black";
      bgColor= "white"
    }

    return (
      <div>
        <div className={`card my-3 mx-1`} 
      style={{minHeight: "33.5rem",
      backgroundColor: bgColor,
      color: txtColor }}
      >
          <div style={{right:"0", display: "flex",
        position: "absolute",
        justifyContent: "flex-end"}}>
              <span className="badge rounded-pill bg-danger">
                {source}
              </span>
              </div>
          <a href={newsUrl} target="_blank" rel="noreferrer">
            <img className="card-img-top" src={!imageUrl?"https://img.freepik.com/premium-photo/news-concept-with-newspapers_458909-125.jpg?w=2000":imageUrl} style={{maxHeight: "17rem"}} alt="img" />
          </a>
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className={`text-${this.props.mode==="light"?"muted":"white-50"}`}>
                By {!author?"Unknown":author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              style={{left: "100"}}
              className={`btn btn-sm btn-${this.props.mode==="light"?"dark":"danger"}`}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
