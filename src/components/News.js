import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "sports",
  };

  capitalize = (word) => {
    if (word === "in") {
      return "India";
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(65);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
    document.title = "NewsMonkey - " + this.capitalize(this.props.category);
  }

  // handlePrevious = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=f5bf9224ba4640ce8bd59a9cbd0fc2cc&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
  // };
  // handleNext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
    // if (
    //   this.state.page + 1 <=
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    //   console.log("next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=f5bf9224ba4640ce8bd59a9cbd0fc2cc&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false,
    //   });
    // }
  // };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };
  
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "80px" }}>
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines in{" "}
          {this.capitalize(this.props.country)}
        </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.page + 1 <=
            Math.ceil(this.state.totalResults / this.props.pageSize)}
          loader={<Spinner />}
          // scrollableTarget="scrollableDiv"
        >
          <div className="row">
            {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 135)+(element.title.length>135?"...":"") : "No Heading"}
                      mode= {this.props.mode}
                      description={
                        element.description
                          ? element.description.slice(0, 249)+(element.description.length>249?"...":"")
                          : "Click on 'Read more' for full details"
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      source={element.source.name}
                      date={element.publishedAt}
                      author={element.author}
                    />
                  </div>
                );
              })}
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevious}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
